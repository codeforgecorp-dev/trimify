import React from "react";

const Loader2 = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs select-none">
      <div className="p-8 bg-white border-4 border-black shadow-[8px_8px_0px_#FACC15] flex flex-col items-center gap-6">
        {/* Outer rotating ring */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-6 border-black border-t-[#FACC15] border-r-[#EF4444] animate-spin" />
          <div className="absolute inset-3 rounded-full bg-[#FEF3C7] animate-pulse" />
        </div>

        {/* Text */}
        <div className="flex items-center gap-2 font-bungee text-xl text-black">
          <span>VERIFYING ACCESS</span>
          <span className="flex gap-1">
            <span className="animate-bounce delay-0">.</span>
            <span className="animate-bounce [animation-delay:0.15s]">.</span>
            <span className="animate-bounce [animation-delay:0.3s]">.</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader2;
