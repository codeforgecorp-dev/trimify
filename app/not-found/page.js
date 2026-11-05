import React from "react";
import Link from "next/link";
import { AlertTriangle, Home, Sparkles } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | Trimify",
  description: "Page not found due to invalid URL. Please check the URL and try again.",
  keywords: ["Trimify", "URL Shortener", "Next.js", "Link Management", "404"],
  alternates: {
    canonical: "/not-found",
  },
};

const NotFoundPage = () => {
  return (
    <div className="relative min-h-[calc(100vh-142px)] w-full bg-halftone-warm flex justify-center items-center p-4 sm:p-6 select-none">
      <div className="relative z-10 w-full max-w-lg bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-10 text-center flex flex-col items-center gap-5">
        {/* Top Tag Sticker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#EF4444] text-white font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg] animate-wiggle">
          <AlertTriangle className="w-4 h-4 fill-white" />
          <span>BROKEN TRAIL</span>
        </div>

        {/* Big 404 Headline */}
        <h1 className="font-bungee text-6xl sm:text-8xl text-black drop-shadow-[4px_4px_0px_#FACC15] tracking-tight">
          404!
        </h1>

        <h2 className="font-bungee text-xl sm:text-2xl text-black">
          LINK GONE INTO THE VOID
        </h2>

        <p className="font-space text-sm sm:text-base font-bold text-black/75 max-w-sm">
          The link you requested does not exist, was mistyped, or has been removed from our routing tables.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="w-full brutal-btn brutal-btn-yellow py-3.5 font-bungee text-sm sm:text-base tracking-wider inline-flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5 stroke-[2.5]" />
          <span>RETURN TO TRIMIFY HOME</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
