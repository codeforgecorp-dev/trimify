import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { Url } from "@/app/models/Url"; // Import the Urls model
export async function POST(request) {
  let  shortName  = await request.json(); // Extract shortName from the request body
  await connectDB(); // Connect to the database
  console.log(shortName.ShortName)
  let existingUrl = await Url.findOne({ ShortName: shortName.ShortName }).lean();
  let existingUrl2 = await Url.findOne({ fullShortUrl: shortName.ShortName }).lean(); // Check if the longUrl matches the shortName
  if (existingUrl2 || existingUrl) {
    let clicks = existingUrl ? existingUrl.clicks : existingUrl2.clicks // Get the number of clicks from the existing URL
    console.log(clicks)
    // Return a response with the number of clicks
    return NextResponse.json({ totalClicks: clicks }, { status: 200 });
  } else {
    return NextResponse.json(
      {
        error: "Short name not found or does not exist",
      },
      { status: 404 }
    );
  }
}
