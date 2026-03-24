import React, { Suspense } from "react";
import Ads from "@/app/components/Ads";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white bg-black h-screen flex items-center justify-center">Loading...</div>}>
      <Ads />
    </Suspense>
  );
}
