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
"add UTM tracking to Links" , 
"password protected links",
"free link shortener with custom name",
"trackable short links",
 "dropbox " ,
"bitly alternative",
"brandable short links",
 "barcode generator", 
"UTM builder",
"link management tool",
  

  ],
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL("https://trimify.xyz"),
  alternates: {
    canonical: "http://trimify.xyz",
    languages: {
      "en": "https://trimify.xyz/",
      "en-US": "https://trimify.xyz/",
      "en-GB": "https://trimify.xyz/",
      "x-default": "https://trimify.xyz/",
    },
  },
  openGraph: {
    title: "Free URL Shortener with Custom aliases, UTM Building & Analytics | Trimify",
    description:
      "Trimify is a powerful free URL shortener that lets you create custom short links,add password protection to Links,build UTM,track clicks with real‑time analytics, generate QR codes, and manage links easily. Trusted by marketers and businesses for branding and performance.",
    url: "https://trimify.xyz",
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
  // In your homepage component, just above return()
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://trimify.xyz/#website",
      "url": "https://trimify.xyz/",
      "name": "Trimify",
      "description": "Trimify is a powerful free URL shortener that lets you create custom short links,add password protection to Links,build UTM,track clicks with real‑time analytics, generate QR codes, and manage links easily. Trusted by marketers and businesses for branding and performance.",
      "publisher": {
        "@type": "Organization",
        "name": "Trimify",
        "logo": {
          "@type": "ImageObject",
          "url": "https://trimify.xyz/og-image.png",
          "width": 1200,
          "height": 630
        }
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "Service",
      "@id": "https://trimify.xyz/#service",
      "name": "Free URL Shortener with Custom aliases, UTM Building & Analytics | Trimify",
      "provider": {
        "@type": "Organization",
        "name": "Trimify",
        "url": "https://trimify.xyz/"
      },
      "description": "Trimify is a powerful free URL shortener that lets you create custom short links,add password protection to Links,build UTM,track clicks with real‑time analytics, generate QR codes, and manage links easily. Trusted by marketers and businesses for branding and performance.",
      "serviceType": "URL Shortening",
      "url": "https://trimify.xyz/"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://trimify.xyz/#breadcrumblist",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://trimify.xyz/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Sign Up to Trimify",
          "item": "https://trimify.xyz/sign-up-to-trimify"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Pricing",
          "item": "https://trimify.xyz/pricing"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Blogs",
          "item": "https://trimify.xyz/blog"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Privacy Policy",
          "item": "https://trimify.xyz/privacy-policy"
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

       {/* Ad's Secrion */}         
    

    </>
  );
}
