"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { ChevronDown, User, Trash2, LogOut, Link as LinkIcon, Sparkles } from "lucide-react";

const Logout = ({
  username,
  setshowDeleteConfirmation,
  setshowPersonalDetails,
  shortName,
  analyticsPage,
}) => {
  const { data: session } = useSession();
  const [dropDown, setDropDown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("Token");

    if (typeof window !== "undefined" && window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }

    toast.success("Successfully logged out", {
      position: "top-right",
      autoClose: 1000,
    });

    setTimeout(() => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });
    }, 1000);
  };

  return (
    <header className="sticky top-0 z-40 w-full select-none bg-[#FACC15] border-b-4 border-black shadow-[0px_4px_0px_#000]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2.5 h-[64px]">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/brandLogo2.png"
            className="w-9 h-9 border-2 border-black shadow-[2px_2px_0px_#000] rounded-none group-hover:rotate-6 transition-transform"
            width={36}
            height={36}
            alt="logo"
          />
          <span className="font-bungee text-xl sm:text-2xl text-black tracking-wider drop-shadow-[2px_2px_0px_#fff]">
            TRIMIFY
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 bg-black text-[#FACC15] text-[10px] font-black uppercase border border-black rotate-[-2deg]">
            DASHBOARD
          </span>
        </Link>

        {/* User Pill & Dropdown */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            onClick={() => setDropDown(!dropDown)}
          >
            {analyticsPage ? (
              <>
                <LinkIcon className="w-4 h-4 text-[#EF4444] stroke-[3]" />
                <span className="font-bungee text-xs sm:text-sm text-black truncate max-w-[140px]">
                  /{shortName}
                </span>
              </>
            ) : (
              <>
                <div className="w-6 h-6 bg-[#EF4444] text-white border border-black flex items-center justify-center font-bungee text-xs">
                  {username ? username.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="font-bungee text-xs sm:text-sm text-black truncate max-w-[120px]">
                  {username}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-black stroke-[3] transition-transform duration-200 ${
                    dropDown ? "rotate-180" : "rotate-0"
                  }`}
                />
              </>
            )}
          </button>

          {/* Dropdown Menu */}
          {!analyticsPage && dropDown && (
            <ul className="absolute right-0 mt-2 w-52 bg-white border-3 border-black shadow-[5px_5px_0px_#000] p-1.5 flex flex-col gap-1 z-50 animate-slideDown">
              <li>
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 font-space text-xs sm:text-sm font-bold text-black hover:bg-[#FEF3C7] flex items-center gap-2 border-b border-black/10 cursor-pointer"
                  onClick={() => {
                    setDropDown(false);
                    setshowPersonalDetails((prev) => !prev);
                  }}
                >
                  <User className="w-4 h-4 text-black stroke-[2.5]" />
                  <span>Personal Details</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 font-space text-xs sm:text-sm font-bold text-[#DC2626] hover:bg-[#FEE2E2] flex items-center gap-2 border-b border-black/10 cursor-pointer"
                  onClick={() => {
                    setDropDown(false);
                    setshowDeleteConfirmation((prev) => !prev);
                  }}
                >
                  <Trash2 className="w-4 h-4 stroke-[2.5]" />
                  <span>Delete All Links</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => {
                    setDropDown(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-3 py-2 font-bungee text-xs text-black hover:bg-[#FACC15] flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 stroke-[2.5]" />
                  <span>LOGOUT</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Logout;
