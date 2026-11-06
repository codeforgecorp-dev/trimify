"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { KeyRound, ShieldCheck, Mail, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

const ResetPassword = () => {
  const [cooldown, setCooldown] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [userEmail, setuserEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [showError, setShowError] = useState(false);
  const [emailError, setemailError] = useState("");
  const [showSuccess, setshowSuccess] = useState(false);
  const [OTPError, setOTPError] = useState("");
  const [emailBox, setemailBox] = useState(true);
  const [loading, setloading] = useState(false);
  const [otpVerificationBox, setotpVerificationBox] = useState(false);
  const [userOTP, setuserOTP] = useState("");
  const [showOTPError, setShowOTPError] = useState(false);
  const [passChangeBox, setpassChangeBox] = useState(false);
  const [newPass, setnewPass] = useState("");
  const [confirmPass, setconfirmPass] = useState("");
  const [showPassError, setshowPassError] = useState(false);
  const [passMsg, setpassMsg] = useState("");
  const [showSuccessBox, setshowSuccessBox] = useState(false);
  const [emailBtnDisabled, setemailBtnDisabled] = useState(false);
  const [otpBtnDisabled, setotpBtnDisabled] = useState(false);
  const [passBtnDisabled, setpassBtnDisabled] = useState(false);

  async function handleGenerateOTP() {
    if (!userEmail.trim()) {
      setShowError(true);
      setemailError("Please input your account email");
      return;
    }

    setShowError(false);
    setemailError("");
    setshowSuccess(false);
    setOTPError("");
    setShowOTPError(false);

    try {
      setloading(true);
      setemailBtnDisabled(true);

      const res = await fetch("/api/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Emailid: userEmail.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setemailBox(false);
        setotpVerificationBox(true);
        setCooldown(60);
        setDisabled(true);
        setuserName(data.username);
      } else {
        setemailBtnDisabled(false);
        setShowError(true);
        setemailError(data.msg || "Could not locate this email");
      }
    } catch {
      setShowError(true);
      setemailBtnDisabled(false);
      setemailError("Network error. Please try again.");
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    if (cooldown <= 0) return;
    const timeout = setTimeout(() => setCooldown(cooldown - 1), 1000);
    return () => clearTimeout(timeout);
  }, [cooldown]);

  async function handleOTPVerification() {
    if (userOTP.trim().length !== 6) {
      setShowOTPError(true);
      setOTPError("OTP must be exactly 6 digits");
      setshowSuccess(false);
      return;
    }

    setShowOTPError(false);
    setOTPError("");
    setshowSuccess(false);

    try {
      setloading(true);
      setotpBtnDisabled(true);
      const verifyOTP = await fetch("/api/forget-password?validation=true", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Emailid: userEmail.trim(), OTP: userOTP.trim() }),
      });
      const response = await verifyOTP.json();

      if (response.success) {
        setotpVerificationBox(false);
        setpassChangeBox(true);
        setshowSuccess(true);
        setShowOTPError(false);
        setOTPError("");
        setCooldown(0);
        setDisabled(false);
        setuserOTP("");
      } else {
        setShowOTPError(true);
        setOTPError(response.msg || "Invalid OTP code");
        setshowSuccess(false);
        setotpBtnDisabled(false);
      }
    } catch {
      setShowOTPError(true);
      setotpBtnDisabled(false);
      setOTPError("Verification failed");
      setshowSuccess(false);
    } finally {
      setloading(false);
    }
  }

  function validatePassword(password) {
    if (password.includes(" ")) {
      return "Password cannot contain spaces";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must include at least one number";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must include at least one special symbol";
    }
    return null;
  }

  async function handlepassChange() {
    setshowPassError(false);
    if (newPass !== confirmPass) {
      setshowPassError(true);
      setpassMsg("Both passwords must match");
      return;
    }

    const error = validatePassword(newPass);
    if (error) {
      setshowPassError(true);
      setpassMsg(error);
      return;
    }

    try {
      setloading(true);
      setpassBtnDisabled(true);
      let changePass = await fetch("/api/forget-password?changePass=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Emailid: userEmail.trim(), newpass: newPass }),
      });
      let response = await changePass.json();
      if (response.success) {
        setpassChangeBox(false);
        setshowSuccessBox(true);
        setuserEmail("");
        setShowError(false);
        setuserOTP("");
        setDisabled(false);
      } else {
        setshowPassError(true);
        setpassMsg(response.msg || "Error resetting password");
        setpassBtnDisabled(false);
      }
    } catch {
      setshowPassError(true);
      setpassBtnDisabled(false);
      setpassMsg("Try again later");
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-142px)] w-full bg-halftone-warm flex justify-center items-center p-4 sm:p-6 select-none">
      {/* STEP 1: Email Box */}
      {emailBox && (
        <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black/20">
            <span className="px-3 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
              STEP 1 OF 3
            </span>
            <span className="text-xs font-black text-black/50 uppercase">RECOVERY</span>
          </div>

          <div className="text-center">
            <h1 className="font-bungee text-2xl sm:text-3xl text-black leading-tight drop-shadow-[2px_2px_0px_#FACC15]">
              RECOVER ACCOUNT
            </h1>
            <p className="font-space text-xs sm:text-sm font-bold text-black/70 mt-1">
              Enter your registered email and we'll send a 6-digit security code.
            </p>
          </div>

          <div className="space-y-1">
            <label className="block font-bungee text-xs text-black uppercase mb-1">
              Account Email:
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setuserEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerateOTP()}
              className="w-full p-3 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
              placeholder="alex@example.com"
            />
          </div>

          {showError && (
            <div className="p-3 bg-[#FEE2E2] border-2 border-[#DC2626] text-[#DC2626] font-bold text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{emailError}</span>
            </div>
          )}

          <button
            disabled={emailBtnDisabled || loading}
            className="w-full brutal-btn brutal-btn-yellow py-3.5 font-bungee text-sm sm:text-base tracking-wider disabled:opacity-50 cursor-pointer"
            onClick={handleGenerateOTP}
          >
            {loading ? "SENDING OTP..." : "SEND VERIFICATION CODE ⚡"}
          </button>

          <div className="text-center pt-2 font-space text-xs font-bold text-black/70">
            Remembered your password?{" "}
            <Link href="/login" className="font-bungee text-[#EF4444] underline hover:text-black ml-1">
              BACK TO LOGIN
            </Link>
          </div>
        </div>
      )}

      {/* STEP 2: OTP Verification */}
      {otpVerificationBox && (
        <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black/20">
            <span className="px-3 py-1 bg-[#EF4444] text-white font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
              STEP 2 OF 3
            </span>
            <span className="text-xs font-black text-black/50 uppercase">VERIFY CODE</span>
          </div>

          <div className="text-center">
            <h1 className="font-bungee text-2xl sm:text-3xl text-black leading-tight drop-shadow-[2px_2px_0px_#EF4444]">
              CHECK YOUR INBOX
            </h1>
            <p className="font-space text-xs sm:text-sm font-bold text-black/70 mt-1">
              We dispatched a 6-digit code to <strong className="text-black">{userEmail}</strong>.
            </p>
          </div>

          {userName && (
            <div className="p-3 bg-[#FEF3C7] border-2 border-black text-xs font-bold flex items-center justify-between">
              <span>Account Username:</span>
              <span className="font-bungee text-sm text-black">@{userName}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="block font-bungee text-xs text-black uppercase mb-1">
              6-Digit OTP Code:
            </label>
            <input
              type="text"
              maxLength={6}
              value={userOTP}
              onChange={(e) => setuserOTP(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleOTPVerification()}
              className="w-full p-3 bg-[#FFFDF0] border-2 border-black font-bungee text-center tracking-widest text-xl text-black focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
              placeholder="123456"
            />
          </div>

          <div className="text-right text-xs font-bold">
            {cooldown > 0 ? (
              <span className="text-black/60 font-bungee">RESEND IN {cooldown}S</span>
            ) : (
              <button
                type="button"
                onClick={handleGenerateOTP}
                disabled={emailBtnDisabled || loading}
                className="font-bungee text-[#EF4444] underline hover:text-black cursor-pointer"
              >
                RESEND OTP CODE
              </button>
            )}
          </div>

          {showOTPError && (
            <div className="p-3 bg-[#FEE2E2] border-2 border-[#DC2626] text-[#DC2626] font-bold text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{OTPError}</span>
            </div>
          )}

          <button
            disabled={otpBtnDisabled || loading}
            className="w-full brutal-btn brutal-btn-yellow py-3.5 font-bungee text-sm sm:text-base tracking-wider disabled:opacity-50 cursor-pointer"
            onClick={handleOTPVerification}
          >
            {loading ? "VERIFYING..." : "VERIFY CODE & CONTINUE ⚡"}
          </button>
        </div>
      )}

      {/* STEP 3: Change Password */}
      {passChangeBox && (
        <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black/20">
            <span className="px-3 py-1 bg-[#F97316] text-white font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
              STEP 3 OF 3
            </span>
            <span className="text-xs font-black text-black/50 uppercase">NEW PASSWORD</span>
          </div>

          <div className="text-center">
            <h1 className="font-bungee text-2xl sm:text-3xl text-black leading-tight drop-shadow-[2px_2px_0px_#F97316]">
              SET NEW PASSWORD
            </h1>
            <p className="font-space text-xs sm:text-sm font-bold text-black/70 mt-1">
              Choose a strong password with at least 8 characters and symbols.
            </p>
          </div>

          <div className="space-y-3 font-space">
            <div>
              <label className="block font-bungee text-xs text-black uppercase mb-1">
                New Password:
              </label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setnewPass(e.target.value)}
                className="w-full p-3 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
                placeholder="New password"
              />
            </div>

            <div>
              <label className="block font-bungee text-xs text-black uppercase mb-1">
                Confirm Password:
              </label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setconfirmPass(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlepassChange()}
                className="w-full p-3 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
                placeholder="Confirm password"
              />
            </div>
          </div>

          {showPassError && (
            <div className="p-3 bg-[#FEE2E2] border-2 border-[#DC2626] text-[#DC2626] font-bold text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{passMsg}</span>
            </div>
          )}

          <button
            disabled={passBtnDisabled || loading}
            className="w-full brutal-btn brutal-btn-yellow py-3.5 font-bungee text-sm sm:text-base tracking-wider disabled:opacity-50 cursor-pointer"
            onClick={handlepassChange}
          >
            {loading ? "CHANGING..." : "UPDATE PASSWORD 🔒"}
          </button>
        </div>
      )}

      {/* STEP 4: Success */}
      {showSuccessBox && (
        <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-10 flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 bg-[#22C55E] border-3 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-black stroke-[3]" />
          </div>

          <div>
            <h1 className="font-bungee text-2xl sm:text-3xl text-black leading-tight drop-shadow-[2px_2px_0px_#FACC15]">
              PASSWORD CHANGED!
            </h1>
            <p className="font-space text-xs sm:text-sm font-bold text-black/75 mt-2">
              Your credentials have been securely updated. You can now log into your Trimify dashboard.
            </p>
          </div>

          <Link
            href="/login"
            className="w-full brutal-btn brutal-btn-yellow py-3.5 font-bungee text-sm sm:text-base tracking-wider inline-flex items-center justify-center gap-2"
          >
            <span>PROCEED TO LOGIN</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
