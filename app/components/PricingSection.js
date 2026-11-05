"use client";
import React from "react";
import Link from "next/link";
import {
  Check,
  Star,
  BarChart3,
  Lock,
  Link as LinkIcon,
  QrCode,
  Globe,
  Clock,
  ShieldCheck,
  Flame,
  Zap,
  Sparkles,
} from "lucide-react";

export const PricingSection = () => {
  const plans = [
    {
      name: "FREE STARTER",
      price: "$0",
      cadence: "FOREVER FREE",
      badge: "ESSENTIAL",
      badgeColor: "bg-[#FACC15] text-black",
      cardBg: "bg-white",
      description: "Ideal for quick sharing, social bios, and personal projects.",
      features: [
        { label: "Unlimited Short Links", icon: LinkIcon },
        { label: "Real-time Click Counters", icon: BarChart3 },
        { label: "Standard QR Code Generator", icon: QrCode },
        { label: "Instant Redirection Speed", icon: Zap },
      ],
      button: "START FOR FREE",
      buttonStyle: "bg-white text-black hover:bg-[#FFFBEB]",
      highlight: false,
    },
    {
      name: "PREMIUM PRO",
      price: "$0",
      originalPrice: "$30",
      cadence: "LIFETIME PASS",
      badge: "🔥 100% FREE LIFETIME",
      badgeColor: "bg-[#EF4444] text-white animate-wiggle",
      cardBg: "bg-[#FFFBEB]",
      description: "Everything you need for serious growth, creators & power link managers.",
      features: [
        { label: "Everything in Free Starter", icon: Check },
        { label: "Custom Branded Aliases / Slugs", icon: Globe },
        { label: "Password-Protected Secret Links", icon: Lock },
        { label: "Link Expiration Date & Click Limits", icon: Clock },
        { label: "UTM Campaign Source & Medium Builder", icon: Sparkles },
        { label: "Full Geo & Device Analytics", icon: BarChart3 },
        { label: "Priority Fast-Track Support", icon: ShieldCheck },
      ],
      button: "CLAIM FREE LIFETIME PRO",
      buttonStyle: "bg-[#EF4444] text-white hover:bg-[#DC2626]",
      highlight: true,
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24 relative select-none">
      {/* Decorative Floating Stickers */}
      <div className="hidden lg:block absolute -top-4 right-8 rotate-12 z-10 pointer-events-none">
        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#F97316] text-white font-black text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000]">
          <Star className="w-4 h-4 fill-[#FACC15] text-black" /> NO HIDDEN UPSELLS
        </span>
      </div>

      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FACC15] border-2 border-black shadow-[3px_3px_0px_#000] rotate-[-1.5deg] mb-3">
          <Flame className="w-4 h-4 fill-[#EF4444] text-[#EF4444]" />
          <span className="text-xs font-black uppercase tracking-wider text-black">
            UNBEATABLE PRICING
          </span>
        </div>
        <h2 className="font-bungee text-3xl md:text-5xl text-black tracking-tight drop-shadow-[2px_2px_0px_#FACC15]">
          SIMPLE & TRANSPARENT PRICING
        </h2>
        <p className="font-space text-base md:text-lg font-bold text-black/75 max-w-xl mx-auto mt-2">
          Pick your plan, start trimming URLs in 3 seconds. Our Premium plan is currently <span className="underline decoration-[#EF4444] decoration-4 font-black text-black">100% Free ($0)</span> for early adopters!
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative flex flex-col justify-between border-4 border-black p-6 md:p-8 ${plan.cardBg} transition-all duration-200 ${
              plan.highlight
                ? "shadow-[8px_8px_0px_#000] md:-translate-y-2 ring-2 ring-[#EF4444]"
                : "shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:-translate-y-1"
            }`}
          >
            {/* Top Badge Sticker */}
            <div className="absolute -top-4 left-6 z-10">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] ${plan.badgeColor}`}
              >
                {plan.badge}
              </span>
            </div>

            <div>
              {/* Card Header */}
              <div className="pt-2 pb-4 border-b-3 border-black">
                <h3 className="font-bungee text-2xl md:text-3xl text-black tracking-wide">
                  {plan.name}
                </h3>
                <p className="text-xs md:text-sm font-bold text-black/70 mt-1">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-3">
                  {plan.originalPrice && (
                    <span className="font-bungee text-xl text-black/40 line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className="font-bungee text-4xl md:text-5xl text-black drop-shadow-[2px_2px_0px_#FACC15]">
                    {plan.price}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-black uppercase bg-[#FACC15] text-black border-2 border-black shadow-[1px_1px_0px_#000] rotate-[-2deg]">
                    {plan.cadence}
                  </span>
                </div>
              </div>

              {/* Feature List */}
              <ul className="py-6 space-y-3.5">
                {plan.features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-none bg-[#FACC15] border-2 border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#000]">
                        <Icon className="w-3.5 h-3.5 text-black stroke-[3]" />
                      </div>
                      <span className="font-bold text-sm md:text-base text-black">
                        {feature.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Bottom CTA Button */}
            <div className="pt-4 border-t-2 border-black/15">
              <Link
                href="/sign-up-to-trimify"
                className={`w-full brutal-btn py-3.5 px-6 font-bungee text-sm md:text-base tracking-wider ${plan.buttonStyle}`}
              >
                <span>{plan.button}</span>
                <span className="ml-2">⚡</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
