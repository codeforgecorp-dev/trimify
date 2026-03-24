import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import Data from "@/app/models/Sign-up";
import { OTPdata } from "@/app/models/otp";
import mongoose from "mongoose";
import connectDB from "@/app/lib/mongoose";
import bcrypt from "bcrypt";
export async function POST(req) {
    const body = await req.json()
    const { searchParams } = new URL(req.url)
    const validation = searchParams.get("validation")
    const userEmail = body.Emailid
    const changePass = searchParams.get("changePass")
    await connectDB()

    const checkEmail = await Data.findOne({ Email: userEmail })
    if (!checkEmail) {
        // Account does not exist → DO NOT send OTP
        return NextResponse.json({ error: 404, msg: "No Account with this Email found" })
    }

    try {
        // If validation query exists, verify OTP
        if (validation) {
            const userOTP = body.OTP
            const check = await OTPdata.findOne({ email: userEmail })
            if (check.expiresAt < new Date()) {
                return NextResponse.json({
                    error: 302,
                    msg: "OTP expired"
                });
            }
            if (!check) {
                return NextResponse.json({ error: 302, msg: "OTP is expired or not found" })
            }

            if (bcrypt.compareSync(userOTP.toString().trim(), check.otp.trim())) {
                return NextResponse.json({ success: 200, msg: "OTP Verified Successfully" })
            } else {
                return NextResponse.json({ error: 404, msg: "OTP is wrong" })
            }
        }
        if (changePass) {
            const newPass = body.newpass

            if (newPass) {
                const hashedPassword = bcrypt.hashSync(newPass, 12)
                const changePassword = await Data.findOneAndUpdate({ Email: userEmail }, {
                    $set: { Password: hashedPassword }
                })
                return NextResponse.json({ success: 200 })
            }
            return NextResponse.json({ error: 500, msg: "Password can't change.Try Again Later" })
        }
        // Generate and send OTP (account exists)
        const existingOTP = await OTPdata.findOne({ email: userEmail })
        const OTP = Math.floor(100000 + Math.random() * 900000).toString()
        const hashedOTP = bcrypt.hashSync(OTP, 10)

        if (existingOTP) {
            await OTPdata.findOneAndUpdate(
                { email: userEmail },
                { $set: { otp: hashedOTP, expiresAt: new Date(Date.now() + 15 * 60 * 1000) } }
            )
        } else {
            await OTPdata.create({
                otp: hashedOTP,
                email: userEmail,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000)
            })
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const mailOptions = {
            from: `"Trimify" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: "Your OTP Code",
            text: `Your OTP code is ${OTP}`,
            html: `<div style="
            max-width:600px;
            margin:0 auto;
            padding:30px;
            font-family:Arial, Helvetica, sans-serif;
            background:#f9fafb;
            border-radius:10px;
            border:1px solid #e5e7eb;
        ">

            <!-- Header -->
            <h2 style="
                text-align:center;
                color:#0f766e;
                margin-bottom:10px;
            ">
                Trimify Account Verification
            </h2>

            <p style="
                text-align:center;
                color:#374151;
                font-size:15px;
                margin-bottom:30px;
            ">
                Use the OTP below to verify your identity and recover your account.
            </p>

            <!-- OTP Box -->
            <div style="
                text-align:center;
                font-size:36px;
                letter-spacing:8px;
                font-weight:bold;
                color:#111827;
                background:#ecfeff;
                padding:20px 0;
                border-radius:8px;
                border:2px dashed #14b8a6;
                margin-bottom:25px;
            ">
                ${OTP}
            </div>

            <!-- Warning -->
            <p style="
                color:#dc2626;
                font-size:14px;
                text-align:center;
                margin-bottom:12px;
                font-weight:bold;
            ">
                ⚠️ Do not share this OTP with anyone.
            </p>

            <!-- Info -->
            <p style="
                color:#374151;
                font-size:14px;
                text-align:center;
                margin-bottom:30px;
            ">
                This OTP is valid for <b>15 minutes</b>.  
                If you did not request this, please ignore this email.
            </p>

            <hr style="border:none;border-top:1px solid #e5e7eb;margin:25px 0;" />

            <!-- Footer -->
            <p style="
                color:#6b7280;
                font-size:13px;
                text-align:center;
            ">
                Regards,<br/>
                <b>Trimify Team</b>
            </p>

        </div>`
        }

        await transporter.sendMail(mailOptions)

        return NextResponse.json({ success: 200, msg: "OTP sent Successfully", username:checkEmail.Username })

    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 500, msg: err.message })
    }
}
