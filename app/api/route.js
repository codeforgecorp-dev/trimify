import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { Url } from "@/app/models/Url";
import Data from "../models/Sign-up";
import bcrypt from "bcrypt"
export async function POST(req) {
  try {
    await connectDB();

    const data = await req.json();

    const fullShortUrl = `${process.env.NEXT_PUBLIC_HOST_URL}/${data.ShortName}`;

    const { username, LongUrl, ShortName, time, date, passwordSet, utm, expirydate, maxClicks  } = data;
    const expiry = expirydate ? new Date(expirydate) : null;
    // Validate the input data
    const existing = await Url.findOne({ ShortName });
 
    if (existing) {
      return NextResponse.json(
        { error: "Short URL already taken!" },
        { status: 409 }
      );
    }

    const newUrl = new Url({
      username: username || "guest", // null = public user
      LongUrl: LongUrl,
      ShortName: ShortName,
      fullShortUrl: fullShortUrl,
      time: time,
      date: date,
      Password:passwordSet ? bcrypt.hashSync(passwordSet ,10) : null,
      passwordProtected: passwordSet ? true : false,
      clicks: 0,
      analytics: [],
      utm:{
        source:utm?.utm_Source.toLowerCase() || null,
        source_raw:utm?.utm_Source || null,
        medium:utm?.utm_Medium.toLowerCase() || null,
        medium_raw:utm?.utm_Medium || null,
        campaign:utm?.utm_Campaign || null,
        campaign_raw:utm?.utm_Campaign.toLowerCase() || null,
      },
      expireAt:expiry ,
      maxClicks:maxClicks
    });
    if(username){
      await Data.findOneAndUpdate({Username:username},{
        $inc:{totalLinks:1}
      })
    }
    await newUrl.save();

    return NextResponse.json({
      message: "Short URL created successfully",
      fullShortUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/${ShortName}`,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json(
      { error: "Server Error try again later" },
      { status: 500 },
      {error: error.message }
    );
  }
}
