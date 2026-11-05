"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { FeatureCards, FAQSection } from "./TrimifyInterface";
import { PricingSection } from "./PricingSection";
import { nanoid } from "nanoid";
import {
  Zap,
  Flame,
  Sparkles,
  Link as LinkIcon,
  Copy,
  Check,
  BarChart2,
  Lock,
  Clock,
  QrCode,
  ArrowRight,
  MousePointerClick,
} from "lucide-react";

export default function HeroSection() {
  const [LongUrl, setLongUrl] = useState("");
  const [Msg, setMsg] = useState("");
  const [On, setOn] = useState(false);
  const [loading, setloading] = useState(false);
  const [toggler, settoggler] = useState(false);
  const [activeTab, setactiveTab] = useState("Shortener");
  const [ShortName, setShortName] = useState("");
  const [copied, setCopied] = useState(false);

  // Function to handle URL generation
  async function GenerateUrl() {
    if (!LongUrl.trim()) {
      toast.warn("Please enter the long url", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    let formattedUrl = LongUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = "https://" + formattedUrl;
    }

    // Strict URL Validation
    if (!isValidURL(formattedUrl)) {
      toast.error("Invalid URL", { position: "top-right", autoClose: 1000 });
      return;
    }

    setloading(true);

    try {
      let Time = Date.now();
      let time = new Date(Time).toLocaleTimeString();
      let date = new Date(Time).toLocaleDateString();

      const response = await fetch(`/api/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          LongUrl: formattedUrl,
          ShortName: nanoid(4),
          time: time,
          date: date,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.warn(result.error || "Something went wrong", {
          position: "top-right",
          autoClose: 1000,
        });
        setMsg("");
        setOn(false);
        return;
      }

      toast.success("The shorturl has been generated successfully", {
        position: "top-right",
        autoClose: 1000,
      });

      setOn(false);
      setMsg("");
      setCopied(false);

      setTimeout(() => {
        setMsg(result.fullShortUrl);
        setOn(true);
      }, 0);

      setLongUrl("");
    } catch (err) {
      toast.error("Server error Try again later", {
        position: "top-right",
        autoClose: 1000,
      });
      console.error(err);
      setMsg("");
    } finally {
      setloading(false);
    }
  }

  // Validation Function
  function isValidURL(userURL) {
    try {
      const url = new URL(userURL);
      return url.hostname.includes(".");
    } catch {
      return false;
    }
  }

  // Toggle Section
  function toggleSection(key) {
    if (key === "Shortener") {
      settoggler(false);
      setactiveTab("Shortener");
      setMsg("");
      setOn(false);
      setCopied(false);
    } else {
      settoggler(true);
      setactiveTab(key);
      setOn(false);
      setMsg("");
      setCopied(false);
    }
  }

  // Click Count Handler
  const handleCount = async () => {
    if (ShortName.length === 0) {
      toast.warn("Please enter the short Name", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }
    setloading(true);
    try {
      let a = await fetch("api/count-clicks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ShortName: ShortName,
        }),
      });
      const clicks = await a.json();
      if (clicks.error) {
        setloading(false);
        toast.error(clicks.error, {
          position: "top-right",
          autoClose: 1000,
        });
      } else {
        setloading(false);
        setOn(true);
        setMsg(clicks.totalClicks);
      }
    } catch {
      setloading(false);
      toast.error("Error fetching clicks", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const FeatureItem = ({ icon, text }) => (
    <div className="flex items-center gap-2.5 bg-black/10 border-2 border-black p-2.5 text-xs sm:text-sm font-black text-black">
      <span className="text-base">{icon}</span>
      <span>{text}</span>
    </div>
  );

  return (
    <div className="App min-h-screen bg-[#FFFDF0] text-black select-none overflow-x-hidden">
      <ToastContainer className="pt-16" />

      {/* ===================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================== */}
      <section className="relative w-full pt-12 pb-16 md:pt-20 md:pb-24 px-4 bg-halftone-warm border-b-4 border-black overflow-hidden">
        {/* Floating 90s Pop Stickers (Desktop) */}
        <div className="hidden lg:block absolute top-12 left-8 -rotate-12 pointer-events-none animate-float">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#EF4444] text-white font-bungee text-xs uppercase border-3 border-black shadow-[4px_4px_0px_#000]">
            <Flame className="w-4 h-4 fill-white" /> 100% FREE
          </span>
        </div>

        <div className="hidden lg:block absolute top-16 right-10 rotate-6 pointer-events-none animate-wiggle">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FACC15] text-black font-bungee text-xs uppercase border-3 border-black shadow-[4px_4px_0px_#000]">
            <Zap className="w-4 h-4 fill-black" /> INSTANT SPEED
          </span>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {/* Top Pill Sticker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border-3 border-black shadow-[3px_3px_0px_#000] rotate-[-1deg] mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-ping" />
            <span className="font-bungee text-xs tracking-wider text-black">
              MAXIMALIST LINK ENGINE
            </span>
          </div>

          {/* Oversized Headline */}
          <h1 className="font-bungee text-4xl sm:text-6xl md:text-7xl text-center leading-tight tracking-tight text-black drop-shadow-[3px_3px_0px_#FACC15]">
            TRIM YOUR LINKS. <br className="hidden sm:inline" />
            <span className="text-[#EF4444] drop-shadow-[3px_3px_0px_#000]">
              BOOST YOUR BRAND!
            </span>
          </h1>

          {/* Subheading */}
          <p className="font-space text-base sm:text-xl font-bold text-black/80 text-center max-w-2xl mt-4 leading-snug">
            Tired of boring, cluttered links? Generate clean, lightning-fast short URLs with real-time analytics and zero hidden charges.
          </p>

          {/* ================= INPUT CONTAINER ================= */}
          <div className="w-full max-w-3xl mt-8 bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-4 sm:p-6 relative">
            {/* Corner Badge */}
            <div className="absolute -top-3.5 right-4 bg-[#FACC15] border-2 border-black px-2.5 py-0.5 text-[11px] font-black uppercase rotate-2 shadow-[2px_2px_0px_#000]">
              QUICK TOOL
            </div>

            {/* ================= TABS ================= */}
            <div className="flex w-full border-3 border-black mb-5 shadow-[3px_3px_0px_#000]">
              <button
                onClick={() => toggleSection("Shortener")}
                className={`w-1/2 py-3 text-sm sm:text-base font-bungee tracking-wider transition-colors cursor-pointer border-r-3 border-black ${
                  activeTab === "Shortener"
                    ? "bg-[#FACC15] text-black"
                    : "bg-[#FFFDF0] text-black/70 hover:bg-[#FEF3C7]"
                }`}
              >
                ⚡ SHORTENER
              </button>

              <button
                onClick={() => toggleSection("Counter")}
                className={`w-1/2 py-3 text-sm sm:text-base font-bungee tracking-wider transition-colors cursor-pointer ${
                  activeTab === "Counter"
                    ? "bg-[#FACC15] text-black"
                    : "bg-[#FFFDF0] text-black/70 hover:bg-[#FEF3C7]"
                }`}
              >
                📊 CLICK TRACKER
              </button>
            </div>

            {/* ================= INPUT ROW ================= */}
            {activeTab === "Shortener" && (
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <input
                  type="url"
                  autoFocus
                  autoComplete="on"
                  value={LongUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && GenerateUrl()}
                  placeholder="Paste your long link here... (e.g. https://my-cool-site.com)"
                  className="flex-1 px-4 py-3.5 border-3 border-black text-black font-bold text-sm sm:text-base placeholder:text-black/40 bg-[#FFFDF0] focus:bg-white focus:outline-none focus:ring-0 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.06)]"
                />

                <button
                  onClick={GenerateUrl}
                  disabled={loading}
                  className="brutal-btn brutal-btn-red px-6 py-3.5 font-bungee text-sm sm:text-base tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                >
                  {loading ? "TRIMMING..." : "TRIM LINK NOW ⚡"}
                </button>
              </div>
            )}

            {activeTab === "Counter" && (
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <input
                  autoFocus
                  type="text"
                  value={ShortName}
                  onChange={(e) => setShortName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCount()}
                  placeholder="Paste short name or alias... (e.g. abcd)"
                  className="flex-1 px-4 py-3.5 border-3 border-black text-black font-bold text-sm sm:text-base placeholder:text-black/40 bg-[#FFFDF0] focus:bg-white focus:outline-none focus:ring-0 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.06)]"
                />

                <button
                  onClick={handleCount}
                  disabled={loading}
                  className="brutal-btn brutal-btn-yellow px-6 py-3.5 font-bungee text-sm sm:text-base tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                >
                  {loading ? "CHECKING..." : "COUNT CLICKS 📊"}
                </button>
              </div>
            )}

            {/* ================= RESULT BOX ================= */}
            {On && (
              <div className="mt-6 p-5 sm:p-6 bg-[#FEF3C7] border-3 border-black shadow-[5px_5px_0px_#000] animate-slideDown flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b-2 border-black/20">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-black text-[#FACC15] text-[10px] font-black uppercase mb-1">
                      {toggler ? "ANALYTICS RESULT" : "GENERATED SHORT LINK"}
                    </span>
                    <h3 className="font-bungee text-lg sm:text-xl text-black">
                      {toggler ? "TOTAL CLICKS COUNTED" : "READY TO SHARE!"}
                    </h3>
                  </div>

                  {!toggler && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(Msg);
                        setCopied(true);
                        toast.success("Copied to clipboard!");
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="brutal-btn brutal-btn-yellow px-4 py-2 text-xs font-black uppercase tracking-wider"
                    >
                      {copied ? (
                        <span className="flex items-center gap-1.5">
                          <Check className="w-4 h-4 stroke-[3]" /> COPIED!
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <Copy className="w-4 h-4" /> COPY LINK
                        </span>
                      )}
                    </button>
                  )}
                </div>

                {/* Display Value */}
                <div className="p-3.5 bg-white border-2 border-black flex items-center gap-3 shadow-[2px_2px_0px_#000]">
                  <Image src="/link.png" width={28} height={28} alt="link icon" className="shrink-0" />
                  {toggler ? (
                    <span className="font-bungee text-2xl sm:text-3xl text-[#EF4444]">
                      {Msg} <span className="text-xs text-black font-space">CLICKS</span>
                    </span>
                  ) : (
                    <a
                      href={Msg}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bungee text-base sm:text-xl text-black underline hover:text-[#EF4444] break-all"
                    >
                      {Msg}
                    </a>
                  )}
                </div>

                {/* ================= PREMIUM IN-CARD PROMO ================= */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FACC15] via-[#FB923C] to-[#EF4444] border-3 border-black shadow-[4px_4px_0px_#000] text-black">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-bungee text-base sm:text-lg flex items-center gap-1.5">
                      <Flame className="w-5 h-5 fill-black" /> UNLOCK PRO POWERS
                    </span>
                    <span className="px-2 py-0.5 bg-black text-white text-[11px] font-black uppercase border border-black rotate-[-2deg]">
                      $0 PRO PASS
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    <FeatureItem icon="🔒" text="Password Protected Links" />
                    <FeatureItem icon="⏱️" text="Custom Expiration Controls" />
                    <FeatureItem icon="🎯" text="UTM Campaign Parameters" />
                    <FeatureItem icon="📱" text="Print-Ready QR Codes" />
                  </div>

                  <Link
                    href="/sign-up-to-trimify"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-black text-[#FACC15] hover:bg-white hover:text-black border-2 border-black font-bungee text-xs sm:text-sm tracking-wider shadow-[2px_2px_0px_#000] transition-colors"
                  >
                    <span>CLAIM 100% FREE PRO ACCOUNT</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* WHY CHOOSE TRIMIFY + STATS SECTION */}
      {/* ===================================================== */}
      <FeatureCards />

      {/* ===================================================== */}
      {/* PRICING SECTION (Free and Premium) */}
      {/* ===================================================== */}
      <div className="bg-[#FFFBEB] border-y-4 border-black py-4">
        <PricingSection />
      </div>

      {/* ===================================================== */}
      {/* FAQ SECTION WITH ACCORDION + FINAL CTA */}
      {/* ===================================================== */}
      <FAQSection />
    </div>
  );
}
