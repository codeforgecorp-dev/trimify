import Login from "../components/login"
import Script from "next/script"
export const metadata = {
  title: "Login to Trimify - Free URL Shortener with Advanced Analytics and Password Protection ",
  description: "Log in to your Trimify account to access your dashboard and to create custom short links.If you have not created your account till now then first go and create your account.",
  keywords: [
    "login URL shortener",
    "twitter login",
    "access Trimify account",
    "user login short link",
    "sign in URL shortener",
    "Trimify login page"
  ],
  alternates: {
    canonical: "https://trimify.xyz/login"
  },
  openGraph: {
    title: "Login to Trimify - Free URL Shortener with Advanced Analytics and Password Protection ",
    description:
      "Log in to your Trimify account to access your dashboard and to create custom short links.If you have not created your account till now then first go and create your account.",
    url: "https://trimify.xyz/login",
    siteName: "Trimify - The Ultimate URL Shortener ",
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
    title: "Login to Trimify - Free URL Shortener with Advanced Analytics and Password Protection ",
    description: "Log in to your Trimify account to access your dashboard and to create custom short links.If you have not created your account till now then first go and create your account.",
    images: ["/og-image.png"],
  },
}
const getLoginStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Login to Trimify - Free URL Shortener with Advanced Analytics and Password Protection ",
  description:
    "Log in to your Trimify account to access your dashboard and create custom short links. If you have not created your account yet, please sign up first.",
  url: "https://trimify.xyz/login",
  publisher: {
    "@type": "Organization",
    name: "Trimify",
    url: "https://trimify.xyz",
  },
  inLanguage: "en",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://trimify.xyz/login",
  },
  potentialAction: {
    "@type": "LoginAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://trimify.xyz/login",
    },
    name: "Log in to Trimify",
  },
});
const page = () => {
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getLoginStructuredData()),
        }}
      />

      <Login />
    </>

  )
}

export default page
