import React from "react";
import Link from "next/link";
import { Clock, AlertCircle, ArrowRight, Home } from "lucide-react";

export const metadata = {
  title: "Link Expired | Trimify",
  description: "The link you are trying to visit has expired or reached its maximum click limit.",
};

const LinkExpiredPage = () => {
  return (
    <div className="min-h-[calc(100vh-142px)] w-full bg-halftone-warm flex justify-center items-center p-4 sm:p-6 select-none">
      <div className="w-full max-w-lg bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 flex flex-col gap-5">
        {/* Top Tag Sticker */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EF4444] text-white font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
            <Clock className="w-4 h-4" />
            <span>TIME EXPIRED</span>
          </div>
          <span className="text-xs font-black text-black/50 uppercase">TRIMIFY SECURITY</span>
        </div>

        {/* Title */}
        <div>
          <h1 className="font-bungee text-3xl sm:text-4xl text-black leading-tight drop-shadow-[2px_2px_0px_#EF4444]">
            THIS LINK HAS EXPIRED!
          </h1>
          <p className="font-space text-xs sm:text-sm font-bold text-black/70 mt-1">
            Access to this destination has been timed out or exhausted.
          </p>
        </div>

        {/* Details Box */}
        <div className="space-y-4 font-space text-xs sm:text-sm font-bold text-black/85">
          <div className="p-4 bg-[#FFFDF0] border-2 border-black shadow-[3px_3px_0px_#000]">
            <h2 className="font-bungee text-sm text-black mb-1.5">WHY DID THIS HAPPEN?</h2>
            <ul className="list-disc ml-5 space-y-1 text-black/75">
              <li>The link reached the maximum click quota set by the creator.</li>
              <li>The configured expiration date or schedule has passed.</li>
              <li>The URL was manually decommissioned or deactivated.</li>
            </ul>
          </div>

          <div className="p-4 bg-[#FEF3C7] border-2 border-black shadow-[3px_3px_0px_#000]">
            <h2 className="font-bungee text-sm text-black mb-1.5">NEXT STEPS:</h2>
            <ul className="list-disc ml-5 space-y-1 text-black/75">
              <li>Request an updated link directly from the sender or publisher.</li>
              <li>Or create your own custom short links on Trimify for free!</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="flex-1 brutal-btn brutal-btn-yellow py-3 font-bungee text-xs sm:text-sm tracking-wider inline-flex items-center justify-center gap-1.5"
          >
            <Home className="w-4 h-4 stroke-[2.5]" />
            <span>TRIMIFY HOME</span>
          </Link>
          <Link
            href="/sign-up-to-trimify"
            className="flex-1 brutal-btn brutal-btn-red py-3 font-bungee text-xs sm:text-sm tracking-wider inline-flex items-center justify-center gap-1.5"
          >
            <span>CREATE MY OWN LINK</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LinkExpiredPage;
