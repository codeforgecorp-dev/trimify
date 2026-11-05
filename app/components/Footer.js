import React from "react";
import Link from "next/link";
import { Zap, Heart, Flame, Sparkles, ExternalLink, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0A0A0A] text-white border-t-4 border-black relative overflow-hidden select-none">
      {/* Decorative Warning Stripe / Marquee Accent */}
      <div className="bg-[#FACC15] text-black border-b-3 border-black py-1.5 overflow-hidden font-black text-xs md:text-sm uppercase tracking-wider">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 fill-black" />
            NO ADS ON PREMIUM
          </span>
          <span>✦</span>
          <span>LIGHTNING-FAST REDIRECTS</span>
          <span>✦</span>
          <span className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 fill-[#DC2626] text-[#DC2626]" />
            BUILT FOR SPEED & CONVERSIONS
          </span>
          <span>✦</span>
          <span>100% RELIABLE UPTIME</span>
          <span>✦</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 fill-black" />
            QR CODES INCLUDED
          </span>
          <span>✦</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 fill-black" />
            NO ADS ON PREMIUM
          </span>
          <span>✦</span>
          <span>LIGHTNING-FAST REDIRECTS</span>
          <span>✦</span>
          <span className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 fill-[#DC2626] text-[#DC2626]" />
            BUILT FOR SPEED & CONVERSIONS
          </span>
          <span>✦</span>
          <span>100% RELIABLE UPTIME</span>
          <span>✦</span>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Column (Col 1-5) */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="group inline-block">
                <span className="font-bungee text-3xl md:text-5xl text-[#FACC15] tracking-wide drop-shadow-[3px_3px_0px_#EF4444] group-hover:text-white transition-colors">
                  TRIMIFY
                </span>
              </Link>
              <span className="inline-block px-2.5 py-1 text-xs font-black uppercase bg-[#EF4444] text-white border-2 border-black rotate-[3deg] shadow-[2px_2px_0px_#FACC15]">
                LOUD & PROUD
              </span>
            </div>

            <p className="text-[#FFFDF0]/80 text-sm md:text-base font-bold max-w-sm leading-relaxed">
              The maximalist, high-voltage URL shortener. Shorten long messy links,
              generate custom branded aliases, track clicks with real-time analytics,
              and create scannable QR codes instantly.
            </p>

            {/* Retro 90s Badge Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFFDF0] text-black border-2 border-black shadow-[3px_3px_0px_#FACC15] font-black text-xs uppercase rotate-[-1deg]">
              <Flame className="w-4 h-4 fill-[#F97316] text-[#F97316]" />
              <span>POWERED BY WARM MAXIMALISM</span>
            </div>
          </div>

          {/* Quick Links (Col 6-8) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h3 className="text-sm font-black uppercase tracking-widest text-[#FACC15] flex items-center gap-2">
              <span>EXPLORE PAGES</span>
              <span className="h-0.5 w-12 bg-[#FACC15]"></span>
            </h3>

            <div className="grid grid-cols-2 gap-2 text-sm font-black">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Pricing", href: "/pricing" },
                { label: "Blog", href: "/blog" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Services", href: "/terms-and-services" },
                { label: "Refund Policy", href: "/refund-policy" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group inline-flex items-center justify-between p-2 bg-[#1A1A1A] hover:bg-[#FACC15] text-white hover:text-black border-2 border-[#333333] hover:border-black transition-all duration-150 hover:shadow-[3px_3px_0px_#EF4444] hover:-translate-y-0.5"
                >
                  <span className="truncate">{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick CTA Box (Col 9-12) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <div className="p-4 bg-[#FFFDF0] text-black border-3 border-black shadow-[5px_5px_0px_#EF4444] rotate-[1deg] hover:rotate-0 transition-transform">
              <span className="inline-block px-2 py-0.5 text-[10px] font-black uppercase bg-[#F97316] text-white border border-black mb-2 shadow-[1px_1px_0px_#000]">
                ⚡ INSTANT START
              </span>
              <h4 className="font-bungee text-lg leading-tight text-black">
                READY TO TRIM?
              </h4>
              <p className="text-xs font-bold text-black/70 mt-1 mb-3">
                No credit card needed. Generate clean links with custom slugs right now.
              </p>
              <Link
                href="/sign-up-to-trimify"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-black uppercase bg-[#FACC15] text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#FDE047] active:translate-y-0.5 transition-all"
              >
                <span>CLAIM DASHBOARD</span>
                <Zap className="w-3.5 h-3.5 fill-black" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Fun Details */}
        <div className="mt-12 pt-6 border-t-2 border-[#262626] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-[#FFFDF0]/70">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} <span className="text-[#FACC15] font-black">TRIMIFY</span>. All Rights Reserved. Built loud and fast.
          </p>

          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse"></span>
            <span className="text-white font-black uppercase tracking-wider text-[11px]">
              ALL SYSTEMS 100% OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;