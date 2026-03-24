import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 text-gray-700 border-t border-gray-200">
      <div className="max-w-6xl mx-auto py-3 px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl font-bree font-bold text-gray-900">
            Trimify
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            &copy; {new Date().getFullYear()} Trimify. All Rights Reserved.
          </p>
        </div>

        {/* Right Section */}
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-700 text-sm font-medium">
          <li>
            <Link
              href="/about"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              href="/pricing"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Pricing
            </Link>
          </li>

          <li>
            <Link
              href="/privacy-policy"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
          </li>

          <li>
            <Link
              href="/terms-and-services"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Terms & Services
            </Link>
          </li>

          <li>
            <Link
              href="/refund-policy"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Refund Policy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
