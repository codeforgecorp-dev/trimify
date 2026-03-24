"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";

const Logout = ({ username, setshowDeleteConfirmation, setshowPersonalDetails ,shortName ,analyticsPage }) => {
  const { data: session } = useSession();
  const [dropDown, setDropDown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("Token");

    if (typeof window !== "undefined" && window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }

    toast.success("Successfully Logged Out", {
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
    <>
      
      <div className="nav bg-gray-800 md:border-b md:border-gray-300 text-gray-800">
        <div className="flex justify-between items-center px-4 py-3 h-[62px] relative ml-2 md:ml-8">
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/brandLogo2.png" className="md:w-[50px] md:h-[50px] h-[40px] w-[40px] rounded-full" width={50} height={50} alt="logo" />
          </div>

          {/* Dropdown */}
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md bg-gray-100 transition-all duration-300 hover:bg-gray-200"
              onClick={() => setDropDown(!dropDown)}
            >
              {analyticsPage ?<> <Image
                src="/link.png"
                className="w-[28px] h-[28px]"
                width={32}
                height={32}
                alt="user"
                
              />
              <span className="font-medium text-gray-800">{shortName}</span></> : <><Image
                src="/user.png"
                width={32}
                height={32}
                alt="user"
                className="rounded-full"
              />
              <span className="font-medium text-gray-800">{username}</span></> }
              
              {/* Arrow Icon */}
              {analyticsPage ? null: (
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  dropDown ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>)}
            </div>

            {/* Dropdown Menu */}
            {analyticsPage ? null: ( 
            <ul
              className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50 border border-gray-200 transform origin-top transition-all duration-200 ${
                dropDown
                  ? "scale-y-100 opacity-100"
                  : "scale-y-0 opacity-0 pointer-events-none"
              }`}
              style={{
                transformOrigin: "top",
                transitionTimingFunction: "ease-in-out",
              }}
            >
              <li className="px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 cursor-pointer transition"
                onClick={()=>setshowPersonalDetails((prev)=>{
                  
                  return !prev
                  
                })}
              >
                Personal Details
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 cursor-pointer transition"
                onClick={() => {
                  setshowDeleteConfirmation((prev) => {
                    return !prev;
                  });
                }}
              >
                Delete All
              </li>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-red-100 text-sm text-red-600 cursor-pointer transition font-semibold"
              >
                Logout
              </li>
            </ul>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
