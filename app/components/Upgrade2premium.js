import React from "react";
import Link from "next/link";
import { Zap, Check, X, Flame, Sparkles } from "lucide-react";

const Upgrade2premium = ({ setshowUpgradeBox }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 select-none">
      <div className="relative w-full max-w-md bg-[#FFFBEB] border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 text-black animate-slideDown">
        {/* Close Button */}
        <button
          onClick={() => setshowUpgradeBox(false)}
          className="absolute top-4 right-4 p-1.5 bg-white border-2 border-black hover:bg-[#EF4444] hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
          title="Close modal"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EF4444] text-white font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg] mb-3">
          <Flame className="w-3.5 h-3.5 fill-white" />
          <span>PRO POWER PACK</span>
        </div>

        <h2 className="font-bungee text-2xl sm:text-3xl text-black leading-tight drop-shadow-[2px_2px_0px_#FACC15]">
          UPGRADE TO PREMIUM
        </h2>

        <p className="font-space text-xs sm:text-sm font-bold text-black/75 mt-1">
          Unlock high-voltage features to take your link tracking to the next level!
        </p>

        {/* Feature List */}
        <ul className="my-5 space-y-2.5 font-space text-xs sm:text-sm font-bold text-black">
          <li className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#EF4444] stroke-[3]" /> Advanced real-time geo & device analytics
          </li>
          <li className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#EF4444] stroke-[3]" /> Password-protected secure links
          </li>
          <li className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#EF4444] stroke-[3]" /> Custom link expiry by date or click count
          </li>
          <li className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#EF4444] stroke-[3]" /> Branded custom aliases & slugs
          </li>
          <li className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#EF4444] stroke-[3]" /> High-resolution QR code generator
          </li>
          <li className="flex items-center gap-2.5">
            <Check className="w-4 h-4 text-[#EF4444] stroke-[3]" /> Campaign UTM builder & tracking
          </li>
        </ul>

        {/* Pricing */}
        <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000] text-center my-4">
          <span className="font-space text-xs font-black uppercase text-black/60">
            ONE-TIME LIFETIME PASS
          </span>
          <div className="font-bungee text-4xl text-[#EF4444] drop-shadow-[2px_2px_0px_#FACC15] my-0.5">
            $15
          </div>
          <span className="text-[11px] font-bold text-black/60">
            No recurring subscription · Instant activation
          </span>
        </div>

        {/* Upgrade Button */}
        <Link
          href="/pricing"
          onClick={() => setshowUpgradeBox(false)}
          className="w-full brutal-btn brutal-btn-yellow py-3.5 font-bungee text-sm tracking-wider flex items-center justify-center gap-2"
        >
          <span>UPGRADE TO PREMIUM ⚡</span>
        </Link>
      </div>
    </div>
  );
};

export default Upgrade2premium;
