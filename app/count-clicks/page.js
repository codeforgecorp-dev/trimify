import Counter from "../components/Counter"
export const metadata = {
  title: "Count Clicks on Short URL – Trimify",
  description: "Track how many times your shortened URL was clicked using Trimify's analytics.",
  keywords: [
    "track URL clicks",
    "link analytics",
    "short URL statistics",
    "click count for short links",
    "monitor link traffic"
  ],
  alternates: {
    canonical: "https://trimify.xyz/count-clicks"
  },
   openGraph: {
   title: "Count Clicks on Short URL – Trimify",
   description:
      "Track how many times your shortened URL was clicked using Trimify's analytics.",
    url: "https://trimify.xyz/count-clicks",
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
    title: "Count Clicks on Short URL – Trimify",
    description: "Track how many times your shortened URL was clicked using Trimify's analytics.",
    images: ["/og-image.png"],
  },
}
const page = () => {
  return (
   <Counter/>
  )
}

export default page
