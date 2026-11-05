// components/CookieConsent.js
"use client";
import React, { useState, useEffect } from "react";
import { Cookie, Check, X, ShieldAlert } from "lucide-react";

const COOKIE_KEY = "trimify_cookie_consent";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    try {
      const savedConsent = localStorage.getItem(COOKIE_KEY);
      if (!savedConsent) {
        setShowBanner(true);
      } else {
        setConsent(JSON.parse(savedConsent));
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (accepted) => {
    try {
      const consentData = { accepted, timestamp: new Date().toISOString() };
      localStorage.setItem(COOKIE_KEY, JSON.stringify(consentData));
      setConsent(consentData);
    } catch (e) {
      console.error(e);
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed z-50 bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:max-w-md bg-[#FFFDF0] text-black border-3 border-black shadow-[6px_6px_0px_#000] p-5 select-none animate-slideDown"
    >
      {/* Header Tag */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FACC15] text-black text-xs font-black uppercase border-2 border-black rotate-[-1deg] shadow-[2px_2px_0px_#000]">
          <Cookie className="w-3.5 h-3.5 fill-black" />
          <span>COOKIE POLICY</span>
        </div>
        <span className="text-xs font-black text-[#EF4444] uppercase tracking-wider">
          ✦ PRIVACY ✦
        </span>
      </div>

      <p className="text-xs md:text-sm font-bold text-black/85 leading-relaxed mb-4">
        We use essential cookies to maintain secure sessions, speed up redirects, and provide link performance analytics. No spam, no funny business!
      </p>

      {/* Button Controls */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <button
          onClick={() => handleConsent(true)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#FACC15] hover:bg-[#FDE047] text-black font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>ACCEPT ALL</span>
        </button>
        <button
          onClick={() => handleConsent(false)}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-gray-100 text-black font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
        >
          <span>REJECT</span>
        </button>
      </div>
    </aside>
  );
};

export default CookieConsent;