import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoose";
import { Url } from "@/app/models/Url";
import { UAParser } from "ua-parser-js";
import bcrypt from "bcrypt";
import { headers } from "next/headers"
export async function POST(req) {
    const { searchParams } = new URL(req.url)

    const ShortName = searchParams.get("Shortname")
    const body = await req.json()
    const password = body.Password;

    try {
        await connectDB();
        const existing = await Url.findOne({ ShortName: ShortName });

        if (!existing) {
            return NextResponse.json({ error: "Link not found" })
        }
        // ---- Check Expiry & Max Clicks ----
        const now = new Date();
        let isExpired = false;

        if (existing.expireAt && new Date(existing.expireAt) < now) isExpired = true;
        if (existing.maxClicks && existing.clicks >= existing.maxClicks) isExpired = true;
        if (isExpired) {
            return NextResponse.json({ error: 404 })
        }
        // ---- Get client IP ----
        const headersList =  await headers(); // fallback if you don't have headers()
        let ip =
            headersList.get("x-vercel-forwarded-for") ||
            headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
            headersList.get("x-real-ip") ||
            "103.255.4.85";

        if (ip === "::1" || ip === "127.0.0.1") ip = "103.255.4.85";

        const hashedIP = bcrypt.hashSync(ip, 10);
          
        // ---- Get location data ----
        const locationRes = await fetch(
            `https://api.ipgeolocation.io/ipgeo?apiKey=441aeb1a519e46628e5b3fdbb18579c4&ip=${ip}`,
            { cache: "no-store" }
        );
        const locationData = await locationRes.json();
        const city = locationData.city ?? "City not found";
        const flag = locationData.country_flag ?? "Flag not found";
        const country = locationData.country_name ?? "Country not found";
        const countryCode = locationData.country_code3 ?? "Code not found";

        // ---- Parse User Agent ----
        const userAgent = headersList.get("user-agent") || "";
        const parser = new UAParser(userAgent);
        const deviceType = parser.getDevice().type ?? "Desktop";
        const browser = parser.getBrowser().name ?? "Unknown";

        const isMatch = bcrypt.compareSync(password, existing.Password);

        if (!isMatch) {
            return NextResponse.json({ error: "Incorrect Password" })
        }
        let redirectUrl = existing.LongUrl;

        try {
            const url = new URL(existing.LongUrl);

            if (existing.utm) {
                // Add only missing UTM params
                if (existing.utm.source && !url.searchParams.has("utm_source")) {
                    url.searchParams.set("utm_source", existing.utm.source);
                }

                if (existing.utm.medium && !url.searchParams.has("utm_medium")) {
                    url.searchParams.set("utm_medium", existing.utm.medium);
                }
            }

            // ALWAYS return URL (with or without UTM changes)
            redirectUrl = url.toString();

        } catch (err) {
            // fallback if URL parsing fails
            redirectUrl = existing.LongUrl;
        }
        // ---- Update clicks & analytics ----
        if (existing.username !== "guest") {
            await Url.findOneAndUpdate(
                { ShortName: ShortName },
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
        }
        return NextResponse.json({
            success: true,
            URL2redirect: redirectUrl
        });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Database connection error" })
    }


}
