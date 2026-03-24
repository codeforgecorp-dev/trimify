import React from 'react'
import Signup from "../components/Signup"
export const metadata = {
  title: "Sign up to Trimify - Gain access of building UTM, Making Links Password Protected.",
  description: "Create your Trimify account to shorten and manage links with analytics.Also get a seperate dashboard for url management.Create password protected links add utm tracking to links",
  keywords: [
    "sign up URL shortener",
    "create account Trimify",
    "free URL shortener",
    "best short link ",
    "qr code"
  ],
  alternates: {
    canonical: "https://trimify.xyz/sign-up-to-trimify"
  },
  openGraph: {
    title: "Sign up to Trimify - Gain access of building UTM, Making Links Password Protected.",
    description:
      "Create your Trimify account to shorten and manage links with analytics.Also get a seperate dashboard for url management.Create password protected links add utm tracking to links",
    url: "https://trimify.xyz/sign-up-to-trimify",
    siteName: "Trimify",
    images: [
      {
        url: "/og-image.png", // Recommended: 1200x630 og-image instead of favicon
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
    title: "Sign up to Trimify - Gain access of building UTM, Making Links Password Protected.",
    description: "Create your Trimify account to shorten and manage links with analytics.Also get a seperate dashboard for url management.Create password protected links add utm tracking to links.",
    images: ["/og-image.png"],
  },
};
const page = () => {
  const getSignUpStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sign up to Trimify - The Ultimate URL Shortener",
    description:
      "Create your Trimify account to shorten and manage links with analytics. Also get a separate dashboard for URL management.",
    url: "https://trimify.xyz/sign-up-to-trimify",
    publisher: {
      "@type": "Organization",
      name: "Trimify",
      url: "https://trimify.xyz",
    },
    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://trimify.xyz/sign-up-to-trimify",
    },
    potentialAction: {
      "@type": "RegisterAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://trimify.xyz/sign-up-to-trimify",
      },
      name: "Create Trimify Account",
    },
  });
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSignUpStructuredData()),
        }}
      />

      <div>
        <Signup />
      </div>
    </>
  )
}

export default page
