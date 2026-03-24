
import Pricing from "../components/Pricing";

export const metadata = {
  title: "Trimify Pricing - Access to Premium Features in Low budget",
  description:
    "Compare Trimify plans: Free Basic plan with dashboard access and Premium plan with advanced features like UTM tracking, link expiry, password protection, and analytics.",
  keywords: [
    "Trimify pricing",
    "URL shortener plans",
    "free URL shortener",
    "short link with name",
    "Link Shortener in free",
    "link tracking",
  ],
  alternates: {
    canonical: "https://www.trimify.xyz/pricing",
    languages: {
      "en": "https://www.trimify.xyz/",
      "en-US": "https://www.trimify.xyz/",
      "en-GB": "https://www.trimify.xyz/",
      "x-default": "https://www.trimify.xyz/",
    },
  },
  openGraph: {
    title: "Trimify Pricing - Free & Premium URL Shortener Plans",
    description:
      "Compare Trimify plans: Free Basic plan with dashboard access and Premium plan with advanced features like UTM tracking, link expiry, password protection, and analytics.",
    url: "https://www.trimify.xyz/pricing",
    siteName: "Trimify - The Ultimate URL Shortener",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Trimify logo and pricing plans",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trimify Pricing - Free & Premium URL Shortener Plans",
    description:
      "Compare Trimify plans: Free Basic plan with dashboard access and Premium plan with advanced features like UTM tracking, link expiry, password protection, and analytics.",
    images: ["/og-image.png"],
  },
};

const page = () => {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Trimify URL Shortener",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Trimify is a URL shortener platform offering a free Basic plan and a Premium plan with UTM tracking, link expiry, password protection, and analytics.",
    offers: [
      {
        "@type": "Offer",
        name: "Basic Plan",
        price: "0",
        priceCurrency: "USD",
        url: "https://www.trimify.xyz/pricing"
      },
      {
        "@type": "Offer",
        name: "Premium Plan",
        price: "15",
        priceCurrency: "USD",
        url: "https://www.trimify.xyz/pricing",
        priceValidUntil: "2026-03-31"
      }
    ]

  }; 
  

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Pricing />
    </>
  );
};

export default page;
