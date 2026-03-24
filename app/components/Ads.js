"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

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
      <div className="flex items-center justify-center h-screen bg-black text-white flex-col gap-4">
        <h1 className="text-xl font-semibold">
          Redirecting in {timeLeft} second{timeLeft !== 1 ? "s" : ""}. Please wait...
        </h1>
      </div>
    </>
  );
}

