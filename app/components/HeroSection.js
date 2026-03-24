// Import necessary modules and components
"use client"; // Indicates this is a client-side component
import React from "react"; // Import React for JSX
import { useState } from "react"; // Import useState hook for state management
import Image from "next/image"; // Import Image component from Next.js for optimized images
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast for notifications
import { FeatureCards, FAQSection } from './TrimifyInterface';
import { PricingSection } from "./PricingSection";
// Import FeatureCards and FAQSection components
import { nanoid } from "nanoid";
import Link from "next/link";

export default function HeroSection() {
  // State variables for managing input fields, messages, and loading state
  const [LongUrl, setLongUrl] = useState(""); // State for the long URL input
  const [Msg, setMsg] = useState(""); // State for the generated short URL message
  const [On, setOn] = useState(false); // State to toggle the display of the short URL
  const [loading, setloading] = useState(false); // State to manage the loading spinner
  const [toggler, settoggler] = useState(false);
  const [activeTab, setactiveTab] = useState("Shortener");
  const [ShortName, setShortName] = useState(""); // State for the short URL input

  // Function to handle URL generation
  async function GenerateUrl() {
    if (!LongUrl.trim()) {
      toast.warn("Please enter the long url", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    let formattedUrl = LongUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = "https://" + formattedUrl;
    }

    // Strict URL Validation
    if (!isValidURL(formattedUrl)) {
      toast.error("Invalid URL", { position: "top-right", autoClose: 1000 });
      return;
    }

    setloading(true);

    try {
      let Time = Date.now();
      let time = new Date(Time).toLocaleTimeString();
      let date = new Date(Time).toLocaleDateString();

      const response = await fetch(`/api/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          LongUrl: formattedUrl,
          ShortName: nanoid(4),
          time: time,
          date: date,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.warn(result.error || "Something went wrong", {
          position: "top-right",
          autoClose: 1000,
        });
        setMsg("");
        setOn(false);
        return;
      }

      toast.success("The shorturl has been generated successfully", {
        position: "top-right",
        autoClose: 1000,
      });

      setOn(false);
      setMsg("");

      setTimeout(() => {
        setMsg(result.fullShortUrl);
        setOn(true);
      }, 0);

      setLongUrl("");
    } catch (err) {
      toast.error("Server error Try again later", {
        position: "top-right",
        autoClose: 1000,
      });
      console.error(err);
      setMsg("");
    } finally {
      setloading(false);
    }
  }

  // Validation Function:
  function isValidURL(userURL) {
    try {
      const url = new URL(userURL);
      return url.hostname.includes(".");
    } catch {
      return false;
    }
  }
  // Toggle Section:
  function toggleSection(key) {
    if (key === "Shortener") {
      settoggler(false);
      setactiveTab("Shortener");
      console.log(activeTab);
      setMsg(""); // Clear the message when switching to Shortener
      setOn(false); // Reset On state when switching to Shortener
    } else {
      settoggler(true);
      setactiveTab(key);
      setOn(false);
      setMsg(""); // Clear the message when switching to Counter
    }
  }
  // Function to handle URL generation
  const handleCount = async () => {
    if (ShortName.length === 0) {
      toast.warn("Please enter the short Name", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }
    setloading(true); // Set loading state to true
    console.log(ShortName)
    let a = await fetch("api/count-clicks", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify({
        ShortName: ShortName, // Short URL input
      }),
    });
    const clicks = await a.json();
    console.log(clicks)
    if (clicks.error) {
      setloading(false); // Set loading state to false
      toast.error(clicks.error, {
        position: "top-right",

        autoClose: 1000,
      });
    } else {
      setloading(false); // Set loading state to false
      setOn(true); // Set On to true to display the short URL
      console.log("Clicks", clicks.totalClicks)
      setMsg(clicks.totalClicks); // Set the message from the response
    }
  };
const FeatureItem = ({ icon, text }) => (
  <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
    <span className="text-xl">{icon}</span>
    <span className="text-sm text-purple-100">{text}</span>
  </div>
);

  return (
    <>




      <div className="App min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <ToastContainer className={"pt-12"} />

        {/* ===================================================== */}
        {/* HERO SECTION - YOUR EXISTING CODE (Keep as is) */}
        {/* ===================================================== */}
        <section className="bg-gradient-to-b from-purple-300 to-gray-900 flex flex-col items-center py-12 min-h-[60vh] w-full gap-4 p-2 md:p-8">
          <h1 className="poppins-bold text-gray-600 text-4xl md:text-6xl text-center leading-tight mx-2">
            Trimify - Trim Your Links, Boost Your Brand!
          </h1>

          <h2 className="inter-bold text-xl md:text-2xl text-gray-800 text-center">
            Free URL Shortener with Advance features
          </h2>

       {/* ================= INPUT CONTAINER ================= */}
<div className="w-full mt-6 bg-white/80 backdrop-blur-md border border-white/40 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] p-4 md:p-6 transition-all duration-300">

  {/* ================= TABS ================= */}
  <div className="flex w-full overflow-hidden rounded-xl mb-4">
    <button
      onClick={() => toggleSection("Shortener")}
      className={`w-1/2 py-3 md:py-4 text-lg md:text-xl font-semibold transition-all duration-300 cursor-pointer
        ${activeTab === "Shortener"
          ? "bg-slate-800 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
    >
      Shortener
    </button>

    <button
      onClick={() => toggleSection("Counter")}
      className={`w-1/2 py-3 md:py-4 text-lg md:text-xl font-semibold transition-all duration-300 cursor-pointer
        ${activeTab === "Counter"
          ? "bg-slate-800 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
    >
      Counter
    </button>
  </div>

  {/* ================= INPUT ROW ================= */}
  {activeTab === "Shortener" && (
    <div className="flex flex-col md:flex-row items-stretch gap-3">
      <input
        type="url"
        autoFocus
        autoComplete="on"
        value={LongUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Paste your long URL here..."
        className="flex-1 px-4 py-4 rounded-xl border border-gray-300 text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-purple-400/40
                   transition-all duration-200"
      />

      <button
        onClick={GenerateUrl}
        disabled={loading}
        className="px-6 py-4 rounded-xl text-white font-semibold cursor-pointer
                   bg-gradient-to-r from-purple-500 to-indigo-500
                   hover:from-purple-400 hover:to-indigo-400
                   shadow-lg hover:shadow-purple-400/40
                   transition-all duration-300
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Short Now
      </button>
    </div>
  )}

  {activeTab === "Counter" && (
    <div className="flex flex-col md:flex-row items-stretch gap-3">
      <input
        autoFocus
        type="text"
        value={ShortName}
        onChange={(e) => setShortName(e.target.value)}
        placeholder="Paste short name or short URL..."
        className="flex-1 px-4 py-4 rounded-xl border border-gray-300 text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-purple-400/40
                   transition-all duration-200"
      />

      <button
        onClick={handleCount}
        disabled={loading}
        className="px-6 py-4 rounded-xl text-white font-semibold cursor-pointer
                   bg-gradient-to-r from-purple-500 to-indigo-500
                   hover:from-purple-400 hover:to-indigo-400
                   shadow-lg hover:shadow-purple-400/40
                   transition-all duration-300
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Count Now
      </button>
    </div>
  )}

  {/* ================= RESULT ================= */}
  {On && (
  <div className="mt-6 bg-gray-100 rounded-2xl p-5 animate-slideDown shadow-md md:flex justify-around">

    {/* ================= RESULT ================= */}
    <div>
    <h2 className="font-semibold text-lg mb-3 text-gray-800">
      {toggler ? "Total Clicks" : "Your Short Link"}
    </h2>

    <div className="flex items-center gap-2 mb-4">
      <Image src="/link.png" width={32} height={32} alt="link" />
      {toggler ? (
        <span className="text-xl font-bold text-gray-900">{Msg}</span>
      ) : (
        <a
          href={Msg}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all font-medium"
        >
          {Msg}
        </a>
      )}
    </div>

    {!toggler && (
      <button
        onClick={() => {
          navigator.clipboard.writeText(Msg);
          toast.success("Copied to clipboard");
        }}
        className="mb-5 text-sm bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer "
      >
        Copy Link
      </button>
    )}
</div>
    {/* ================= PREMIUM CARD ================= */}
    <div className="rounded-2xl p-5 bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-xl ">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-base md:text-lg">
          🚀 Trimify Premium
        </h3>
        <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
          PRO
        </span>
      </div>

      {/* FEATURES */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 ">

        {/* Column 1 */}
        <div className="flex-1 space-y-3">
          <FeatureItem icon="🔒" text="Password-protected links" />
          <FeatureItem icon="⏱️" text="Link expiry & click limits" />
          <FeatureItem icon="🎯" text="UTM & campaign tracking" />
        </div>

        {/* Column 2 */}
        <div className="flex-1 space-y-3">
          <FeatureItem icon="✏️" text="Custom branded short URLs" />
          <FeatureItem icon="📊" text="Real-time analytics dashboard" />
          <FeatureItem icon="📱" text="Custom QR code styling" />
        </div>

      </div>

      {/* CTA */}
      <button
        className="mt-5 w-full md:w-auto bg-white text-purple-700 px-6 py-2 rounded-lg
                   font-semibold text-sm hover:bg-purple-100 transition cursor-pointer"
      >
        <Link href="/pricing">Upgrade to Premium</Link>
       
      </button>
    </div>
  </div>
)}


</div>
</section>
        {/* ===================================================== */}
      
        {/* Modern Animated Feature Cards */}
        <FeatureCards />
          {/* PRICING SECTION */}
        <PricingSection />
        {/* ===================================================== */}
        {/* FAQ Section with Accordion */}
        <FAQSection />

        {/* Professional Footer */}

      </div></>
  );
};





