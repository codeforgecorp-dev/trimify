import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import Data from "@/app/models/Sign-up";
import bcrypt from "bcrypt";
import jwt, { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import Transactions from "@/app/models/transactions";
const JWT_SECRET = process.env.JWT_SECRET;
export async function POST(request) {
  await connectDB();
  let data = await request.json();
  const { Username, Password } = data;

  try {
    const user = await Data.findOne({ Username });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "Invalid username or password",
      });
    }
    const checkPremium = await Transactions.findOne({ email: user.Email, premiumGranted: true });
    if(checkPremium){
      await Data.updateOne({Email:user.Email},{$set:{isPremium:true}});
    }
    const isPasswordCorrect = await bcrypt.compare(Password, user.Password);
   
    if (!isPasswordCorrect) {
      return NextResponse.json({
        success: false,
        error: "Invalid username or password",
      });
    }
    if(user.Role==="admin"){
      const admin_token=await jwt.sign({
        user:user._id,
        Username:Username,
        Role:"admin"
      }
    ,JWT_SECRET,
    {expiresIn:"24h"}
    )
      console.log("Token Created")
      ;(await cookies()).set("admin_token",admin_token,{
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60
      })
      return NextResponse.json({success:true,admin:"admin"})
    }
    const token = jwt.sign(
      {
        user: user._id,
        Username: Username,
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    return NextResponse.json({ success: true, token: token });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      error: "Error occurred during login",
    });
  }
}
