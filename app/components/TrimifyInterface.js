"use client";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Shield, Zap, Users, Star, Flame, Sparkles, ArrowUp, Globe, Clock, BarChart3, CheckCircle2 } from "lucide-react";

export const FeatureCards = () => {
  const features = [
    {
      icon: Shield,
      title: "ENTERPRISE SECURITY",
      description: "End-to-end encryption with 256-bit SSL certificates. Password-protect links and restrict access anytime.",
      badge: "256-BIT SSL",
      badgeColor: "bg-[#FACC15] text-black",
      iconBg: "bg-[#FACC15]",
      rotation: "hover:-rotate-1",
    },
    {
      icon: Zap,
      title: "LIGHTNING FAST SPEED",
      description: "Instantaneous sub-100ms global redirects backed by top-tier edge CDN networks worldwide.",
      badge: "<100MS REDIRECT",
      badgeColor: "bg-[#EF4444] text-white",
      iconBg: "bg-[#EF4444]",
      rotation: "hover:rotate-1",
    },
    {
      icon: Users,
      title: "TRUSTED BY CREATORS",
      description: "Join over 1,000+ creators, marketers, and power users who depend on Trimify for clean link delivery.",
      badge: "1,000+ USERS",
      badgeColor: "bg-[#F97316] text-white",
      iconBg: "bg-[#F97316]",
      rotation: "hover:-rotate-1",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24 select-none">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EF4444] text-white border-2 border-black shadow-[3px_3px_0px_#000] rotate-[-2deg] mb-3 font-black text-xs uppercase tracking-wider animate-wiggle">
          <Sparkles className="w-4 h-4 fill-white" />
          <span>SUPERCHARGED CAPABILITIES</span>
        </div>
        <h2 className="font-bungee text-3xl md:text-5xl text-black tracking-tight drop-shadow-[2px_2px_0px_#FACC15]">
          WHY CHOOSE TRIMIFY?
        </h2>
        <p className="font-space text-base md:text-lg font-bold text-black/75 max-w-2xl mx-auto mt-2">
          High-performance URL infrastructure packaged inside an unapologetically bold, ultra-reliable tool.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              data-testid={`feature-card-${index}`}
              className={`relative bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between ${feature.rotation}`}
            >
              {/* Header with Icon + Badge */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 ${feature.iconBg} border-3 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]`}
                  >
                    <Icon className="w-7 h-7 text-black stroke-[2.5]" />
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] ${feature.badgeColor}`}
                  >
                    {feature.badge}
                  </span>
                </div>

                <h3 className="font-bungee text-xl md:text-2xl text-black mb-3">
                  {feature.title}
                </h3>

                <p className="font-space text-sm md:text-base font-bold text-black/75 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Decorative Pill */}
              <div className="mt-6 pt-4 border-t-2 border-black/10 flex items-center gap-2 text-xs font-black uppercase text-black/60">
                <CheckCircle2 className="w-4 h-4 text-[#EF4444]" />
                <span>INCLUDED ON ALL PLANS</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* STATS COUNTER BAR: 10K+ links, 50K+ clicks, 99.9% uptime, 120+ countries */}
      {/* ============================================================ */}
      <div className="mt-16 md:mt-24">
        {/* Section Mini Banner */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 bg-black text-[#FACC15] font-black text-xs md:text-sm uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_#EF4444] rotate-[1deg]">
            ⚡ PROVEN SCALE IN NUMBERS ⚡
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Stat 1: Links Shortened */}
          <div
            data-testid="stat-links-shortened"
            className="relative bg-[#FFFBEB] border-3 border-black p-5 md:p-6 shadow-[5px_5px_0px_#000] hover:-translate-y-1 transition-transform flex flex-col items-center text-center group"
          >
            <div className="absolute -top-3 -right-2 bg-[#FACC15] border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase rotate-6 shadow-[1px_1px_0px_#000]">
              LINKS
            </div>
            <div className="font-bungee text-3xl sm:text-4xl md:text-5xl text-black drop-shadow-[2px_2px_0px_#FACC15] group-hover:scale-105 transition-transform">
              10K+
            </div>
            <div className="font-space text-xs sm:text-sm font-black uppercase tracking-wider text-black/80 mt-1">
              Links Shortened
            </div>
          </div>

          {/* Stat 2: Clicks Tracked */}
          <div
            data-testid="stat-clicks-tracked"
            className="relative bg-[#FFFBEB] border-3 border-black p-5 md:p-6 shadow-[5px_5px_0px_#000] hover:-translate-y-1 transition-transform flex flex-col items-center text-center group"
          >
            <div className="absolute -top-3 -right-2 bg-[#EF4444] text-white border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase -rotate-6 shadow-[1px_1px_0px_#000]">
              ENGAGEMENT
            </div>
            <div className="font-bungee text-3xl sm:text-4xl md:text-5xl text-[#EF4444] drop-shadow-[2px_2px_0px_#000] group-hover:scale-105 transition-transform">
              50K+
            </div>
            <div className="font-space text-xs sm:text-sm font-black uppercase tracking-wider text-black/80 mt-1">
              Clicks Tracked
            </div>
          </div>

          {/* Stat 3: Uptime */}
          <div
            data-testid="stat-uptime"
            className="relative bg-[#FFFBEB] border-3 border-black p-5 md:p-6 shadow-[5px_5px_0px_#000] hover:-translate-y-1 transition-transform flex flex-col items-center text-center group"
          >
            <div className="absolute -top-3 -right-2 bg-[#F97316] text-white border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase rotate-3 shadow-[1px_1px_0px_#000]">
              RELIABLE
            </div>
            <div className="font-bungee text-3xl sm:text-4xl md:text-5xl text-[#F97316] drop-shadow-[2px_2px_0px_#000] group-hover:scale-105 transition-transform">
              99.9%
            </div>
            <div className="font-space text-xs sm:text-sm font-black uppercase tracking-wider text-black/80 mt-1">
              Guaranteed Uptime
            </div>
          </div>

          {/* Stat 4: Countries */}
          <div
            data-testid="stat-countries"
            className="relative bg-[#FFFBEB] border-3 border-black p-5 md:p-6 shadow-[5px_5px_0px_#000] hover:-translate-y-1 transition-transform flex flex-col items-center text-center group"
          >
            <div className="absolute -top-3 -right-2 bg-[#FACC15] text-black border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase -rotate-3 shadow-[1px_1px_0px_#000]">
              GLOBAL
            </div>
            <div className="font-bungee text-3xl sm:text-4xl md:text-5xl text-black drop-shadow-[2px_2px_0px_#F97316] group-hover:scale-105 transition-transform">
              120+
            </div>
            <div className="font-space text-xs sm:text-sm font-black uppercase tracking-wider text-black/80 mt-1">
              Countries Reached
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQSection = () => {
  const faqs = [
    {
      question: "How does Trimify work?",
      answer:
        "Trimify converts long, messy URLs into short, punchy links that redirect instantly. Every click is logged with geo-location, referrer, device, and browser analytics. You can also protect links with passwords or set custom expiry limits.",
    },
    {
      question: "Is Trimify free to use?",
      answer:
        "Yes! Trimify is 100% free with no hidden charges. You can generate unlimited short links, monitor real-time click counts, download custom QR codes, and create branded aliases. Our Lifetime Pro package is also currently free for early adopters.",
    },
    {
      question: "How long do shortened links last?",
      answer:
        "Trimify links stay active indefinitely by default. However, you can configure expiry dates or maximum click limits so links automatically self-deactivate whenever you desire.",
    },
    {
      question: "Can I track my link analytics?",
      answer:
        "Yes! Our real-time dashboard breaks down total clicks, geographic country origins with flags, browser types, and device categories so you can monitor campaign performance with laser accuracy.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Security is non-negotiable. Every link is served via HTTPS with 256-bit encryption. You can add password walls to sensitive URLs, and we never sell your click data to advertisers.",
    },
    {
      question: "Can I customize my short links?",
      answer:
        "Absolutely! You can choose custom aliases (e.g. www.trimy.me/my-brand) instead of random characters. You can also generate high-resolution QR codes to put on print cards, posters, or packaging.",
    },
  ];

  return (
    <section
      className="w-full max-w-4xl mx-auto px-4 py-16 md:py-24 select-none"
      data-testid="faq-section"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FACC15] text-black border-2 border-black shadow-[3px_3px_0px_#000] rotate-[1.5deg] mb-3 text-xs font-black uppercase tracking-wider">
          <Star className="w-3.5 h-3.5 fill-black" />
          <span>GOT QUESTIONS?</span>
        </div>
        <h2 className="font-bungee text-3xl md:text-5xl text-black tracking-tight drop-shadow-[2px_2px_0px_#FACC15]">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="font-space text-base md:text-lg font-bold text-black/75 mt-2">
          Everything you need to know about Trimify and URL superpowers.
        </p>
      </div>

      {/* FAQ Accordion */}
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-white border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] px-5 py-1 transition-all duration-150 data-[state=open]:bg-[#FFFBEB]"
            data-testid={`faq-item-${index}`}
          >
            <AccordionTrigger className="font-bungee text-base md:text-lg text-black hover:text-[#EF4444] transition-colors py-4 no-underline hover:no-underline">
              <span>{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="font-space text-sm md:text-base font-bold text-black/80 leading-relaxed pb-4 border-t-2 border-black/10 pt-3">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* ============================================================ */}
      {/* FINAL CTA: Loud, high-energy maximalist banner */}
      {/* ============================================================ */}
      <div className="mt-16 text-center p-8 md:p-12 bg-gradient-to-r from-[#FACC15] via-[#FB923C] to-[#EF4444] border-4 border-black shadow-[8px_8px_0px_#000] relative overflow-hidden">
        {/* Floating pop stickers */}
        <div className="absolute -top-3 left-6 -rotate-6">
          <span className="px-3 py-1 bg-black text-[#FACC15] font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#fff]">
            ⚡ INSTANT REDIRECTS
          </span>
        </div>
        <div className="absolute -bottom-3 right-6 rotate-6">
          <span className="px-3 py-1 bg-white text-black font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
            🔥 100% FREE
          </span>
        </div>

        <h3 className="font-bungee text-2xl md:text-4xl text-black drop-shadow-[2px_2px_0px_#fff] mb-3 leading-tight">
          READY TO TRIM YOUR FIRST LINK?
        </h3>
        <p className="font-space text-sm md:text-base font-black text-black/90 max-w-xl mx-auto mb-6">
          No sign-up mandatory to start. Paste your link at the top, hit Shorten, and share with the world!
        </p>

        <button
          className="brutal-btn bg-black text-[#FACC15] hover:bg-white hover:text-black py-3.5 px-8 font-bungee text-sm md:text-base tracking-wider shadow-[4px_4px_0px_#fff] hover:shadow-[6px_6px_0px_#fff]"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-testid="scroll-to-top-button"
        >
          <span className="flex items-center gap-2">
            <span>START SHORTENING NOW</span>
            <ArrowUp className="w-5 h-5 stroke-[3]" />
          </span>
        </button>
      </div>
    </section>
  );
};
