import { redirect } from "next/navigation";
import connectDB from "@/app/lib/mongoose";
import { Url } from "@/app/models/Url";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import bcrypt from "bcrypt";

export default async function Page({ params }) {
  
  const { shortName } =await params;

  await connectDB();

  const existing = await Url.findOne({ ShortName: shortName });

  if (!existing) {
    return redirect("/not-found");
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
    console.log(locationRes)
    const locationData = await locationRes.json();
    city = locationData.city || city;
    flag = locationData.country_flag || flag;
    country = locationData.country_name || country;
    countryCode = locationData.country_code3 || countryCode;
  } catch (err) {
    console.error("Location fetch error:", err);
  }
}



  // ---- Check Expiry & Max Clicks ----
  const now = new Date();
  let isExpired = false;

  if (existing.expireAt && new Date(existing.expireAt) < now) isExpired = true;
  if (existing.maxClicks && existing.clicks >= existing.maxClicks) isExpired = true;

 if (isExpired) return redirect("/link-expired");
 if(existing.passwordProtected) return redirect(`/p/${shortName}/`);
  // ---- Update clicks & analytics ----
  if (existing.username !== "guest") {
    await Url.findOneAndUpdate(
      { ShortName: shortName },
      {
        $inc: { clicks: 1 },
        $push: {
          analytics: {
            timestamp: new Date(),
            Browser: browser,
            Device: deviceType,
            City: city,
            countryFlag: flag,
            countryCode: countryCode,
            countryName: country,
            IP: hashedIP,
          },
        },
      },
      { new: true }
    );
  } else {
    await Url.findOneAndUpdate(
      { ShortName: shortName },
      { $inc: { clicks: 1 } },
      { new: true }
    );
  }

  // ---- Handle UTM Parameters ----
  let redirectUrl = existing.LongUrl;

  if (existing.utm) {
    try {
      const url = new URL(existing.LongUrl);

      // Add or merge UTM params
      if (existing.utm.source && !url.searchParams.has("utm_source")) {
        url.searchParams.set("utm_source", existing.utm.source);
      }
      if (existing.utm.medium && !url.searchParams.has("utm_medium")) {
        url.searchParams.set("utm_medium", existing.utm.medium);
      }

      redirectUrl = url.toString();
    } catch (err) {
      // fallback if URL parsing fails
      redirectUrl = existing.LongUrl;
    }
  }

  return redirect(redirectUrl);
}
