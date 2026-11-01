import Link from "next/link";
import HeroSection from "./components/HeroSection";
import Script from "next/script";

export const metadata = {
  title: "Free URL Shortener with Custom aliases, UTM Building & Analytics | Trimify",
  description:
    "Trimify is a powerful free URL shortener that lets you create custom short links,add password protection to Links,build UTM,track clicks with real‑time analytics, generate QR codes, and manage links easily. Trusted by marketers and businesses for branding and performance.",
  keywords: [
    "free url shortener",
    "trim urls",
    "qr code generator",
    "short link generator",
    "add UTM tracking to Links",
    "password protected links",
    "free link shortener with custom name",
    "trackable short links",
    "dropbox ",
    "bitly alternative",
    "brandable short links",
    "barcode generator",
    "UTM builder",
    "link management tool",
  ],
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL("https://www.trimy.me"),
  alternates: {
    canonical: "https://www.trimy.me",
    languages: {
      "en": "https://www.trimy.me/",
      "en-US": "https://www.trimy.me/",
      "en-GB": "https://www.trimy.me/",
      "x-default": "https://www.trimy.me/",
    },
  },
  openGraph: {
    title: "Free URL Shortener with Custom aliases, UTM Building & Analytics | Trimify",
    description:
      "Trimify is a powerful free URL shortener that lets you create custom short links,add password protection to Links,build UTM,track clicks with real‑time analytics, generate QR codes, and manage links easily. Trusted by marketers and businesses for branding and performance.",
    url: "https://www.trimy.me",
    siteName: "Trimify - Free URL Shortener",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Trimify - Link Shortener with Analytics",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free URL Shortener with Custom aliases, UTM Building & Analytics | Trimify",
    description:
      "Trimify makes shortening, tracking, and managing custom short URLs easy and free. Includes analytics, QR codes, and real‑time click data.",
    images: ["/og-image.png"],
  },
};

export const dynamic = "force-static";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.trimy.me/#software",
        "name": "Trimify",
        "operatingSystem": "All",
        "applicationCategory": "BusinessApplication",
        "description": "Professional URL shortener with UTM tracking and analytics.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }, // Fixed: Added missing closing brace and comma
      {
        "@type": "Service",
        "@id": "https://www.trimy.me/#service",
        "name": "Free URL Shortener with Custom aliases, UTM Building & Analytics | Trimify",
        "provider": {
          "@type": "Organization",
          "name": "Trimify",
          "url": "https://www.trimy.me/"
        },
        "description": "Trimify is a powerful free URL shortener that lets you create custom short links,add password protection to Links,build UTM,track clicks with real‑time analytics, generate QR codes, and manage links easily. Trusted by marketers and businesses for branding and performance.",
        "serviceType": "URL Shortening",
        "url": "https://www.trimy.me/"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.trimy.me/#breadcrumblist",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.trimy.me/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Sign Up to Trimify",
            "item": "https://www.trimy.me/sign-up-to-trimify"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Pricing",
            "item": "https://www.trimy.me/pricing"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Blogs",
            "item": "https://www.trimy.me/blog"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Privacy Policy",
            "item": "https://www.trimy.me/privacy-policy"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />
    </>
  );
}
