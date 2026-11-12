"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { initializePaddle } from "@paddle/paddle-js";
import { Flame, Check, Zap, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

const Pricing = () => {
  const [Paddle, setPaddle] = useState();

  useEffect(() => {
    initializePaddle({
      environment: "production",
      token: "live_a815729aae0584b88a5f9767dad",
    }).then((paddleData) => {
      setPaddle(paddleData);
    });
  }, []);

  async function handleCheckout() {
    if (!Paddle) {
      console.log("Paddle Not Initialized");
      return;
    }
    Paddle.Checkout.open({
      items: [{ price_id: "pri_01kd65j8qqb4zjtaj9ebzsgqdw", quantity: 1 }],
      settings: {
        displayMode: "overlay",
        theme: "dark",
        successUrl: "https://www.trimy.me/sign-up-to-trimify",
        closeCallback() {
          console.log("Checkout Close");
        },
      },
    });
  }

  return (
    <section className="min-h-screen bg-halftone-warm py-16 px-4 select-none">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000] rotate-[-2deg] mb-4">
          <Sparkles className="w-4 h-4 fill-black" />
          <span>TRANSPARENT VALUE</span>
        </div>
        <h1 className="font-bungee text-3xl sm:text-5xl md:text-6xl text-black tracking-tight drop-shadow-[2px_2px_0px_#FACC15]">
          TRIM LINKS. BOOST REACH.
        </h1>
        <p className="font-space font-bold text-base sm:text-xl text-black/75 mt-3 max-w-xl mx-auto">
          Choose the plan that suits your scale. Honest pricing, extreme speed, zero surprises.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* BASIC PLAN */}
        <div className="relative bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000] flex flex-col justify-between hover:-translate-y-1 transition-transform">
          {/* Top Badge */}
          <div className="absolute -top-3.5 left-6">
            <span className="px-3 py-1 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
              STANDARD
            </span>
          </div>

          <div>
            <div className="pb-4 border-b-3 border-black">
              <h2 className="font-bungee text-2xl sm:text-3xl text-black">
                BASIC PLAN
              </h2>
              <p className="font-space text-xs sm:text-sm font-bold text-black/70 mt-1">
                For casual users & personal link sharing
              </p>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-bungee text-5xl text-black drop-shadow-[2px_2px_0px_#FACC15]">
                  $0
                </span>
                <span className="font-space text-xs font-black uppercase text-black/60">
                  / FOREVER FREE
                </span>
              </div>
            </div>

            <ul className="py-6 space-y-3 font-space text-sm sm:text-base font-bold text-black">
              <li className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-black stroke-[3]" /> Dashboard access
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-black stroke-[3]" /> Non-expiry links
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-black stroke-[3]" /> Ad-free redirects
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-black stroke-[3]" /> QR code generation
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-black stroke-[3]" /> Real-time click counter
              </li>
            </ul>
          </div>

          <Link
            href="/sign-up-to-trimify"
            className="w-full brutal-btn bg-white text-black hover:bg-[#FFFBEB] py-3.5 font-bungee text-sm sm:text-base tracking-wider"
          >
            <span>CONTINUE FREE</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        {/* PREMIUM PLAN */}
        <div className="relative bg-[#FFFBEB] border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-between md:-translate-y-2 ring-2 ring-[#EF4444]">
          {/* Top Badge */}
          <div className="absolute -top-4 left-6">
            <span className="px-3.5 py-1 bg-[#EF4444] text-white font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] animate-wiggle">
              🔥 50% OFF · LIMITED OFFER
            </span>
          </div>

          <div>
            <div className="pb-4 border-b-3 border-black">
              <h2 className="font-bungee text-2xl sm:text-3xl text-black">
                PREMIUM PRO
              </h2>
              <p className="font-space text-xs sm:text-sm font-bold text-black/70 mt-1">
                Best for businesses, power creators & marketers
              </p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-bungee text-2xl text-black/40 line-through">
                  $30
                </span>
                <span className="font-bungee text-5xl text-[#EF4444] drop-shadow-[2px_2px_0px_#000]">
                  $15
                </span>
                <span className="px-2 py-0.5 text-xs font-black uppercase bg-[#FACC15] text-black border-2 border-black shadow-[1px_1px_0px_#000] rotate-[-2deg]">
                  LIFETIME ACCESS
                </span>
              </div>
            </div>

            <ul className="py-6 space-y-3 font-space text-sm sm:text-base font-bold text-black">
              <li className="flex items-center gap-2.5">
                <Zap className="w-5 h-5 fill-[#FACC15] text-black stroke-[2]" /> Everything in Basic
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-[#EF4444] stroke-[3]" /> UTM campaign tracking builder
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-[#EF4444] stroke-[3]" /> Link expiry (by date or click limits)
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-[#EF4444] stroke-[3]" /> Password-protected secure links
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-[#EF4444] stroke-[3]" /> Custom branded short aliases
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-[#EF4444] stroke-[3]" /> Custom high-res QR code exports
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-[#EF4444] stroke-[3]" /> Deep geo & device analytics
              </li>
            </ul>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full brutal-btn brutal-btn-yellow py-3.5 font-bungee text-sm sm:text-base tracking-wider cursor-pointer"
          >
            <span>GET LIFETIME ACCESS NOW</span>
            <span className="ml-2">⚡</span>
          </button>
        </div>
      </div>

      {/* Footer Guarantee */}
      <div className="text-center mt-12 font-space font-bold text-xs sm:text-sm text-black/70 flex flex-wrap justify-center items-center gap-4">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#EF4444]" /> 256-Bit SSL Encrypted
        </span>
        <span>•</span>
        <span>Instant Checkout Activation</span>
        <span>•</span>
        <span>Lifetime Updates Included</span>
      </div>
    </section>
  );
};

export default Pricing;
