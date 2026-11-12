import React from "react";
import { Sparkles, ShieldCheck, Heart, User, MapPin, Zap } from "lucide-react";

export const metadata = {
  title: "About Us | Trimify",
  description:
    "Learn more about Trimify, a modern URL shortener built with Next.js, MongoDB, and high-performance redirect techniques.",
  keywords: [
    "about Trimify",
    "URL shortener company",
    "link shortener service",
    "trusted URL shortener",
    "Trimify team",
    "Trimify developer",
  ],
  alternates: {
    canonical: "https://www.trimy.me/about",
  },
  openGraph: {
    title: "About Trimify – The Maximalist URL Shortener",
    description:
      "Learn more about Trimify, a modern URL shortener built with Next.js and MongoDB.",
    url: "https://www.trimy.me/about",
    siteName: "Trimify",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 600,
        alt: "Trimify logo",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About – Trimify",
    description:
      "Learn more about Trimify, a modern URL shortener built with Next.js and MongoDB.",
    images: ["/og-image.png"],
  },
};

const About = () => {
  return (
    <main className="min-h-[calc(100vh-142px)] w-full bg-halftone-warm py-12 px-4 sm:px-6 select-none">
      <div className="max-w-4xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-10">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b-3 border-black">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1deg]">
            <Sparkles className="w-4 h-4 fill-black" />
            <span>ORIGIN STORY</span>
          </div>

          <span className="text-xs font-black text-[#EF4444] uppercase tracking-wider">
            ✦ HIGH VOLTAGE PERFORMANCE ✦
          </span>
        </div>

        {/* Title */}
        <h1
          id="about-us-heading"
          className="font-bungee text-3xl sm:text-5xl text-black tracking-tight mt-6 mb-4 drop-shadow-[2px_2px_0px_#FACC15]"
        >
          ABOUT TRIMIFY
        </h1>

        <p className="font-space text-base sm:text-lg font-bold text-black/85 leading-relaxed mb-8">
          <strong className="text-black font-black underline decoration-[#FACC15] decoration-4">Trimify</strong> is an unapologetically fast, robust URL shortening and link analytics platform engineered to empower marketers, developers, students, and businesses to simplify and track their web presence.
        </p>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
            <div className="font-bungee text-sm sm:text-base text-black flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#EF4444]" />
              <span>LIGHTNING SPEED</span>
            </div>
            <p className="font-space text-xs sm:text-sm font-bold text-black/75">
              Instant sub-100ms redirects designed for zero lag, no matter where your audience is clicking from.
            </p>
          </div>

          <div className="p-4 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
            <div className="font-bungee text-sm sm:text-base text-black flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#F97316]" />
              <span>SAFETY & INTEGRITY</span>
            </div>
            <p className="font-space text-xs sm:text-sm font-bold text-black/75">
              Strict zero-tolerance policy for phishing, malware, or deceptive links. Verified, encrypted, and trusted.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-5 font-space text-sm sm:text-base font-bold text-black/80 leading-relaxed border-t-3 border-black pt-6">
          <p>
            Designed for sheer ease of use, Trimify provides registered users with an intuitive dashboard to manage URLs, monitor real-time geo-analytics, generate custom QR codes, and create branded aliases that drive clicks.
          </p>

          <p>
            Trimify also operates seamlessly without an account for instant guest trimming, making lightweight link management universally accessible to everyone on the internet.
          </p>

          {/* Developer / Location Info Box */}
          <div className="p-5 bg-[#FEF3C7] border-3 border-black shadow-[4px_4px_0px_#000] rotate-[-0.5deg]">
            <div className="font-bungee text-base sm:text-lg text-black mb-3">
              CREATOR SPOTLIGHT
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-bold">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#EF4444]" />
                <span><strong>Origin:</strong> Pakistan Based</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#F97316]" />
                <span><strong>Developer & Manager:</strong> Zain Ul Abdeen</span>
              </div>
            </div>
          </div>

          <p className="text-black font-black pt-2">
            Whether you are a casual creator or managing high-volume campaigns, Trimify is your home for loud, fast, and trackable links.
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
