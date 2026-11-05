"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { Clock, Zap, ArrowRight } from "lucide-react";

export default function Ads() {
  const searchParams = useSearchParams();
  const finalUrl = searchParams.get("url");
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    if (!finalUrl) return;

    if (timeLeft === 0) {
      window.location.href = finalUrl;
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, finalUrl]);

  return (
    <>
      <Script
        id="monetag-ad-script"
        src="https://fpyf8.com/88/tag.min.js"
        strategy="afterInteractive"
        async
        data-zone="149911"
        data-cfasync="false"
      />
      <div className="flex items-center justify-center min-h-screen bg-halftone-warm text-black p-4 select-none">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-8 sm:p-12 max-w-md w-full text-center flex flex-col items-center gap-5">
          {/* Top Tag Sticker */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
            <Clock className="w-4 h-4 stroke-[2.5]" />
            <span>INSTANT DISPATCH</span>
          </div>

          <h1 className="font-bungee text-2xl sm:text-3xl text-black">
            REDIRECTING YOU NOW
          </h1>

          {/* Big Bouncing Countdown Number */}
          <div className="w-20 h-20 bg-[#EF4444] text-white border-3 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center font-bungee text-4xl animate-pop">
            {timeLeft}
          </div>

          <p className="font-space text-xs sm:text-sm font-bold text-black/75">
            Hold tight! Taking you to destination in{" "}
            <span className="font-black text-[#EF4444]">{timeLeft}</span> second{timeLeft !== 1 ? "s" : ""}...
          </p>

          {finalUrl && (
            <a
              href={finalUrl}
              className="mt-2 inline-flex items-center gap-2 text-xs font-bungee text-black underline hover:text-[#EF4444]"
            >
              <span>Skip Wait & Go Directly</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </>
  );
}
