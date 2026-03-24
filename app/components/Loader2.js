import React from "react";

const Loader2 = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-2xl bg-black/30">
            <div className="flex flex-col items-center gap-8">

                {/* Outer rotating ring */}
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full border-8 border-t-black-400 border-r-black-400 border-b-white border-l-white animate-spin" />

                    {/* Inner pulse */}
                    <div className="absolute inset-4 rounded-full bg-yellow-400/20 animate-pulse" />
                </div>

                {/* Text */}
                <div className="flex gap-2 items-center">
                    <h1 className="text-3xl font-semibold tracking-wide text-white animate-pulse">
                        Verifying Admin  </h1> <span className="flex gap-1 ml-1 mt-2">
                        <span className="text-3xl  font-semibold text-white animate-bounce delay-0">.</span>
                        <span className="text-3xl font-semibold text-white animate-bounce [animation-delay:0.15s]">.</span>
                        <span className="text-3xl font-semibold text-white animate-bounce [animation-delay:0.3s]">.</span>
                    </span>
                </div>


            </div>
        </div>
    );
};

export default Loader2;
