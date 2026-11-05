export const metadata = {
  title: "Trimify Privacy Policy - Short Links with UTM building",
  description:
    "Trimify Privacy Policy explains how we collect, use, and protect your data, including GDPR and CCPA compliance, cookies, JWT authentication, and user rights.",
  keywords: [
    "Trimify privacy policy",
    "GDPR compliance",
    "CCPA compliance",
    "link shortener",
    "user data protection",
    "URL shortener privacy",
  ],
  alternates: { canonical: "https://trimy.me/privacy-policy" },
  openGraph: {
    title: "Trimify Privacy Policy - Short Links with UTM building",
    description:
      "Trimify Privacy Policy explains how we collect, use, and protect your data, including GDPR and CCPA compliance, cookies, JWT authentication, and user rights.",
    url: "https://trimy.me/privacy-policy",
    siteName: "Trimify - The Ultimate URL Shortener",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Trimify logo" }],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trimify Privacy Policy - GDPR & CCPA Compliant",
    description:
      "Trimify Privacy Policy explains how we collect, use, and protect your data, including GDPR and CCPA compliance, cookies, JWT authentication, and user rights.",
    images: ["/og-image.png"],
  },
};

const PrivacyPolicy = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Trimify Privacy Policy",
    url: "https://trimy.me/privacy-policy",
    description:
      "Trimify Privacy Policy explains how we collect, use, and protect your personal information including cookies, JWT authentication, and user rights. Compliant with GDPR and CCPA.",
    publisher: {
      "@type": "Organization",
      name: "Trimify",
      logo: {
        "@type": "ImageObject",
        url: "https://trimy.me/og-image.png",
      },
    },
    mainEntity: [
      {
        "@type": "CreativeWork",
        name: "GDPR Compliance",
        description:
          "Trimify users can access, correct, or delete their personal data as per GDPR guidelines.",
      },
      {
        "@type": "CreativeWork",
        name: "CCPA Compliance",
        description:
          "California users can request data deletion, opt out of sale, and access their personal information according to CCPA.",
      },
      {
        "@type": "CreativeWork",
        name: "Cookies & Tracking",
        description:
          "Trimify uses essential, functional, analytics, and marketing cookies. Users can manage their consent.",
      },
      {
        "@type": "CreativeWork",
        name: "JWT Authentication",
        description:
          "JWT tokens are used to securely authenticate users for dashboard access and API requests. Tokens are encrypted and not shared with third parties.",
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-halftone-warm text-black p-4 sm:p-8 md:p-12 select-none">
        <div className="max-w-4xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-10 md:p-12">
          {/* Header Tag */}
          <div className="flex items-center justify-between pb-4 border-b-3 border-black mb-6">
            <span className="inline-block px-3 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1deg]">
              LEGAL DOCUMENT
            </span>
            <span className="text-xs font-black text-[#EF4444] uppercase tracking-wider">
              ✦ GDPR & CCPA COMPLIANT ✦
            </span>
          </div>

          <h1 className="font-bungee text-3xl md:text-5xl mb-4 text-center tracking-tight drop-shadow-[2px_2px_0px_#FACC15]">
            PRIVACY POLICY
          </h1>
          <p className="font-space text-base sm:text-lg font-bold text-black/80 mb-8 text-center max-w-2xl mx-auto leading-relaxed">
            At <span className="font-black text-black underline decoration-[#FACC15] decoration-4">Trimify</span>, your privacy is our absolute priority. This Privacy Policy explains how we collect, use, and safeguard your data when using our URL shortener and analytics tools.
          </p>

          <div className="space-y-8 font-space text-sm sm:text-base font-bold text-black/85 leading-relaxed">
            {/* 1 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
              <h2 className="font-bungee text-xl text-black mb-3 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#FACC15] border-2 border-black text-xs font-black">01</span>
                <span>INFORMATION WE COLLECT</span>
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-black/80 font-bold">
                <li>Email addresses and account credentials during account creation.</li>
                <li>URLs you generate, including custom slugs, tags, and analytics histories.</li>
                <li>Device, browser type, and interaction metrics to optimize redirect speeds.</li>
                <li>Cookies and authentication tokens for secure JWT session management.</li>
                <li>Hashed IP addresses and country geolocation for abuse prevention.</li>
              </ul>
            </section>

            {/* 2 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
              <h2 className="font-bungee text-xl text-black mb-3 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#EF4444] text-white border-2 border-black text-xs font-black">02</span>
                <span>HOW WE USE YOUR DATA</span>
              </h2>
              <ul className="list-disc ml-6 space-y-2 text-black/80 font-bold">
                <li>To route and serve instantaneous URL redirects.</li>
                <li>To power your personal link management dashboard.</li>
                <li>To secure sessions with verified JWT cryptographic tokens.</li>
                <li>To prevent fraud, malware, spam, and phishing campaigns.</li>
                <li>To comply with regulatory standards and legal obligations.</li>
              </ul>
            </section>

            {/* 3 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
              <h2 className="font-bungee text-xl text-black mb-3 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#F97316] text-white border-2 border-black text-xs font-black">03</span>
                <span>COOKIES & TRACKING</span>
              </h2>
              <p className="mb-3">Trimify utilizes minimal cookies solely to power core features:</p>
              <ul className="list-disc ml-6 space-y-2 text-black/80 font-bold">
                <li><strong>Essential Cookies:</strong> Required for secure JWT login verification.</li>
                <li><strong>Functional Cookies:</strong> Retain layout choices and cookie consent state.</li>
                <li><strong>Analytics Cookies:</strong> Aggregated, non-identifying performance measurements.</li>
                <li><strong>Marketing Cookies:</strong> Only applied if explicitly opted into.</li>
              </ul>
            </section>

            {/* 4 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
              <h2 className="font-bungee text-xl text-black mb-3 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#FACC15] border-2 border-black text-xs font-black">04</span>
                <span>JWT AUTHENTICATION</span>
              </h2>
              <p>
                We leverage JSON Web Tokens (JWT) stored locally on your device for fast, cryptographically signed authentication. Tokens are never sold or shared with any advertising brokers.
              </p>
            </section>

            {/* 5 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000]">
              <h2 className="font-bungee text-xl text-black mb-3 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#EF4444] text-white border-2 border-black text-xs font-black">05</span>
                <span>DATA SHARING & SECURITY</span>
              </h2>
              <p className="mb-2">We never sell personal information. Disclosures only occur:</p>
              <ul className="list-disc ml-6 space-y-2 text-black/80 font-bold">
                <li>With vetted infrastructure providers under strict non-disclosure terms.</li>
                <li>When required by enforceable legal process or court mandate.</li>
                <li>To safeguard Trimify users and defend against security exploits.</li>
              </ul>
            </section>

            {/* 6 to 12 */}
            <section className="p-5 bg-[#FFFDF0] border-3 border-black shadow-[3px_3px_0px_#000] space-y-4">
              <div>
                <h2 className="font-bungee text-lg text-black mb-1">06. DATA RETENTION & DELETION</h2>
                <p>We preserve records solely as needed for operational integrity. Users may delete their links or entire account data at any moment from the dashboard.</p>
              </div>
              <div className="pt-3 border-t-2 border-black/15">
                <h2 className="font-bungee text-lg text-black mb-1">07. YOUR RIGHTS (GDPR & CCPA)</h2>
                <p>You have full rights to inspect, download, modify, or permanently purge all personal information held in Trimify systems.</p>
              </div>
              <div className="pt-3 border-t-2 border-black/15">
                <h2 className="font-bungee text-lg text-black mb-1">08. POLICY UPDATES</h2>
                <p>Any updates to this policy are posted directly to this URL with modified timestamps.</p>
              </div>
            </section>

            {/* Contact */}
            <div className="p-5 bg-[#FEF3C7] border-3 border-black shadow-[3px_3px_0px_#000] text-center">
              <h2 className="font-bungee text-lg text-black mb-2">PRIVACY INQUIRIES</h2>
              <p className="font-space text-sm font-bold text-black/80">
                Contact our privacy compliance desk directly at{" "}
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

export default PrivacyPolicy;
