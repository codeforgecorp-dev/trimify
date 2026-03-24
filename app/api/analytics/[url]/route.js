import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { Url } from "@/app/models/Url";

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const { url: shortName } = resolvedParams;
  console.log(shortName)


  await connectDB();
  const data = await Url.findOne({ ShortName: shortName });
  
  const urlDoc = await Url.findOne({ ShortName: shortName }).select(
    "analytics"
  );
  const click = await Url.findOne({ ShortName: shortName }).select("clicks");

  if (!urlDoc || !click) {
    return NextResponse.json({ message: "No data found" }, { status: 404 });
  } else {
    return NextResponse.json(
      { analytics: urlDoc.analytics, clicks: click.clicks },
      { status: 200 }
    );
  }
}
