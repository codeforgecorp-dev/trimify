import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import bcrypt from "bcrypt";
import Data from "@/app/models/Sign-up";
import nodemailer from "nodemailer";
import Transactions from "@/app/models/transactions";
import { headers } from "next/headers"
import { UAParser } from "ua-parser-js";
export async function POST(req) {
  async function sendWelcomeEmail(toEmail, firstName) {
  // Create reusable transporter using Gmail or SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS, // your email app password
    },
  });

  const mailOptions = {
    from: '"Trimify 💛" <no-reply@trimify.xyz>',
    to: toEmail,
    subject: `Welcome to Trimify, ${firstName}! 🚀`,
    html: `
      <div style="font-family: 'Poppins', sans-serif; background:#f9f9f9; padding:20px; border-radius:10px;">
        <h2 style="color:#333;">Welcome to Trimify, ${firstName}! 🎉</h2>
        <p style="color:#555; font-size:16px;">
          We’re thrilled to have you on board. Trimify lets you create <strong>custom short links</strong>, track clicks with <strong>real-time analytics</strong>, and generate stylish <strong>QR codes</strong> effortlessly.
        </p>
        <p style="color:#555; font-size:16px;">
          To get started, visit your dashboard and start shortening your links:
        </p>
        <a href="https://trimify.xyz/user/${toEmail}" style="display:inline-block; background:#FACC15; color:#000; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:bold; margin-top:10px;">
          Go to Dashboard
        </a>
        <p style="color:#999; font-size:12px; margin-top:20px;">
          If you have any questions, reply to this email. We’re always happy to help!
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
  

// ---- Get client IP ----
const headersList = await headers(); // ✅ must await
const apiKey="441aeb1a519e46628e5b3fdbb18579c4"
// Try x-forwarded-for, x-real-ip (Vercel sets these)
let ip =
  headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
  headersList.get("x-real-ip") ||
  ""; // leave empty if not found

// If no client IP (eg local), you can fallback or leave blank
if (!ip || ip === "::1" || ip === "127.0.0.1") {
  ip = ""; // production should rely on real forwarded header
}


// Hash IP if you still want
const hashedIP = ip ? bcrypt.hashSync(ip, 10) : "";

// Get user‑agent
const userAgent = headersList.get("user-agent") || "";
const parser = new UAParser(userAgent);
const deviceType = parser.getDevice().type || "Desktop";
const browser = parser.getBrowser().name || "Unknown";

// ---- Get location ----
let city = "Unknown city";
let flag = "";
let country = "Unknown country";
let countryCode = "";
if (ip) {
  try {
    const locationRes = await fetch(
     `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`,
      { cache: "no-store" }
    );
    console.log(ip)
    console.log(locationRes)
    const locationData = await locationRes.json();
    city = locationData.city || city;
    country = locationData.country_name || country;
    
  } catch (err) {
    console.error("Location fetch error:", err);
  }
}

await connectDB();
try {let data = await req.json();
const existingUser = await Data.findOne({ Username: data.Username });
if (existingUser) {
    return NextResponse.json({
      success: false,
      error: "Username already exists",
    });
  }

const existingEmail = await Data.findOne({ Email: data.Email });
if (existingEmail) {
      return NextResponse.json({ success: false, error: "Email already exists" });
    }

    const hashpass = await bcrypt.hash(data.password, 12); // saltRounds = 12
   const checkPremium = await Transactions.findOne({ email: data.Email, premiumGranted: true });


    const newdata = await Data.create({
      FirstName: data.FirstName,
      LastName: data.LastName,
      Email: data.Email,
      Username: data.Username,
      Password: hashpass,
      Role: "user",
      Country: country,
      City: city,
      isPremium: checkPremium ? true : false
    });

    if (!newdata) {
      return NextResponse.json(
        { success: false, message: "User creation failed" },
        { status: 500 }
      );
    }
    await sendWelcomeEmail(data.Email, data.FirstName);
    return NextResponse.json({ success: true });

  } catch (error) {
    
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
