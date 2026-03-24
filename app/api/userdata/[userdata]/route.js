// app/api/userdata/[userdata]/route.js

import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { Url } from "@/app/models/Url";
import Data from "@/app/models/Sign-up";

export async function GET(request) {
  try {
    await connectDB();
    // Get the dynamic part of URL (userdata) manually
    const { pathname } = new URL(request.url);
    const parts = pathname.split("/");
    const username = parts[parts.length - 1];
    const { searchParams } = new URL(request.url);
    const personalDetails = searchParams.get("personalDetails");

    if (personalDetails) {
      const detailObject = await Data.findOne({ Username: username });
      return NextResponse.json({ detailObject: detailObject }, { status: 200 });
    } else {
      if (!username) {
        return NextResponse.json(
          { error: "Username is required" },
          { status: 400 }
        );
      }
      const detailObject = await Data.findOne({ Username: username });
      
      const urls = await Url.find({ username: username, });
      
      return NextResponse.json({ urls, Verification: detailObject.isPremium });
    }
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    let shortname = await request.json();
    if (shortname.ShortName) {
      await Url.deleteOne({ ShortName: shortname.ShortName });
      return NextResponse.json(
        { message: "URL deleted successfully" },
        { status: 200 }
      );
    } else {
      await Url.deleteMany({ username: shortname.UserName });
      return NextResponse.json({ success: 200 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
export async function PUT(req) {
  const { searchParams, pathname } = new URL(req.url);
  const changeUsername = searchParams.get("changeUsername");
  const parts = pathname.split("/");
  const FirstUsername = parts[parts.length - 1];


  let body = await req.json()

 

  await connectDB();

  // 🔁 Case 1: Changing Username
  if (changeUsername) {
    try {
      
      const newUsername = body.Username;

      // Check if new username already exists
      const existingUsername = await Data.findOne({ Username: newUsername });
      if (existingUsername) {
        return NextResponse.json(
          { error: "Username already exists" },
          { status: 409 }
        );
      }
      // Update the username
      const result = await Data.updateOne(
        { Username: FirstUsername },
        { $set: { Username: newUsername } }
      );
      const updateLinks = await Url.updateMany(
        { username: FirstUsername },
        {
          $set: {
            username: newUsername,
          },
        }
      );

      return NextResponse.json(
        { message: "Username changed successfully" },
        { status: 200 }
      );
    } catch (err) {
      console.error("Username update error:", err);
      return NextResponse.json(
        { error: "Internal server error during username change" },
        { status: 500 }
      );
    }
  }

  // 🔁 Case 2: Updating a URL

  try {


    const {
      linkid,
      shortName,
      newexpireAt,
      utmCampaign,
      utmSource,
      utmMedium,
      maxClicks,
    } = body;

    if (!linkid) {
      return NextResponse.json({ error: "linkid is required" }, { status: 400 });
    }
   const existing=await Url.findOne({ShortName:shortName})
    if(existing){
    return NextResponse.json({conflict:404})
    return 
     }
    const data2update = {};

    // Helper function: check value
    const handleField = (fieldName, value) => {
      if (value === "remove") {
        data2update[fieldName] = null; // set value to null
      } else if (value != null) {
        data2update[fieldName] = value; // normal update
      }
      // if undefined, do nothing
    };

    // Top-level fields
    handleField("fullShortUrl",`${process.env.NEXT_PUBLIC_HOST_URL}/${shortName}`)
    handleField("ShortName", shortName);
    handleField("expireAt", newexpireAt);
    handleField("maxClicks", maxClicks);

    // Nested UTM fields
    const utmMap = {
      utmCampaign: "utm.campaign",
      utmSource: "utm.source",
      utmMedium: "utm.medium",
    };

    for (const [key, path] of Object.entries(utmMap)) {
      handleField(path, body[key]);
    }

    if (Object.keys(data2update).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    // Update document in MongoDB
    const updatedDoc = await Url.findOneAndUpdate(
      { _id: linkid },
      { $set: data2update },
      { new: true }
    );
  
    if (!updatedDoc) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedDoc }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


