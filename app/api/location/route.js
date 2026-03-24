import { NextResponse } from "next/server";

export async function GET(req) {
  const headers = req.headers;

// ---- Get client IP ----
let ip =
  headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  headers.get("x-real-ip") ||
  null;

// Handle localhost / dev IPs
if (
  !ip ||
  ip === "::1" ||
  ip.startsWith("127.") ||
  ip.startsWith("0:0:0:0")
) {
  ip = "103.255.4.85"; // dev fallback only
}
  try{
  const locationRes = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=441aeb1a519e46628e5b3fdbb18579c4&ip=${ip}`,
    { cache: "no-store" } // Optional: disable caching to get fresh result
  );
  const locationData = await locationRes.json();
  const Country = locationData.country_name || "Country not found";
  const City2 = locationData.city || "Country not found";

   return NextResponse.json({
  success: true,
  source: "ip-api",
  ip,
  country: Country,
  city: City2 ?? "Unknown"
});
     
  } catch (err) {
    return NextResponse.json({
      source: "error",
      country: "Unknown",
      city: "Unknown",
    });
  }
}


