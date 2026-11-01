import React from "react";
import Image from "next/image";
import Link from "next/link";
import FeedbackSection from "@/app/components/FeedbackSection";
export const metadata = {
  keywords: [
    "why use short links",
    "benefits of URL shortening",
    "advantages of short URLs",
    "short links for marketing",
    "URL shortener benefits",
    "Trimify short links",
    "short URL advantages",
    "URL shortening reasons",
  ],
  title: "Why Use Short Links? Benefits of URL Shortening | Trimify-Blog",
  description:
      "Discover the advantages of using short links for marketing, social media, and better user experience. Learn why URL shortening is essential in today’s digital world.",
  icons: {
    icon: "/favicon.ico", // favicon
  },
  metadataBase: new URL("https://www.trimy.me"), // Replace with your domain later
  alternates: {
    canonical: "https://www.trimy.me/blog/03",
  },
  openGraph: {
    title: "Why Use Short Links? Benefits of URL Shortening | Trimify-Blog",
    description:
      "Discover the advantages of using short links for marketing, social media, and better user experience. Learn why URL shortening is essential in today’s digital world.",
    url: "https://www.trimy.me/blog/03",
    siteName: "Trimify - The Ultimate and Free URL Shortener",
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
    title: "Why Use Short Links? Benefits of URL Shortening | Trimify-Blog",
    description:
      "Discover the advantages of using short links for marketing, social media, and better user experience. Learn why URL shortening is essential in today’s digital world.",
    images: ["/og-image.png"],
  },
};
const page = () => {
  return (
    <>
      <div className="md:flex md:justify-end md:m-8   md:float-right gap-4">
        <article className="article  md:w-[60%] flex flex-col gap-6 bg-gray-50 p-4 mt-8 md:mt-0">
          <h1 className="text-4xl font-bold bree-bold text-center">
            Why to Use Short Links?
          </h1>
          <Image
            src="/WTUSL.png"
            width={600}
            height={600}
            className="mx-auto"
            alt="Why to use short links"
          />

          <h2 className="roboto-bold text-xl">
            We should use short links instead of long links because they offer
            several advantages that improve performance, trust, and usability:
          </h2>

          {/* 1. CTR */}
          <h2 className="roboto-bold underline text-2xl">
            1. Better Click-Through Rates (CTR)
          </h2>
          <p className="roboto-semi">
            Short links can significantly boost your link engagement. Studies
            show that branded short URLs can increase CTR by up to 34% compared
            to traditional URLs. A clean and concise link builds more trust and
            is more likely to be clicked.
          </p>
          <p className="underline roboto-bold">Example:</p>
          <p>
            Instead of:{" "}
            <span className="text-red-600">
              https://example.com/article/2025/june/special-promo-campaign-landing-page?ref=facebook
            </span>
            <br />
            Use:{" "}
            <span className="text-green-600">
              https://trimify.site/offer2025
            </span>
          </p>

          {/* 2. Social Sharing */}
          <h2 className="roboto-bold underline text-2xl">
            2. Perfect for Social Media and Mobile Devices
          </h2>
          <p className="roboto-semi">
            Social platforms have space limits. Short links take up less room
            and look better on small screens. This makes them ideal for mobile
            users and platforms like Twitter, where characters are limited.
          </p>
          <p className="underline roboto-bold">Example:</p>
          <p>
            A short link like{" "}
            <span className="text-green-600">trimify.site/deals</span> is easier
            to share in a tweet than a long campaign URL.
          </p>

          {/* 3. Tracking */}
          <h2 className="roboto-bold underline text-2xl">
            3. Trackable Analytics
          </h2>
          <p className="roboto-semi">
            Short links can track data like click count, location, devices used,
            and referral sources. This helps you analyze and improve your
            marketing performance.
          </p>
          <p className="underline roboto-bold">Example:</p>
          <p>
            With Trimify, you can see how many people clicked{" "}
            <span className="text-green-600">trimify.site/summer-sale</span> and
            from where.
          </p>

          {/* 4. Branding */}
          <h2 className="roboto-bold underline text-2xl">
            4. Enhances Brand Visibility
          </h2>
          <p className="roboto-semi">
            Custom short links reflect your brand, which builds recognition and
            credibility. Instead of promoting a third-party domain, you showcase
            your own.
          </p>
          <p className="underline roboto-bold">Example:</p>
          <p>
            Branded:{" "}
            <span className="text-green-600">go.trimify.site/signup</span>
            <br />
            Generic: <span className="text-red-600">bit.ly/3xy7zQk</span>
          </p>

          {/* 5. Easy to Share and Remember */}
          <h2 className="roboto-bold underline text-2xl">
            5. Easier to Remember and Share
          </h2>
          <p className="roboto-semi">
            Simple links are more memorable and suitable for offline use like
            flyers, posters, or verbal promotions.
          </p>
          <p className="underline roboto-bold">Example:</p>
          <p>
            Say: <span className="text-green-600">trimify.site/top5</span>{" "}
            instead of reading a long complicated link at an event.
          </p>
          <hr className="w-full border-gray-800 border-2" />
          <div className="flex justify-between p-1">
            <p className="font-bold text-2xl">
              So this is all from todays article.
            </p>
            <p className="font-bold text-xl underline">Published by DevZain</p>
          </div>
        </article>
        <div className="related hidden md:flex max-w-[30%] bg-slate-100 p-4 gap-4 flex-col max-h-fit">
          <h2 className="roboto-bold text-2xl">Related Articles:</h2>
          <div className="flex gap-4 bg-white">
            <Image
              alt="Top 5 Best URL Shorteners 2025"
              src={"/T5BUS.png"}
              width={150}
              height={150}
            ></Image>
            <div className="flex flex-col">
              <h2 className="roboto-bold roboto-semibold hover:text-purple-400 transition-all ease-in-out duration-300 underline">
                <Link href="/blog/01">Top 5 Best URL Shorteners 2025</Link>
              </h2>
              <p>The top 5 best url shorteners of 2025 are no 1...</p>
            </div>
          </div>
          <div className="flex gap-4 bg-white">
            <Image
              alt="How to Use URL Shorteners ?"
              src={"/HTUUS.png"}
              width={150}
              height={150}
            ></Image>
            <div className="flex flex-col">
              <h2 className="roboto-bold roboto-semibold hover:text-purple-400 transition-all ease-in-out duration-300 underline">
                <Link href="/blog/02">How to Use URL Shorteners ?</Link>
              </h2>
              <p>To short the url first of all we have to know about...</p>
            </div>
          </div>
          <div className="flex gap-4 bg-white">
            <Image
              alt="Free vs Premium URL Shorteners"
              src={"/FVPUS.png"}
              width={150}
              height={150}
            ></Image>
            <div className="flex flex-col">
              <h2 className="roboto-bold roboto-semibold hover:text-purple-400 transition-all ease-in-out duration-300 underline">
                <Link href="/blog/04">Free vs Premium URL Shorteners</Link>
              </h2>
              <p>Which one is right for you ? Lets try to know about.</p>
            </div>
          </div>
          <div className="flex gap-4 bg-white">
            <Image
              alt="Use Cases of URL Shorteners</Link>
              </h2>"
              src={"/UCOUS.png"}
              width={150}
              height={150}
            ></Image>
            <div className="flex flex-col">
              <h2 className="roboto-bold roboto-semibold hover:text-purple-400 transition-all ease-in-out duration-300 underline">
                <Link href="/blog/05">Use Cases of URL Shorteners</Link>
              </h2>
              <p>
                The URL Shorteners are used by people in many industries such
                as...
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-[2px] bg-gray-500 border-none my-4" />
      {/* User Feedback Section */}
      <FeedbackSection pageNo={3} />
    </>
  );
};

export default page;
