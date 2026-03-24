
import React from "react";
import Link from "next/link"
const Upgrade2premium = ({  setshowUpgradeBox }) => {
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40 p-6 md:p-0">
      
      <div className="relative w-full max-w-md rounded-2xl bg-zinc-900 text-white shadow-2xl p-6 border border-zinc-800 animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={() => setshowUpgradeBox(false)}
          className="absolute top-3 right-3 text-zinc-400 hover:text-white transition"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-center poppins-semi">
          Upgrade to <span className="text-yellow-400">Premium</span>
        </h2>

        <p className="text-sm text-zinc-400 text-center mt-2">
          Unlock powerful features and take your links to the next level 🚀
        </p>

        {/* Features */}
        <ul className="mt-5 space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-yellow-400">✔</span> Advanced analytics
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-400">✔</span> Password Protected Links
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-400">✔</span> Custom Link Expiry According to Date/Clicks
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-400">✔</span> Custom aliases & branded links
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-400">✔</span> QR code generation
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-400">✔</span> UTM tracking & insights
          </li>
        </ul>

        {/* Pricing */}
        <div className="mt-5 text-center">
          <p className="text-zinc-400 text-sm">Lifetime access</p>
          <p className="text-3xl font-bold text-yellow-400">$15</p>
          <p className="text-xs text-zinc-500 mt-1">
            Limited time offer · Ends in 3 months
          </p>
        </div>

        {/* Upgrade Button */}
        <button
          
          className="mt-6 w-full rounded-xl bg-yellow-400 cursor-pointer text-black py-3 font-semibold transition-all hover:bg-yellow-300 hover:scale-[1.02] active:scale-95"
        > <Link href={"/pricing"}>
          Upgrade to Premium ⚡ </Link>
        </button>

        {/* Footer */}
        <p className="text-xs text-zinc-500 text-center mt-4">
          No subscription · One-time payment
        </p>
      </div>
    </div>
  );
};

export default Upgrade2premium;



