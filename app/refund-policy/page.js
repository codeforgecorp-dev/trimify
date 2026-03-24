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
    canonical: "https://trimify.xyz/refund-policy",
  },
  openGraph: {
    title: "Refund Policy | Trimify",
    description:
      "Official Refund Policy of Trimify. Refunds are only issued in verified cases of non-delivery.",
    url: "https://trimify.xyz/refund-policy",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Trimify logo" }],
    siteName: "Trimify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy | Trimify",
    description:
      "Official Refund Policy of Trimify. Refunds are only issued in verified cases of non-delivery.",
    site: "@trimify",        // optional (remove if not registered)
    creator: "@trimify",     // optional
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const page = () => {
  
  const getStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Refund Policy",
    description:
      "Refund Policy for Trimify. Purchases are non-refundable except in verified cases of non-delivery.",
    url: "https://trimify.xyz/refund-policy",
    publisher: {
      "@type": "Organization",
      name: "Trimify",
      url: "https://trimify.xyz",
    },
    inLanguage: "en",
  };
};
  return (
    
  <>
    <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
      />

    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Refund Policy</h1>
        <p className="text-sm text-gray-500 mb-6">
          Last updated: December 2025
        </p>

        <p className="mb-6">
          At <strong>Trimify</strong>, we aim to provide transparent and fair
          policies for our users. Please read this Refund Policy carefully before
          purchasing any plan or service on our website.
        </p>

        <hr className="my-6" />

        {/* Section 1 */}
        <h2 className="text-xl font-semibold mb-2">
          1. No Refund After Purchase
        </h2>
        <p className="mb-4">
          All purchases made on Trimify are <strong>final and non-refundable</strong>.
          Once a package or plan has been successfully purchased, the paid amount
          will not be refunded under normal circumstances.
        </p>

        <ul className="list-disc ml-6 mb-4">
          <li>Basic plans</li>
          <li>Premium or lifetime plans</li>
          <li>Promotional or discounted offers</li>
        </ul>

        <p className="mb-6">
          By completing a purchase, you acknowledge and agree that refunds are not
          guaranteed after payment confirmation.
        </p>

        {/* Section 2 */}
        <h2 className="text-xl font-semibold mb-2">
          2. Exception – Non-Delivery of Product
        </h2>
        <p className="mb-4">
          A refund may only be considered in exceptional cases where:
        </p>

        <ul className="list-disc ml-6 mb-4">
          <li>
            The payment has been successfully deducted from the user’s account,
            and
          </li>
          <li>
            The purchased product or service was not delivered or activated on the
            user’s Trimify account.
          </li>
        </ul>

        <p className="mb-6">
          Refunds will only be processed after a proper investigation by our team.
        </p>

        {/* Section 3 */}
        <h2 className="text-xl font-semibold mb-2">
          3. Required Proof for Refund Requests
        </h2>
        <p className="mb-4">
          To request a refund under the non-delivery exception, the user must
          provide valid proof, including but not limited to:
        </p>

        <ul className="list-disc ml-6 mb-6">
          <li>Clear screenshot (SS) of the transaction receipt</li>
          <li>Payment reference ID or transaction number</li>
          <li>Registered email address used on Trimify</li>
          <li>Date and time of the transaction</li>
        </ul>

        <p className="mb-6 font-medium">
          Requests without sufficient proof will not be entertained.
        </p>

        {/* Section 4 */}
        <h2 className="text-xl font-semibold mb-2">
          4. Investigation & Approval Process
        </h2>
        <ol className="list-decimal ml-6 mb-6">
          <li>
            Our team will verify the payment details with the payment gateway.
          </li>
          <li>
            We will check delivery logs and account activation records.
          </li>
          <li>
            If it is confirmed that the amount was deducted but the product was not
            delivered, the refund will be approved.
          </li>
        </ol>

        <p className="mb-6">
          If the investigation shows that the product or service was delivered
          successfully, no refund will be issued.
        </p>

        {/* Section 5 */}
        <h2 className="text-xl font-semibold mb-2">
          5. Refund Method & Timeline
        </h2>
        <ul className="list-disc ml-6 mb-6">
          <li>
            Approved refunds will be processed using the original payment method.
          </li>
          <li>
            Refund processing typically takes 7–14 working days.
          </li>
          <li>
            Trimify is not responsible for delays caused by banks or third-party
            payment gateways.
          </li>
        </ul>

        {/* Section 6 */}
        <h2 className="text-xl font-semibold mb-2">
          6. Chargebacks & Disputes
        </h2>
        <p className="mb-4">
          Initiating a chargeback or payment dispute without contacting Trimify
          support first may result in:
        </p>

        <ul className="list-disc ml-6 mb-6">
          <li>Account suspension or termination</li>
          <li>Permanent restriction from using our services</li>
        </ul>

        {/* Section 7 */}
        <h2 className="text-xl font-semibold mb-2">
          7. Policy Updates
        </h2>
        <p className="mb-6">
          Trimify reserves the right to update or modify this Refund Policy at any
          time without prior notice. Changes will be effective immediately upon
          posting on this page.
        </p>

        {/* Section 8 */}
        <h2 className="text-xl font-semibold mb-2">
          8. Contact Us
        </h2>
        <p className="mb-2">
          For refund-related queries, please contact us at:
        </p>

        <p className="font-medium">
          Email:{" "}
          <a
            href="mailto:support@trimify.xyz"
            className="text-blue-600 underline"
          >
            support@trimify.xyz
          </a>
        </p>

        <p className="mt-6 text-sm text-gray-600">
          By purchasing any service on Trimify, you agree to this Refund Policy in
          full.
        </p>
      </div>
   </div>
   </>
  );
};

export default page;
