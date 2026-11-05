import Script from "next/script";

export const metadata = {
  title: "Refund Policy | Trimify",
  description:
    "Read Trimify's Refund Policy. All purchases are non-refundable except in verified cases of non-delivery. Learn about refund eligibility, proof requirements, and timelines.",
  keywords: [
    "Trimify refund policy",
    "refund policy",
    "non refundable policy",
    "Trimify payments",
    "SaaS refund policy",
    "digital services refund policy",
  ],
  alternates: {
    canonical: "https://trimy.me/refund-policy",
  },
  openGraph: {
    title: "Refund Policy | Trimify",
    description:
      "Official Refund Policy of Trimify. Refunds are only issued in verified cases of non-delivery.",
    url: "https://trimy.me/refund-policy",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Trimify logo" }],
    siteName: "Trimify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy | Trimify",
    description:
      "Official Refund Policy of Trimify. Refunds are only issued in verified cases of non-delivery.",
    site: "@trimify",
    creator: "@trimify",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const RefundPolicyPage = () => {
  const getStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Refund Policy",
    description:
      "Refund Policy for Trimify. Purchases are non-refundable except in verified cases of non-delivery.",
    url: "https://trimy.me/refund-policy",
    publisher: {
      "@type": "Organization",
      name: "Trimify",
      url: "https://trimy.me",
    },
    inLanguage: "en",
  });

  return (
    <>
      <Script
        id="refund-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
      />
      <div className="min-h-screen bg-halftone-warm text-black p-4 sm:p-8 md:p-12 select-none">
        <div className="max-w-4xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-10 md:p-12">
          {/* Header Tag */}
          <div className="flex items-center justify-between pb-4 border-b-3 border-black mb-6">
            <span className="inline-block px-3 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1deg]">
              BILLING TERMS
            </span>
            <span className="text-xs font-black text-[#EF4444] uppercase tracking-wider">
              ✦ FAIR & TRANSPARENT ✦
            </span>
          </div>

          <h1 className="font-bungee text-3xl md:text-5xl mb-2 text-center tracking-tight drop-shadow-[2px_2px_0px_#FACC15]">
            REFUND POLICY
          </h1>
          <p className="text-xs font-black uppercase text-center text-black/60 mb-6">
            Last updated: December 2025
          </p>

          <p className="font-space text-base sm:text-lg font-bold text-black/80 mb-8 text-center max-w-2xl mx-auto leading-relaxed">
            At <span className="font-black text-black underline decoration-[#FACC15] decoration-4">Trimify</span>, we believe in straightforward, clear policies. Please review our refund guidelines prior to acquiring any premium license or package.
          </p>

          <div className="space-y-6 font-space text-sm sm:text-base font-bold text-black/85 leading-relaxed">
            {/* 1 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
              <h2 className="font-bungee text-xl text-black mb-2 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#EF4444] text-white border-2 border-black text-xs font-black">01</span>
                <span>NO REFUND AFTER SUCCESSFUL DELIVERY</span>
              </h2>
              <p className="mb-2">
                Due to the instantaneous digital activation of our SaaS infrastructure, purchases on Trimify are <strong>final and non-refundable</strong> once service has been granted.
              </p>
              <ul className="list-disc ml-6 space-y-1 text-black/80">
                <li>All lifetime license offerings.</li>
                <li>Discounted early-bird promos.</li>
                <li>Digital features already credited to the user account.</li>
              </ul>
            </section>

            {/* 2 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
              <h2 className="font-bungee text-xl text-black mb-2 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#FACC15] border-2 border-black text-xs font-black">02</span>
                <span>EXCEPTION: VERIFIED NON-DELIVERY</span>
              </h2>
              <p className="mb-2">A full refund is honored if:</p>
              <ul className="list-disc ml-6 space-y-1 text-black/80">
                <li>Payment was processed but premium features failed to activate within 24 hours.</li>
                <li>Technical system failures on Trimify prevented product access despite valid proof.</li>
                <li>Our engineering team was unable to resolve the delivery failure within 48 hours of notification.</li>
              </ul>
            </section>

            {/* 3 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
              <h2 className="font-bungee text-xl text-black mb-2 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#F97316] text-white border-2 border-black text-xs font-black">03</span>
                <span>REFUND REQUEST WINDOW</span>
              </h2>
              <p>
                Non-delivery claims must be submitted within <strong>7 days</strong> from the transaction date. Claims submitted after 7 days are ineligible for review.
              </p>
            </section>

            {/* 4 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
              <h2 className="font-bungee text-xl text-black mb-2 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#FACC15] border-2 border-black text-xs font-black">04</span>
                <span>HOW TO REQUEST A REFUND</span>
              </h2>
              <p className="mb-2">Send an email to <strong className="text-[#EF4444]">trimify4u@gmail.com</strong> with:</p>
              <ul className="list-disc ml-6 space-y-1 text-black/80">
                <li>Your registered Trimify account email.</li>
                <li>Transaction or Order ID from Paddle / Payment Provider.</li>
                <li>Screenshot showing feature non-activation on your dashboard.</li>
              </ul>
            </section>

            {/* Contact */}
            <div className="p-5 bg-[#FEF3C7] border-3 border-black shadow-[3px_3px_0px_#000] text-center">
              <h2 className="font-bungee text-lg text-black mb-1">BILLING QUESTIONS?</h2>
              <p className="font-space text-sm font-bold text-black/80">
                Contact our customer support team directly at{" "}
                <a href="mailto:trimify4u@gmail.com" className="font-bungee text-[#EF4444] underline hover:text-black">
                  trimify4u@gmail.com
                </a>
              </p>
            </div>
          </div>

          <p className="mt-8 text-xs font-bold text-black/60 text-center">
            &copy; {new Date().getFullYear()} Trimify. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default RefundPolicyPage;
