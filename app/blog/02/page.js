import React from "react";
import Image from "next/image";
import Link from "next/link";
import FeedbackSection from "@/app/components/FeedbackSection";
export const metadata = {
title: "How to Use URL Shorteners: A Complete Guide | Trimify-Blog",
description: "Learn how to use URL shorteners to create clean, shareable links. Step-by-step guide on shortening, customizing, and tracking URLs using popular tools like Trimify.",
keywords: [
  "URL shortener guide",
  "how to shorten URLs",
  "custom short links",
  "track URL clicks",
  "Trimify URL shortener",
  "URL shortening tutorial",
  "shorten URLs online",
  "free URL shortener",
],

  icons: {
    icon: "/favicon.ico", // favicon
  },
  metadataBase: new URL("https://www.trimy.me"), // Replace with your domain later
  alternates: {
    canonical: "https://www.trimy.me/blog/02",
  },
  openGraph: {
    title: "How to Use URL Shorteners: A Complete Guide | Trimify-Blog",
description: "Learn how to use URL shorteners to create clean, shareable links. Step-by-step guide on shortening, customizing, and tracking URLs using popular tools like Trimify.",

    url: "https://www.trimy.me/blog/02",
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
    title: "Free vs Premium URL Shorteners | Trimify-Blog",
    description:
      "Explore the differences between free and premium URL shorteners. Learn which features matter and why Trimify offers the best value with premium features at no cost.",
    images: ["/og-image.png"],
  },
};
const page = () => {
  return (
    <>
      <div className="md:flex md:justify-end md:m-8   md:float-right gap-4">
        <article className="article  md:w-[60%] flex flex-col gap-6 bg-gray-50 p-4 mt-8 md:mt-0 roboto-semi">
          <h1 className="text-4xl font-bold bree-bold text-center">
            How to Use URL Shorteners ?
          </h1>
          <Image
            src="/HTUUS.png"
            width={600}
            height={650}
            className="mx-auto"
            alt="How to use short links"
          />
          <p className="roboto-semi text-lg">
            In this article we will guide you how to use top 5 best URL
            shorteners of 2025.By this guide you can enjoy every feature of
            these URL shorteners.
          </p>

          <h2 className="text-2xl roboto-bold underline">
            TRIMIFY Usage Guide.
          </h2>
          <Image
            src="/og-image.png"
            width={500}
            height={100}
            className="mx-auto w-[400px] h-[200px]"
            alt="Trimify"
          />

          <p className="roboto-semi text-lg">
            Trimify makes it easy to shorten your URLs in just a few steps.
            Whether you want a quick link or a customized short URL, getting
            started is simple and fast.
          </p>
          <h2 className="text-xl roboto-bold">1. Generate a short URL</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Visit the Generator Page: Go to the{" "}
              <Link
                href="/generate-shortUrl"
                className="text-blue-600 underline"
                title="Click to generate short URLs"
                aria-label="Click to generate short URLs"
              >
                Trimify Generator
              </Link>{" "}
              to create your first short URL.
            </li>
            <li>
              Paste Your Long URL: Enter your long link into the input box.
            </li>
            <li>
              Click “Generate Now”: Instantly receive a short, shareable and
              random URL.
            </li>
            <li>
              Start Sharing: Copy your new link and share it anywhere—social
              media, email, or messaging apps.
            </li>
          </ul>

          <h2 className="text-xl roboto-bold">
            2. Want to generate a custom Short URL or track your Short URLs
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Create an account on TRIMIFY very easy it also allows you to sign
              in with google
            </li>
            <li>
              After an instant account creation you will be redirected to your
              dashboard from where you can create custom URLs and track them
              easily
            </li>
          </ul>
          <h2 className="text-xl roboto-bold">
            3. Want to count clicks/redirect on your random Short URL
          </h2>
          <li>
            Very Easy. Go to the TRIMIFY{" "}
            <Link
              href={"/count-clicks"}
              className="text-blue-600 underline"
              title="Click to generate short URLs"
              aria-label="Click to generate short URLs"
            >
              Counter Page
            </Link>
            .
          </li>
          <li>Paste your Short URL or its custom name.</li>
          <li>
            Click on Count now button and the result will be displayed to you
          </li>
          <p className="text-xl font-bold">
            That’s it! TRIMIFY takes care of the rest, offering speed,
            simplicity, and control—all in one place.
          </p>
          {/* Main Title */}
          <div>
            <h1 className="text-2xl roboto-bold mb-6 underline">
              Bitly Usage Guide.
            </h1>
            <Image
              src="/bitly.png"
              width={500}
              height={100}
              className="mx-auto w-[400px] h-[200px]"
              alt="bitly "
            />
            {/* Section 1: Create Bitly Account */}
            <div className="mt-2">
              <h2 className="text-xl font-semibold mb-2">
                1. Create a Bitly Account
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Go to https://bitly.com</li>
                <li>
                  Click <strong>Sign Up</strong> in the top right.
                </li>
                <li>Choose a plan (Free or Paid).</li>
                <li>Sign up using Email, Google, or Apple account.</li>
                <li>Verify your email to access the Bitly dashboard.</li>
              </ul>
            </div>

            {/* Section 2: How to Shorten a URL */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                2. How to Shorten a URL
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Log in to your Bitly account.</li>
                <li>
                  Click the <strong>Create</strong> button at the top right.
                </li>
                <li>Paste your long URL into the field.</li>
                <li>
                  Click <strong>Create</strong> to generate the short link.
                </li>
                <li>
                  Use the <strong>Copy</strong> button to get the shortened
                  link.
                </li>
              </ul>
            </div>

            {/* Section 3: Customize Short URL */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                3. Customize Your Short URL
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  After creating the short link, click the <strong>Edit</strong>{" "}
                  icon.
                </li>
                <li>
                  Change the back-half (e.g., <code>bit.ly/my-launch</code>).
                </li>
                <li>
                  Click <strong>Save</strong>. (Customization may require a paid
                  plan.)
                </li>
              </ul>
            </div>

            {/* Section 4: Track Link Analytics */}
            <div>
              <h2 className="text-xl font-semibold mb-2">
                4. Track Link Analytics
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Go to your Bitly dashboard and select a link.</li>
                <li>
                  View stats: Total Clicks, Referrers, Countries, Devices, etc.
                </li>
                <li>Use these insights to evaluate your link’s performance.</li>
              </ul>
            </div>
          </div>
          <h1 className="text-2xl roboto-bold underline">
            TinyURL Usage Guide.
          </h1>
          <Image
            src="/tinyURL.png"
            width={500}
            height={100}
            className="mx-auto w-[400px] h-[200px]"
            alt="tinyURL"
          />
          <p className="roboto-semi text-lg">
            The working of tinyURL is very simple you have to follow only the
            few steps:
          </p>
          <h2 className="text-xl font-semibold ">1. Create a Short URL</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Go to the main page of tinyURL.</li>
            <li>Paste the long URL in the given field.</li>
            <li>
              After that select the domain default tinyurl.com and changing this
              requires you to buy a premium package of tinyURL but short url
              with custom name or alias is also good.
            </li>
            <li>
              Finally write the custom name in the last given input field and
              click on shorten URL button.
            </li>
          </ul>
          <h2 className="text-xl font-semibold mt-4 ">
            2. Want to track short URLs
          </h2>
          <ul className="list-disc pl-5 space-y-1 ">
            <li>
              If you want to track short urls created through tinyURL then you
              have to create a new account on tinyURL
            </li>
            <li>
              For this you have to click on the Sign up button top right corner.
            </li>
            <li>
              After that you should sign in through google or with your
              credentials
            </li>
            <li>
              Then you will be given a new dashboard through which you can
              manage your all short urls or custom domain.
            </li>
          </ul>
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
              alt="Why to Use Short Links ?"
              src={"/WTUSL.png"}
              width={150}
              height={150}
            ></Image>
            <div className="flex flex-col">
              <h2 className="roboto-bold roboto-semibold hover:text-purple-400 transition-all ease-in-out duration-300 underline">
                <Link href="/blog/03">Why to Use Short Links ?</Link>
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
              alt="Use Cases of URL Shorteners"
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
      <FeedbackSection pageNo={2} />
    </>
  );
};

export default page;
