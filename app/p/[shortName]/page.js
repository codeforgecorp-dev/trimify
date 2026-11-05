"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Loader from "@/app/components/Loader";
import { Lock, KeyRound, AlertTriangle, ArrowRight } from "lucide-react";

const PasswordProtectedPage = () => {
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showError, setshowError] = useState("");
  const [loading, setloading] = useState(false);
  const params = useParams();
  const { shortName } = params;

  async function handleVerification() {
    setshowError("");
    if (password !== confirmPassword) {
      setshowError("Passwords do not match");
      return;
    }
    setloading(true);
    try {
      let req = await fetch(`/api/verifylink?Shortname=${shortName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Password: password }),
      });
      let response = await req.json();
      if (response.error === 404) {
        window.location.href = "/link-expired";
        return;
      }
      if (response.error) {
        setshowError(response.error);
      }
      if (response.success) {
        window.location.href = response.URL2redirect;
        return;
      }
    } catch {
      setshowError("Verification failed. Please try again.");
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-142px)] bg-halftone-warm flex justify-center items-center p-4 select-none">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] text-black w-full max-w-md p-6 sm:p-8 flex flex-col gap-6">
        {/* Top Tag Sticker */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-black/20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
            <Lock className="w-3.5 h-3.5 stroke-[3]" />
            <span>PROTECTED LINK</span>
          </div>
          <span className="font-bungee text-xs text-[#EF4444]">✦ PRIVATE ✦</span>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="font-bungee text-2xl sm:text-3xl text-black leading-tight drop-shadow-[2px_2px_0px_#FACC15]">
            PASSWORD REQUIRED
          </h1>
          <p className="font-space text-xs sm:text-sm font-bold text-black/70 mt-1">
            The link <strong className="text-[#EF4444]">/{shortName}</strong> is encrypted with password protection.
          </p>
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col gap-4 font-space">
          <div>
            <label className="block font-bungee text-xs text-black uppercase mb-1">
              Enter Password:
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-bungee text-xs text-black uppercase mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerification()}
            />
          </div>

          {showError && (
            <div className="p-3 bg-[#FEE2E2] border-2 border-[#DC2626] text-[#DC2626] font-bold text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{showError}</span>
            </div>
          )}

          {loading && <Loader />}

          <button
            className="w-full brutal-btn brutal-btn-yellow py-3.5 font-bungee text-sm sm:text-base tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            onClick={handleVerification}
            disabled={loading}
          >
            <span>UNLOCK & REDIRECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordProtectedPage;
