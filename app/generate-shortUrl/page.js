import Generate from "../components/Generate"
export const metadata = {
  title: "Generate Short URLs for Free - Trimify",
  description: "Paste your long URL and generate a short link instantly using Trimify.",
  keywords: [
    "generate short URL",
    "create short link",
    "URL shortening tool",
    "shorten long URL",
    "free short URL generator",
    "Trim url"
  ],
  alternates: {
    canonical: "https://trimify.xyz/generate-shortUrl"
  },
   openGraph: {
   title: "Generate Short URLs for Free - Trimify",
   description:
      "Paste your long URL and generate a short link instantly using Trimify.",
    url: "https://trimify.xyz/generate-shortUrl",
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
    title: "Generate Short URLs for Free - Trimify",
    description: "Paste your long URL and generate a short link instantly using Trimify.",
    images: ["/og-image.png"],
  },
}
const page = () => {
  return (
    <Generate />
  )
}

export default page

