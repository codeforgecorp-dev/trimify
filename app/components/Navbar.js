"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="nav bg-neutral-950 border-b border-neutral-800 text-gray-100 w-full z-50 shadow-md sticky top-0">
      <div className="flex justify-between items-center p-2 md:px-4 md:py-3 h-[62px]">
        {/* Logo + Tagline */}
        <div className="flex flex-col sm:flex-row sm:items-center">
          <h1 className="text-2xl md:text-4xl bree text-white">TRIMIFY</h1>
          <p className="ml-0 sm:ml-2 mt-[-4px] sm:mt-[14px] text-sm font-medium text-gray-400">
            Shorten smart · Share fast
          </p>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-center items-center gap-4 text-lg font-medium">
          {["Home","Pricing","Blog", "Contact"].map((item, index) => (
            <li key={index}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="px-3 py-1 rounded-md hover:bg-neutral-800 transition-all duration-200"
              >
                {item}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/sign-up-to-trimify"
              className="px-4 py-1 rounded-md bg-white text-black font-bold hover:bg-gray-200 transition"
            >
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <button
          title="Toggle mobile menu"
          aria-label="Toggle mobile menu"
          name="mobile-menu-toggle"
          className="md:hidden text-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col md:hidden px-4 pb-4 gap-3 bg-neutral-950 text-gray-100 text-base">
          {["Home","Pricing","Blog", "Contact"].map((item, index) => (
            <Link
              key={index}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="hover:bg-neutral-800 py-2 px-2 rounded-md transition"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link
            href="/sign-up-to-trimify"
            className="hero mt-1 font-bold text-black bg-white hover:bg-gray-200 rounded-md py-2 px-3 transition"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
