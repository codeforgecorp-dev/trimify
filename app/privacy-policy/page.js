

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
  alternates: { canonical: "https://trimify.xyz/privacy-policy" },
  openGraph: {
    title: "Trimify Privacy Policy - Short Links with UTM building",
    description:
      "Trimify Privacy Policy explains how we collect, use, and protect your data, including GDPR and CCPA compliance, cookies, JWT authentication, and user rights.",
    url: "https://trimify.xyz/privacy-policy",
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
    url: "https://trimify.xyz/privacy-policy",
    description:
      "Trimify Privacy Policy explains how we collect, use, and protect your personal information including cookies, JWT authentication, and user rights. Compliant with GDPR and CCPA.",
    publisher: {
      "@type": "Organization",
      name: "Trimify",
      logo: {
        "@type": "ImageObject",
        url: "https://trimify.xyz/og-image.png",
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
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12"> 
  <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8 md:p-12"> 
    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Privacy Policy</h1> 
    <p className="mb-4"> 
      At <span className="font-semibold">Trimify</span>, your privacy is our priority. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our services. 
    </p> 
    <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2> 
    <ul className="list-disc ml-6 space-y-2"> 
      <li>Email addresses and account credentials when you sign up.</li> 
      <li>URLs you create, including custom aliases and analytics data.</li> 
      <li>Device, browser, and usage information to monitor performance and enhance user experience.</li> 
      <li>Cookies and tracking technologies for authentication, personalization, and analytics.</li> 
      <li>IP addresses and geolocation data for fraud detection and security purposes.</li> 
    </ul> 
    <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Data</h2> 
    <ul className="list-disc ml-6 space-y-2"> 
      <li>To provide and maintain Trimify services.</li> 
      <li>To manage your account securely using JWT authentication.</li> 
      <li>To personalize your experience and provide dashboard analytics.</li> 
      <li>To communicate important updates and notifications.</li> 
      <li>To analyze service usage and improve platform functionality.</li> 
      <li>To comply with legal obligations and prevent fraud or abuse.</li> 
    </ul> 
    <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies & Tracking</h2> 
    <p className="mb-4"> Trimify uses cookies and similar technologies for multiple purposes: </p> 
    <ul className="list-disc ml-6 space-y-2"> 
      <li> <span className="font-semibold">Essential Cookies:</span> Required for authentication, secure JWT session management, and core functionality. </li> 
      <li> <span className="font-semibold">Functional Cookies:</span> Remember preferences like theme, dashboard layout, or language settings. </li> 
      <li> <span className="font-semibold">Analytics Cookies:</span> Collect usage information to monitor performance and improve services. </li> 
      <li> <span className="font-semibold">Marketing Cookies:</span> Used only if you consent to promotional content or newsletters. </li> 
    </ul> 
    <h2 className="text-2xl font-semibold mt-8 mb-4">4. JWT Authentication</h2> 
    <p className="mb-4"> We use JSON Web Tokens (JWT) to securely authenticate users. JWTs are stored in your browser (localStorage) and are used to verify identity for dashboard access, protected routes, and API requests. Tokens are encrypted and not shared with third parties. </p> 
    <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Sharing & Security</h2> 
    <p className="mb-4"> Trimify does not sell your data. We may share your information only: </p> 
    <ul className="list-disc ml-6 space-y-2"> 
      <li>With trusted service providers (e.g., hosting, email, analytics) bound by confidentiality agreements.</li> 
      <li>To comply with legal obligations or prevent fraudulent activity.</li> 
      <li>To protect Trimify, its users, and public safety.</li> 
    </ul> 
    <p className="mb-4"> We implement strong security measures, including HTTPS, encryption, secure JWT handling, and access controls to protect your data. </p> 
    <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Retention</h2> 
    <p className="mb-4"> We retain personal data only as long as necessary for the purposes outlined in this policy or as required by law. Users may request deletion of their account and associated data at any time. </p> 
    <h2 className="text-2xl font-semibold mt-8 mb-4">7. Children’s Privacy</h2> 
    <p className="mb-4"> Trimify is not intended for children under 13 years old. We do not knowingly collect personal information from children. If we become aware of such data, we will delete it promptly. </p> 
    <h2 className="text-2xl font-semibold mt-8 mb-4">8. International Users & Data Transfers</h2> 
    <p className="mb-4"> Your data may be stored or processed in countries outside your residence. We ensure that international data transfers comply with relevant laws and data protection standards. </p> 
    <h2 className="text-2xl font-semibold mt-8 mb-4">9. Automated Decision-Making & Profiling</h2> 
    <p className="mb-4"> We do not use automated decision-making that affects users' rights. Data analysis is used solely for service improvements and performance monitoring. </p> 
    <h2 className="text-2xl font-semibold mt-8 mb-4">10. User Rights & Regulations</h2> 
    <p className="mb-4"> In compliance with GDPR, CCPA, and other applicable regulations: </p> 
    <ul className="list-disc ml-6 space-y-2"> 
      <li>Access, correct, or delete your personal data.</li> 
      <li>Download all your data collected by Trimify.</li> 
      <li>Withdraw consent for marketing communications.</li> 
      <li>Object to processing in specific circumstances.</li> 
    </ul> 
    <h2 className="text-2xl font-semibold mt-8 mb-4">11. Third-Party Services</h2> 
    <p className="mb-4"> We use third-party services for analytics, email, and cloud hosting. These services may collect and process your data as per their privacy policies. We ensure they comply with privacy standards. </p> 
    <h2 className="text-2xl font-semibold mt-8 mb-4">12. Changes to This Policy</h2> 
    <p className="mb-4"> We may update this Privacy Policy periodically. The latest version is always available on our website. Continued use of Trimify after changes indicates consent to the updated policy. </p> 
    <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact Us</h2> 
    <p> For questions or concerns regarding this Privacy Policy or your data, contact us at{" "} 
      <a href="mailto:trimify4u@gmail.com" className="text-blue-600 underline"> trimify4u@gmail.com </a>. 
    </p> 
    <p className="mt-8 text-sm text-gray-500 text-center"> &copy; {new Date().getFullYear()} Trimify. All rights reserved. </p> 
  </div> 
</div>

    </>
  );
};

export default PrivacyPolicy;
