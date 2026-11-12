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

    const { username, LongUrl, ShortName, time, date, passwordSet, utm, expirydate, maxClicks } = data;
    const finalPassword = passwordSet || data.password || null;
    const finalExpiry = expirydate || data.expiryDate || null;
    const finalMaxClicks = maxClicks ?? data.maxClick ?? null;

    const utmSource = utm?.utm_Source || utm?.source || data.utmSource || null;
    const utmMedium = utm?.utm_Medium || utm?.medium || data.utmMedium || null;
    const utmCampaign = utm?.utm_Campaign || utm?.campaign || data.utmCampaign || null;

    const expiry = finalExpiry ? new Date(finalExpiry) : null;
    // Validate the input data
    const existing = await Url.findOne({ ShortName });
 
    if (existing) {
      return NextResponse.json(
        { success: false, conflict: true, error: "Short URL already taken!" },
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
      Password: finalPassword ? bcrypt.hashSync(finalPassword, 10) : null,
      passwordProtected: Boolean(finalPassword),
      clicks: 0,
      analytics: [],
      utm: {
        source: utmSource ? utmSource.toLowerCase() : null,
        source_raw: utmSource,
        medium: utmMedium ? utmMedium.toLowerCase() : null,
        medium_raw: utmMedium,
        campaign: utmCampaign,
        campaign_raw: utmCampaign ? utmCampaign.toLowerCase() : null,
      },
      expireAt: expiry,
      maxClicks: finalMaxClicks ? Number(finalMaxClicks) : null,
    });
    if(username){
      await Data.findOneAndUpdate({Username:username},{
        $inc:{totalLinks:1}
      })
    }
    await newUrl.save();

    return NextResponse.json({
      success: true,
      _id: newUrl._id,
      ShortName: ShortName,
      message: "Short URL created successfully",
      fullShortUrl: `${process.env.NEXT_PUBLIC_HOST_URL || ""}/${ShortName}`,
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
