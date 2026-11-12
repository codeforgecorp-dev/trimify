import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, BookOpen, ArrowUpRight, Flame } from "lucide-react";

export const metadata = {
  keywords: [
    "URL shorteners",
    "URL shortening",
    "helpful and famous blogs",
    "Trimify",
    "free URL shortener",
    "Trimify blogs",
    "use cases",
  ],
  title: "Famous and Helpful BLOGS | Trimify-Blog",
  description: "Explore top articles related to URL shortening and link optimization with Trimify.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://www.trimy.me"),
  alternates: {
    canonical: "https://www.trimy.me/blog",
  },
  openGraph: {
    title: "Famous and Helpful BLOGS | Trimify-Blog",
    description: "Explore top articles related to URL shortening and link optimization with Trimify.",
    siteName: "Trimify - The Ultimate URL Shortener",
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
    title: "Famous and Helpful BLOGS | Trimify-Blog",
    description: "Explore top articles related to URL shortening and link optimization with Trimify.",
    images: ["/og-image.png"],
  },
};

const articles = [
  {
    num: "01",
    title: "Top 5 Best URL Shorteners 2025",
    snippet: "In this breakdown, compare top URL Shorteners with their pros, cons, and performance metrics.",
    href: "/blog/01",
    image: "/T5BUS.png",
    author: "Trimify Owner",
    tag: "COMPARISON",
    tagColor: "bg-[#EF4444] text-white",
  },
  {
    num: "02",
    title: "How to Use URL Shorteners?",
    snippet: "Step-by-step masterclass on how to shorten, brand, and track links across campaigns.",
    href: "/blog/02",
    image: "/HTUUS.png",
    author: "Trimify Owner",
    tag: "GUIDE",
    tagColor: "bg-[#F97316] text-white",
  },
  {
    num: "03",
    title: "Why Use Short Links?",
    snippet: "Short links add clean aesthetic to social media bios, boost CTR, and protect tracking integrity.",
    href: "/blog/03",
    image: "/WTUSL.png",
    author: "Trimify Owner",
    tag: "INSIGHTS",
    tagColor: "bg-[#FACC15] text-black",
  },
  {
    num: "04",
    title: "Free vs Premium URL Shorteners",
    snippet: "Which one is right for your workflow? Discover the key differences in analytics and limits.",
    href: "/blog/04",
    image: "/FVPUS.png",
    author: "Trimify Owner",
    tag: "ANALYSIS",
    tagColor: "bg-[#EF4444] text-white",
  },
];

const BlogPage = () => {
  return (
    <main className="min-h-[calc(100vh-142px)] w-full bg-halftone-warm py-12 px-4 sm:px-6 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000] rotate-[-2deg] mb-3">
            <BookOpen className="w-4 h-4" />
            <span>KNOWLEDGE HUB</span>
          </div>
          <h1 className="font-bungee text-3xl sm:text-5xl md:text-6xl text-black tracking-tight drop-shadow-[3px_3px_0px_#FACC15]">
            FAMOUS & HELPFUL BLOGS
          </h1>
          <p className="font-space text-sm sm:text-base font-bold text-black/75 max-w-xl mx-auto mt-2">
            Tactics, deep dives, and comparisons to supercharge your link marketing strategies.
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item, idx) => (
            <article
              key={idx}
              className="group bg-white border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Image Container with Top Badge */}
                <div className="relative border-b-3 border-black bg-black h-48 overflow-hidden">
                  <Image
                    alt={item.title}
                    src={item.image}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-0.5 text-[11px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                  <span className="absolute top-3 right-3 font-bungee text-sm px-2 py-0.5 bg-black text-[#FACC15] border-2 border-black shadow-[2px_2px_0px_#fff]">
                    #{item.num}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="font-bungee text-lg sm:text-xl text-black group-hover:text-[#EF4444] transition-colors leading-snug mb-2">
                    <Link href={item.href} className="flex items-start justify-between gap-1">
                      <span>{item.title}</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </h2>
                  <p className="font-space text-xs sm:text-sm font-bold text-black/70 leading-relaxed mb-4">
                    {item.snippet}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-5 pb-5 pt-3 border-t-2 border-black/10 flex items-center justify-between text-xs font-bold text-black/60">
                <span>By: <strong className="text-black font-black">{item.author}</strong></span>
                <Link
                  href={item.href}
                  className="font-bungee text-xs text-black underline hover:text-[#EF4444]"
                >
                  READ ARTICLE →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
