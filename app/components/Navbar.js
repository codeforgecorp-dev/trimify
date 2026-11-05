"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap, Sparkles, Flame, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full select-none">
      {/* Top Ticker Marquee Strip */}
      <div className="bg-[#0A0A0A] text-[#FACC15] border-b-2 border-black overflow-hidden py-1 text-xs md:text-sm font-black tracking-widest uppercase">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6">
          <span className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 fill-[#FACC15] text-[#FACC15]" />
            SHORTEN SMART
          </span>
          <span>✦</span>
          <span className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 fill-[#EF4444] text-[#EF4444]" />
            SHARE FAST
          </span>
          <span>✦</span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 fill-[#F97316] text-[#F97316]" />
            100% FREE FOREVER
          </span>
          <span>✦</span>
          <span>CUSTOM SLUGS & QR CODES</span>
          <span>✦</span>
          <span className="text-[#EF4444]">🔥 OVER 50,000+ CLICKS TRACKED</span>
          <span>✦</span>
          <span className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 fill-[#FACC15] text-[#FACC15]" />
            SHORTEN SMART
          </span>
          <span>✦</span>
          <span className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 fill-[#EF4444] text-[#EF4444]" />
            SHARE FAST
          </span>
          <span>✦</span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 fill-[#F97316] text-[#F97316]" />
            100% FREE FOREVER
          </span>
          <span>✦</span>
          <span>CUSTOM SLUGS & QR CODES</span>
          <span>✦</span>
          <span className="text-[#EF4444]">🔥 OVER 50,000+ CLICKS TRACKED</span>
          <span>✦</span>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <nav className="bg-[#FACC15] border-b-4 border-black px-3 md:px-6 py-2.5 shadow-[0px_4px_0px_#000]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo & Playful Badges */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/"
              className="group flex items-center gap-2 focus:outline-none"
              aria-label="Trimify Home"
            >
              <div className="relative">
                <span className="font-bungee text-2xl md:text-4xl text-[#0A0A0A] tracking-wider drop-shadow-[2px_2px_0px_#fff] group-hover:text-[#EF4444] transition-colors duration-150">
                  TRIMIFY
                </span>
                {/* 90s Pop Sparkle Star */}
                <span className="absolute -top-2 -right-3 text-xs animate-wiggle select-none">
                  ⚡
                </span>
              </div>
            </Link>

            {/* Rotated Sticker Badge */}
            <div className="hidden sm:inline-flex items-center gap-1 bg-[#EF4444] text-white text-[11px] font-black uppercase px-2.5 py-0.5 border-2 border-black rotate-[-2deg] shadow-[2px_2px_0px_#000] animate-wiggle">
              <Flame className="w-3 h-3 fill-white" />
              HOT & LOUD!
            </div>

            {/* Mini Slogan Pill */}
            <div className="hidden lg:inline-flex items-center text-[11px] font-bold uppercase tracking-tight bg-white text-black px-2 py-0.5 border-2 border-black rotate-[1.5deg] shadow-[2px_2px_0px_#000]">
              SHORTEN SMART · SHARE FAST
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-3 font-black">
            {[
              { label: "HOME", href: "/" },
              { label: "BLOG", href: "/blog" },
              { label: "CONTACT", href: "/contact" },
            ].map((link, idx) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-4 py-1.5 text-sm uppercase tracking-wider text-black bg-white border-2 border-black transition-all duration-150 ${
                  idx % 2 === 0
                    ? "hover:bg-[#FFFDF0] hover:rotate-[-1deg]"
                    : "hover:bg-[#FFEDD5] hover:rotate-[1deg]"
                } shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000]`}
              >
                {link.label}
              </Link>
            ))}

            {/* Loud Dashboard CTA Button */}
            <Link
              href="/sign-up-to-trimify"
              className="relative ml-2 inline-flex items-center gap-2 px-5 py-2 text-sm font-black uppercase tracking-wider text-white bg-[#EF4444] border-3 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] rotate-[-1deg] hover:rotate-0 transition-all duration-150 group"
            >
              <span>DASHBOARD</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/sign-up-to-trimify"
              className="text-xs font-black uppercase px-2.5 py-1.5 bg-[#EF4444] text-white border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5"
            >
              APP
            </Link>
            <button
              title="Toggle mobile menu"
              aria-label="Toggle mobile menu"
              name="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 bg-white text-black border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
            >
              {isOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {isOpen && (
          <div className="mt-3 pt-3 border-t-3 border-black bg-[#FFFDF0] -mx-3 -mb-2.5 p-4 shadow-[inset_0_4px_0px_rgba(0,0,0,0.1)] flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs font-black uppercase text-black/70 pb-1 border-b-2 border-black/20">
              <span>Quick Navigation</span>
              <span className="text-[#EF4444]">✦ MAXIMALIST SPEED ✦</span>
            </div>

            {[
              { label: "⚡ HOME", href: "/" },
              { label: "📰 BLOG", href: "/blog" },
              { label: "✉️ CONTACT", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-2 text-sm font-black uppercase bg-white border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-0.5 transition-all text-black hover:bg-[#FACC15]"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/sign-up-to-trimify"
              onClick={() => setIsOpen(false)}
              className="w-full mt-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-black uppercase text-white bg-[#EF4444] border-3 border-black shadow-[4px_4px_0px_#000] active:translate-y-0.5 transition-all"
            >
              <span>🚀 OPEN DASHBOARD</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;