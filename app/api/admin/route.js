import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import Data from "@/app/models/Sign-up";
import Transactions from "@/app/models/transactions";

import Feedbacks from "@/app/models/UserFeedback";
export async function GET(req) {
   
 const {searchParams}=new URL(req.url)  
 const DataType=searchParams.get("Data")
 connectDB()
 if(DataType==="transactional"){
   
    const transactionalData=await Transactions.find({})
   
    return NextResponse.json({success:true, transactionData:transactionalData})
 }else if(DataType==="Feedback"){
           const Feedback=await Feedbacks.find({})
            
    return NextResponse.json({success:true, FeedbackData:Feedback})
 }else{ 
 
 const userData=await Data.find({Role:"user"})

 return NextResponse.json({success:true,Data:userData})
} }
export async function DELETE(req) {
    connectDB()
    const body=await req.json()
    const user2Delete=body.username
    
    await Data.deleteOne({Username:user2Delete})
    
    return NextResponse.json({success:true})
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { username, isPremium } = body;

    if (!username) {
      return NextResponse.json({ success: false, error: "Username required" }, { status: 400 });
    }

    // Update the user's isPremium flag in the database
    const updated = await Data.findOneAndUpdate(
      { Username: username },
      { $set: { isPremium: Boolean(isPremium) } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, isPremium: updated.isPremium });
  } catch (err) {
    console.error("Admin PUT error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
