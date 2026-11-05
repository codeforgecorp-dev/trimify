import Script from "next/script";

export const metadata = {
  title: "Terms & Services | Trimify",
  description:
    "Read Trimify's Terms & Services. Understand the rules, user obligations, and policies for using Trimify services safely and responsibly.",
  alternates: {
    canonical: "https://www.trimy.me/terms-and-services",
  },
  openGraph: {
    title: "Terms & Services | Trimify",
    description:
      "Official Terms & Services of Trimify. Learn about user obligations, rules, and policies for using Trimify services.",
    url: "https://www.trimy.me/terms-and-services",
    siteName: "Trimify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Services | Trimify",
    description:
      "Official Terms & Services of Trimify. Learn about user obligations, rules, and policies for using Trimify services.",
    site: "@trimify",
    creator: "@trimify",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const TermsPage = () => {
  const getStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Services",
    description:
      "Official Terms & Services of Trimify. Learn about user obligations, rules, and policies for using Trimify services.",
    url: "https://www.trimy.me/terms-and-services",
    publisher: {
      "@type": "Organization",
      name: "Trimify",
      url: "https://www.trimy.me",
    },
    inLanguage: "en",
  });

  return (
    <>
      <Script
        id="terms-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
      />
      <div className="min-h-screen bg-halftone-warm text-black p-4 sm:p-8 md:p-12 select-none">
        <div className="max-w-4xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-10 md:p-12">
          {/* Header Tag */}
          <div className="flex items-center justify-between pb-4 border-b-3 border-black mb-6">
            <span className="inline-block px-3 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1deg]">
              LEGAL TERMS
            </span>
            <span className="text-xs font-black text-[#EF4444] uppercase tracking-wider">
              ✦ USER AGREEMENT ✦
            </span>
          </div>

          <h1 className="font-bungee text-3xl md:text-5xl mb-3 text-center tracking-tight drop-shadow-[2px_2px_0px_#FACC15]">
            TERMS & SERVICES
          </h1>
          <p className="text-xs font-black uppercase text-center text-black/60 mb-6">
            Last updated: December 2025
          </p>
          <p className="font-space text-base sm:text-lg font-bold text-black/80 mb-8 text-center max-w-2xl mx-auto leading-relaxed">
            Welcome to <span className="font-black text-black underline decoration-[#FACC15] decoration-4">Trimify</span>. By accessing our website or services, you agree to be bound by these Terms & Services.
          </p>

          <div className="space-y-6 font-space text-sm sm:text-base font-bold text-black/85 leading-relaxed">
            {/* 1 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
              <h2 className="font-bungee text-xl text-black mb-2 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#FACC15] border-2 border-black text-xs font-black">01</span>
                <span>ELIGIBILITY</span>
              </h2>
              <p>
                You must be at least 18 years old or possess legal parental or guardian authorization to use Trimify. By using our platform, you affirm your capability to enter into a binding agreement.
              </p>
            </section>

            {/* 2 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
              <h2 className="font-bungee text-xl text-black mb-2 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#EF4444] text-white border-2 border-black text-xs font-black">02</span>
                <span>DESCRIPTION OF SERVICES</span>
              </h2>
              <p>
                Trimify provides URL shortening, link analytics, campaign tagging, QR code creation, and related redirection utilities. We reserve the right to alter or update any capability at any time.
              </p>
            </section>

            {/* 3 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
              <h2 className="font-bungee text-xl text-black mb-2 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#F97316] text-white border-2 border-black text-xs font-black">03</span>
                <span>USER ACCOUNTS & SECURITY</span>
              </h2>
              <ul className="list-disc ml-6 space-y-1.5 text-black/80">
                <li>You are solely responsible for maintaining the security of your credentials.</li>
                <li>You agree to provide true, current, and verifiable information.</li>
                <li>All activities registered under your session are your responsibility.</li>
              </ul>
            </section>

            {/* 4 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
              <h2 className="font-bungee text-xl text-black mb-2 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#FACC15] border-2 border-black text-xs font-black">04</span>
                <span>ACCEPTABLE USE POLICY</span>
              </h2>
              <p className="mb-2">You agree NOT to use Trimify to short, disguise, or propagate:</p>
              <ul className="list-disc ml-6 space-y-1.5 text-black/80">
                <li>Phishing sites, deceptive pages, or social engineering lures.</li>
                <li>Malware, viruses, ransomware, or malicious executables.</li>
                <li>Unsolicited bulk communications (spam) or illegal materials.</li>
                <li>Hate speech, harassment, copyright infringement, or defamatory assets.</li>
              </ul>
              <p className="mt-3 text-xs font-black text-[#EF4444] uppercase">
                Violating links are terminated immediately without prior notice.
              </p>
            </section>

            {/* 5 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
              <h2 className="font-bungee text-xl text-black mb-2 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#EF4444] text-white border-2 border-black text-xs font-black">05</span>
                <span>PAID PLANS & CANCELLATIONS</span>
              </h2>
              <p>
                Paid tiers and lifetime passes are handled via authenticated payment gateways. All purchases adhere strictly to our transparent pricing and refund policies.
              </p>
            </section>

            {/* 6 & 7 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000] space-y-4">
              <div>
                <h2 className="font-bungee text-lg text-black mb-1">06. LIMITATION OF LIABILITY</h2>
                <p>Trimify is delivered on an "as is" basis. While we maintain a 99.9% uptime track record, we are not liable for incidental or consequential damages arising from service interruptions.</p>
              </div>
              <div className="pt-3 border-t-2 border-black/15">
                <h2 className="font-bungee text-lg text-black mb-1">07. GOVERNING LAW</h2>
                <p>These terms are governed by applicable local and international commercial standards.</p>
              </div>
            </section>

            {/* Contact */}
            <div className="p-5 bg-[#FEF3C7] border-3 border-black shadow-[3px_3px_0px_#000] text-center">
              <h2 className="font-bungee text-lg text-black mb-1">QUESTIONS ABOUT TERMS?</h2>
              <p className="font-space text-sm font-bold text-black/80">
                Reach our legal desk directly at{" "}
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

export default TermsPage;
