"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Script from "next/script";
import { usePathname } from "next/navigation";
import CookieConsent from "./CookieConsent";
export default function SessionWrapper({ children }) {
  const currentPath = usePathname();

  const hideLayout =
    currentPath.startsWith("/user") ||
    currentPath.startsWith("/analytics") ||
    currentPath.includes("/user/"); // dashboard routes

  return (
    <SessionProvider>
      {!hideLayout && <Navbar />}

      {children}
      <CookieConsent />
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />

      {!hideLayout && <Footer />}
    </SessionProvider>
  );
}
