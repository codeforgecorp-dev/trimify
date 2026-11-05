"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { BarChart2, Flame, ArrowRight, Zap } from "lucide-react";

const Counter = () => {
  const [loading, setloading] = useState(false);
  const [shortName, setshortName] = useState("");
  const [On, setOn] = useState(false);
  const [Msg, setMsg] = useState("");

  const handleCount = async () => {
    if (!shortName.trim()) {
      toast.warn("Please enter the short name or alias", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    setloading(true);
    try {
      let a = await fetch("api/count-clicks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shortName: shortName.trim(),
        }),
      });
      const clicks = await a.json();
      if (clicks.error) {
        setloading(false);
        toast.error(clicks.error, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        setloading(false);
        setOn(true);
        setMsg(clicks.totalClicks);
      }
    } catch {
      setloading(false);
      toast.error("Error retrieving click data", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer className="pt-16" />
      <div className="relative w-full min-h-[calc(100vh-142px)] bg-halftone-warm flex justify-center items-center p-4 sm:p-6 select-none">
        {/* Main Card */}
        <div className="relative z-10 w-full max-w-xl bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 flex flex-col items-center gap-6">
          {/* Top Tag Sticker */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
            <BarChart2 className="w-4 h-4 stroke-[3]" />
            <span>REAL-TIME COUNTER</span>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="font-bungee text-2xl sm:text-4xl text-black tracking-tight leading-tight">
              TRACK YOUR LINK CLICKS
            </h1>
            <p className="font-space text-xs sm:text-sm font-bold text-black/70 mt-1">
              Enter your short link code or alias below to check total engagements.
            </p>
          </div>

          {/* Input field */}
          <div className="w-full">
            <input
              aria-label="Enter the Short Name or Short URL"
              type="text"
              name="shortName"
              autoComplete="on"
              className="w-full p-4 bg-[#FFFDF0] border-3 border-black font-bold text-black placeholder:text-black/40 text-base focus:bg-white focus:outline-none shadow-[inset_2px_2px_0px_rgba(0,0,0,0.06)]"
              placeholder="e.g. abcd or my-brand"
              onChange={(e) => setshortName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCount()}
              value={shortName}
            />
          </div>

          {/* Submit Button */}
          <button
            title="Count the clicks on the short URL"
            aria-label="Count the clicks on the short URL"
            className="w-full brutal-btn brutal-btn-yellow py-4 font-bungee text-base sm:text-lg tracking-wider"
            onClick={handleCount}
            disabled={loading}
          >
            {loading ? "FETCHING CLICKS..." : "COUNT CLICKS NOW ⚡"}
          </button>

          {/* Loader */}
          {loading && <Loader />}

          {/* Result Display */}
          {On && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full p-5 bg-[#FEF3C7] border-3 border-black shadow-[4px_4px_0px_#000] text-center"
            >
              <span className="text-xs font-black uppercase text-black/70 tracking-wider">
                CURRENT TOTAL
              </span>
              <div className="font-bungee text-4xl sm:text-5xl text-[#EF4444] drop-shadow-[2px_2px_0px_#000] my-1">
                {Msg}
              </div>
              <p className="font-space text-xs sm:text-sm font-bold text-black/80">
                Total clicks recorded on this shortened link!
              </p>
            </motion.div>
          )}

          {/* Upsell Promo Card */}
          <div className="w-full border-3 border-black p-4 sm:p-5 bg-[#FFFBEB] flex flex-col items-center gap-3 text-center shadow-[3px_3px_0px_#000]">
            <span className="font-bungee text-sm sm:text-base text-black flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-[#EF4444] text-[#EF4444]" />
              NEED DEEP GEO & DEVICE ANALYTICS?
            </span>
            <p className="font-space text-xs font-bold text-black/70">
              Create an account for full visitor breakdown, country flags, browser stats, and custom slugs.
            </p>
            <Link
              href="/sign-up-to-trimify"
              className="w-full brutal-btn brutal-btn-red py-2.5 font-bungee text-xs sm:text-sm tracking-wider inline-flex items-center justify-center gap-1.5"
            >
              <span>CLAIM FREE DASHBOARD</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Counter;
