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
  metadataBase: new URL("https://www.trimify.xyz"),
  alternates: {
    canonical: "https://www.trimify.xyz",
    languages: {
      "en": "https://www.trimify.xyz/",
      "en-US": "https://www.trimify.xyz/",
      "en-GB": "https://www.trimify.xyz/",
      "x-default": "https://www.trimify.xyz/",
    },
  },
  openGraph: {
    title: "Free URL Shortener with Custom aliases, UTM Building & Analytics | Trimify",
    description:
      "Trimify is a powerful free URL shortener that lets you create custom short links,add password protection to Links,build UTM,track clicks with real‑time analytics, generate QR codes, and manage links easily. Trusted by marketers and businesses for branding and performance.",
    url: "https://www.trimify.xyz",
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
        "@type": "SoftwareApplication", // Changed from "Service" for better 2026 SEO
        "@id": "https://www.trimify.xyz/#software",
        "name": "Trimify",
        "operatingSystem": "All",
        "applicationCategory": "BusinessApplication",
        "description": "Professional URL shortener with UTM tracking and analytics.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
    {
      "@type": "Service",
      "@id": "https://www.trimify.xyz/#service",
      "name": "Free URL Shortener with Custom aliases, UTM Building & Analytics | Trimify",
      "provider": {
        "@type": "Organization",
        "name": "Trimify",
        "url": "https://www.trimify.xyz/"
      },
      "description": "Trimify is a powerful free URL shortener that lets you create custom short links,add password protection to Links,build UTM,track clicks with real‑time analytics, generate QR codes, and manage links easily. Trusted by marketers and businesses for branding and performance.",
      "serviceType": "URL Shortening",
      "url": "https://www.trimify.xyz/"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.trimify.xyz/#breadcrumblist",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.trimify.xyz/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Sign Up to Trimify",
          "item": "https://www.trimify.xyz/sign-up-to-trimify"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Pricing",
          "item": "https://www.trimify.xyz/pricing"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Blogs",
          "item": "https://www.trimify.xyz/blog"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Privacy Policy",
          "item": "https://www.trimify.xyz/privacy-policy"
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
