// components/CookieConsent.js
"use client";
import React, { useState, useEffect } from "react";

const COOKIE_KEY = "trimify_cookie_consent";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [consent, setConsent] = useState(null);

  // Load consent from localStorage or JWT
  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_KEY);
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      setConsent(JSON.parse(savedConsent));
    }
  }, []);

  const handleConsent = (accepted) => {
    const consentData = { accepted, timestamp: new Date().toISOString() };
    localStorage.setItem(COOKIE_KEY, JSON.stringify(consentData));
    setConsent(consentData);
    setShowBanner(false);

    // Optional: send consent data to server for records
    // fetch("/api/consent", { method: "POST", body: JSON.stringify(consentData) })
  };

  if (!showBanner) return null;

  return (
    <div className="fixed md:max-w-[800px] bottom-4 left-4 right-4 md:left-auto md:right-12 md:bottom-12 z-50 bg-white border border-gray-300 shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
      <p className="text-gray-800">
        We use cookies to enhance your experience, provide analytics, and secure your account.
        You can accept or reject non-essential cookies.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => handleConsent(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Accept All
        </button>
        <button
          onClick={() => handleConsent(false)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition cursor-pointer"
        >
          Reject Non-Essential
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
