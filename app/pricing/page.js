import Pricing from "../components/Pricing";

export const metadata = {
  title: "Pricing Plans – Free & Lifetime Pro | Trimify",
  description: "Explore Trimify pricing plans. Start for free with unlimited link shortening, or upgrade to Lifetime Pro for advanced analytics and custom aliases.",
  alternates: {
    canonical: "https://www.trimy.me/pricing",
  },
  openGraph: {
    title: "Pricing Plans – Trimify URL Shortener",
    description: "Simple, transparent pricing for creators and businesses. Get lifetime pro access.",
    url: "https://www.trimy.me/pricing",
    siteName: "Trimify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing Plans – Free & Lifetime Pro | Trimify",
    description: "Explore Trimify pricing plans. Start for free with unlimited link shortening, or upgrade to Lifetime Pro for advanced analytics and custom aliases.",
    images: ["/og-image.png"],
  },
};

export default function PricingPage() {
  return <Pricing />;
}
