import React from "react";
import Image from "next/image";
import { Mail, Phone, MessageSquare, Sparkles, Send, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Contact Us | Trimify",
  description:
    "Get in touch with Trimify for feedback and support. Contact us via email, phone, or WhatsApp. We are always waiting for your feedback!",
  keywords: [
    "contact Trimify",
    "support URL shortener",
    "customer service Trimify",
    "URL shortener help",
    "contact link shortener",
  ],
  alternates: {
    canonical: "https://trimy.me/contact",
  },
  openGraph: {
    title: "Contact Trimify Support",
    description:
      "Get in touch with Trimify for feedback and technical support. Direct channels for email, phone, and WhatsApp.",
    url: "/contact",
    siteName: "Trimify",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 600,
        alt: "Trimify logo",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact – Trimify",
    description: "Get in touch with Trimify for feedback and support.",
    images: ["/og-image.png"],
  },
};

const Contact = () => {
  return (
    <main
      className="min-h-[calc(100vh-142px)] w-full bg-halftone-warm py-12 px-4 sm:px-6 select-none"
      aria-label="Main contact section"
    >
      <div className="max-w-4xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-10">
        {/* Top Tag Sticker */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b-3 border-black">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1deg]">
            <Sparkles className="w-4 h-4 fill-black" />
            <span>DIRECT CHANNELS</span>
          </div>

          <span className="text-xs font-black text-[#EF4444] uppercase tracking-wider">
            ✦ FAST HUMAN SUPPORT ✦
          </span>
        </div>

        {/* Heading */}
        <h1
          id="contact-heading"
          className="font-bungee text-3xl sm:text-5xl text-black tracking-tight mt-6 mb-3 drop-shadow-[2px_2px_0px_#FACC15]"
        >
          GET IN TOUCH
        </h1>
        <p className="font-space text-sm sm:text-base font-bold text-black/75 max-w-2xl mb-8 leading-relaxed">
          Have an idea, bug report, or want to explore an enterprise feature? We review every message and continuously polish Trimify based on your feedback.
        </p>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Email Card */}
          <div className="bg-[#FFFDF0] border-3 border-black p-5 shadow-[4px_4px_0px_#000] flex flex-col justify-between hover:-translate-y-1 transition-transform">
            <div>
              <div className="w-12 h-12 bg-[#FACC15] border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0px_#000]">
                <Mail className="w-6 h-6 text-black stroke-[2.5]" />
              </div>
              <h3 className="font-bungee text-lg text-black mb-1">EMAIL SUPPORT</h3>
              <p className="font-space text-xs font-bold text-black/70 mb-4">
                Fast replies within 24 hours.
              </p>
            </div>
            <a
              href="mailto:trimify4u@gmail.com"
              className="brutal-btn bg-black text-[#FACC15] hover:bg-white hover:text-black py-2.5 px-3 font-bungee text-xs tracking-wider inline-flex items-center justify-center gap-1.5 break-all"
            >
              <span>trimify4u@gmail.com</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          {/* Phone Card */}
          <div className="bg-[#FFFDF0] border-3 border-black p-5 shadow-[4px_4px_0px_#000] flex flex-col justify-between hover:-translate-y-1 transition-transform">
            <div>
              <div className="w-12 h-12 bg-[#F97316] border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0px_#000]">
                <Phone className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <h3 className="font-bungee text-lg text-black mb-1">DIRECT PHONE</h3>
              <p className="font-space text-xs font-bold text-black/70 mb-4">
                Available during standard hours.
              </p>
            </div>
            <a
              href="tel:+923159890576"
              className="brutal-btn bg-[#F97316] text-white hover:bg-black py-2.5 px-3 font-bungee text-xs tracking-wider inline-flex items-center justify-center gap-1.5"
            >
              <span>+92 315 9890576</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-[#FFFDF0] border-3 border-black p-5 shadow-[4px_4px_0px_#000] flex flex-col justify-between hover:-translate-y-1 transition-transform">
            <div>
              <div className="w-12 h-12 bg-[#22C55E] border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0px_#000]">
                <MessageSquare className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <h3 className="font-bungee text-lg text-black mb-1">WHATSAPP CHAT</h3>
              <p className="font-space text-xs font-bold text-black/70 mb-4">
                Instant messaging & rapid queries.
              </p>
            </div>
            <a
              href="https://wa.me/03159890576"
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn bg-[#22C55E] text-black hover:bg-black hover:text-white py-2.5 px-3 font-bungee text-xs tracking-wider inline-flex items-center justify-center gap-1.5"
            >
              <span>CHAT ON WHATSAPP</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="p-4 bg-[#FEF3C7] border-3 border-black shadow-[3px_3px_0px_#000] text-center font-bungee text-sm sm:text-base text-black flex items-center justify-center gap-2">
          <span>⚡ WE ARE ALWAYS WAITING FOR YOUR FEEDBACK! ⚡</span>
        </div>
      </div>
    </main>
  );
};

export default Contact;
