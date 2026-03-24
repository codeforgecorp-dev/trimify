import { Paddle, Environment } from "@paddle/paddle-node-sdk";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import Transactions from "@/app/models/transactions";


const paddle = new Paddle(process.env.PADDLE_SERVER_API_KEY, {
  environment: Environment.Production,
});
async function fetchCustomerData(customerID) {
  
  const fetchData = await fetch(`https://api.paddle.com/customers/${customerID}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${process.env.PADDLE_SERVER_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
  return fetchData.json()
}
export async function POST(req) {
  const signature = req.headers.get("paddle-signature") || "";
  const rawBody = await req.text();



  try {
    const event = await paddle.webhooks.unmarshal(rawBody, process.env.WEBHOOK_SECRET_KEY, signature);
    await connectDB();
    const { eventType, data } = event;

    // --- CASE A: CUSTOMER EVENTS ---
    if (eventType.startsWith("customer.")) {
      await Transactions.findOneAndUpdate(
        { customerID: data.id },
        { $set: { customerID: data.id, email: data.email } },
        { upsert: true }
      );
    }

    // --- CASE B: TRANSACTION EVENTS ---
    if (eventType === "transaction.completed" || eventType === "transaction.canceled" || eventType === "transaction.payment_failed") {

      // STEP 1: FETCH CUSTOMER EMAIL
      console.log(data)
      console.log(eventType)
      const customerID = data.customerId
      console.log(customerID)
      const customerData = await fetchCustomerData(customerID)
      console.log(customerData)
      const customerEmail = customerData.data.email
      console.log(customerEmail)
      // STEP 2: PREPARE UPDATE
      const updateData = {
        transactionID: data.id,
        transactionStatus: data.status,
        amountPaid: data.details?.totals?.total || data.total || "0",
        currency: data.currencyCode,
        email: customerEmail || undefined,
        customerID: data.customerId || undefined,
      };

      // STEP 3: STATUS LOGIC
      if (data.status === "completed") {
        updateData.premiumGranted = true;
      } else if (["canceled", "past_due", "failed"].includes(data.status)) {
        updateData.premiumGranted = false;
      }

      // STEP 4: SAFE DATABASE UPDATE
      // We use ONLY transactionID as the filter to prevent "Duplicate Null" errors
      // caused by the customerID index.
      await Transactions.findOneAndUpdate(
        { transactionID: data.id },
        { $set: updateData },
        { upsert: true, new: true }
      );


    }

    return NextResponse.json({ received: true });

  } catch (err) {
    console.error("WEBHOOK ERROR:", err.message);
    // Returning 200 avoids infinite retry loops from Paddle during errors
    return NextResponse.json({ error: err.message }, { status: 200 });
  }
}
