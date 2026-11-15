import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
export const metadata = {
  keywords: [
    "url shortener use cases",
    "how to use url shorteners",
    "url shortening benefits",
    "url shortener examples",
    "Trimify url shortener use cases",
    "marketing url short links",
    "social media url shortener",
  ],
  title: "Use Cases of URL Shorteners | Trimify",
    description:
      "Discover real-world use cases of URL shorteners across marketing, social media, and analytics. See how Trimify enhances link management and CTR.",
  icons: {
    icon: "/favicon.ico", // favicon
  },
  metadataBase: new URL("https://www.trimy.me"), // Replace with your domain later
  alternates: {
    canonical: "https://www.trimy.me/blog/05",
  },
  openGraph: {
    title: "Use Cases of URL Shorteners | Trimify",
    description:
      "Discover real-world use cases of URL shorteners across marketing, social media, and analytics. See how Trimify enhances link management and CTR.",
    url: "https://www.trimy.me/blog/05",
    siteName: "Trimify - The Ultimate and Free URL Shortener",
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
    title: "Use Cases of URL Shorteners | Trimify",
    description:
      "Discover real-world use cases of URL shorteners across marketing, social media, and analytics. See how Trimify enhances link management and CTR.",
    images: ["/og-image.png"],
  },
};
const page = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Use Cases of URL Shorteners",
    "description": "Discover real-world use cases of URL shorteners across marketing, social media, and analytics. See how Trimify enhances link management and CTR.",
    "datePublished": "2025-08-01",
    "dateModified": "2025-08-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.trimy.me/blog/05"
    },
    "author": {
      "@type": "Person",
      "name": "DevZain"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Trimify",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.trimy.me/og-image.png"
      }
    },
    "image": "https://www.trimy.me/og-image.png"
  };

  return (
    <>
      <Script
        id="blog-schema-05"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-bold text-gray-600">
          <Link href="/" className="hover:text-black transition-colors">← Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-black transition-colors">← All Blog Posts</Link>
        </nav>
      </div>
      <div className='min-h-[80.8vh] w-full flex justify-center '>
        <h2 className='bg-gray-100 text-2xl bree-bold max-h-fit mt-60 p-4 rounded-lg'>Publishing Soon...</h2>
      </div>
    </>
  );
};

export default page
