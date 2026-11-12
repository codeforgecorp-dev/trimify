// app/api/userdata/[userdata]/route.js

import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { Url } from "@/app/models/Url";
import Data from "@/app/models/Sign-up";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    let username = resolvedParams?.userdata;

    if (!username) {
      const { pathname } = new URL(request.url);
      const cleanPath = pathname.replace(/\/+$/, "");
      const parts = cleanPath.split("/");
      username = parts[parts.length - 1];
    }

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
      const urls = await Url.find({ username: username }).sort({ createdAt: -1 });
      const isPremiumUser = Boolean(detailObject?.isPremium);

      return NextResponse.json({
        urls,
        data: urls,
        Verification: isPremiumUser,
        isPremium: isPremiumUser,
      });
    }
  } catch (error) {
    console.error("GET userdata error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const deleteAll = searchParams.get("deleteAll") || searchParams.get("deleteALL");

    let body = {};
    try {
      body = await request.json();
    } catch {}

    const resolvedParams = await params;
    let username = resolvedParams?.userdata;
    if (!username) {
      const { pathname } = new URL(request.url);
      const cleanPath = pathname.replace(/\/+$/, "");
      const parts = cleanPath.split("/");
      username = parts[parts.length - 1];
    }

    if (deleteAll || body.UserName) {
      const targetUser = body.UserName || username;
      await Url.deleteMany({ username: targetUser });
      return NextResponse.json({ success: true, message: "All URLs deleted successfully" }, { status: 200 });
    } else if (body.ShortName) {
      await Url.deleteOne({ ShortName: body.ShortName });
      return NextResponse.json(
        { success: true, message: "URL deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "No target specified" }, { status: 400 });
    }
  } catch (err) {
    console.error("DELETE userdata error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { searchParams, pathname } = new URL(req.url);
  const changeUsername = searchParams.get("changeUsername");

  const resolvedParams = await params;
  let FirstUsername = resolvedParams?.userdata;
  if (!FirstUsername) {
    const cleanPath = pathname.replace(/\/+$/, "");
    const parts = cleanPath.split("/");
    FirstUsername = parts[parts.length - 1];
  }

  let body = await req.json();

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
      await Data.updateOne(
        { Username: FirstUsername },
        { $set: { Username: newUsername } }
      );
      await Url.updateMany(
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

    if (shortName) {
      const existing = await Url.findOne({ ShortName: shortName, _id: { $ne: linkid } });
      if (existing) {
        return NextResponse.json({ conflict: 404, error: "ShortName already exists" }, { status: 409 });
      }
    }

    const data2update = {};

    // Helper function: check value
    const handleField = (fieldName, value) => {
      if (value === "remove") {
        data2update[fieldName] = null; // set value to null
      } else if (value != null) {
        data2update[fieldName] = value; // normal update
      }
    };

    // Top-level fields
    if (shortName) {
      handleField("fullShortUrl", `${process.env.NEXT_PUBLIC_HOST_URL || ""}/${shortName}`);
      handleField("ShortName", shortName);
    }
    if (newexpireAt !== undefined) {
      handleField("expireAt", newexpireAt);
    }
    if (maxClicks !== undefined) {
      handleField("maxClicks", maxClicks);
    }

    // Nested UTM fields
    const utmMap = {
      utmCampaign: "utm.campaign",
      utmSource: "utm.source",
      utmMedium: "utm.medium",
    };

    for (const [key, path] of Object.entries(utmMap)) {
      if (body[key] !== undefined) {
        handleField(path, body[key]);
      }
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
    console.error("URL update error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


