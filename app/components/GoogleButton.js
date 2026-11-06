"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function GoogleLoginButton({ width = 300 }) {
  return (
    <button
      id="google-signin-button"
      type="button"
      onClick={() => signIn("google")}
      style={{ maxWidth: width }}
      className="w-full mx-auto brutal-btn bg-white hover:bg-[#FFFDF0] text-black py-3 px-4 font-bungee text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2.5 cursor-pointer shadow-[3px_3px_0px_#000] hover:shadow-[5px_5px_0px_#000] transition-all"
    >
      <Image src="/google.svg" alt="Google" width={20} height={20} className="shrink-0" />
      <span>CONTINUE WITH GOOGLE</span>
    </button>
  );
}
