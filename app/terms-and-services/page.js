import Script from "next/script";

export const metadata = {
    title: "Terms & Services | Trimify",
    description:
        "Read Trimify's Terms & Services. Understand the rules, user obligations, and policies for using Trimify services safely and responsibly.",
    // Removed keywords array to improve SEO cleanliness for 2026 standards
    alternates: {
        canonical: "https://www.trimify.xyz/terms-and-services",
    },
    openGraph: {
        title: "Terms & Services | Trimify",
        description:
            "Official Terms & Services of Trimify. Learn about user obligations, rules, and policies for using Trimify services.",
        url: "https://www.trimify.xyz/terms-and-services", // FIXED: Added www.
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

const page = () => {
    const getStructuredData = () => ({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Terms & Services",
        description:
            "Official Terms & Services of Trimify. Learn about user obligations, rules, and policies for using Trimify services.",
        url: "https://www.trimify.xyz/terms-and-services", // FIXED: Added www.
        publisher: {
            "@type": "Organization",
            "name": "Trimify",
            "url": "https://www.trimify.xyz", // FIXED: Added www.
        },
        inLanguage: "en",
    });

    return (
        <> 
        <Script
            id="terms-structured-data" // Added id for Next.js best practices
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
        />
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Terms & Services</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Last updated: December 2025
                </p>

                <p className="mb-6">
                    Welcome to <strong>Trimify</strong>. These Terms & Services govern your
                    access to and use of our website, applications, and services. By
                    accessing or using Trimify, you agree to be bound by these terms. If you
                    do not agree, please do not use our services.
                </p>

                <hr className="my-6" />

                {/* 1 */}
                <h2 className="text-xl font-semibold mb-2">1. Eligibility</h2>
                <p className="mb-6">
                    You must be at least 18 years old or have legal parental consent to use
                    Trimify. By using our services, you confirm that you are legally capable
                    of entering into a binding agreement.
                </p>

                {/* 2 */}
                <h2 className="text-xl font-semibold mb-2">2. Description of Services</h2>
                <p className="mb-6">
                    Trimify provides URL shortening, link management, analytics, and related
                    digital services. We reserve the right to modify, suspend, or discontinue
                    any feature or service at any time without prior notice.
                </p>

                {/* 3 */}
                <h2 className="text-xl font-semibold mb-2">3. User Accounts</h2>
                <ul className="list-disc ml-6 mb-6">
                    <li>You are responsible for maintaining the confidentiality of your account.</li>
                    <li>You agree to provide accurate and up-to-date information.</li>
                    <li>You are responsible for all activities that occur under your account.</li>
                </ul>

                {/* 4 */}
                <h2 className="text-xl font-semibold mb-2">4. Acceptable Use Policy</h2>
                <p className="mb-4">You agree NOT to use Trimify for:</p>
                <ul className="list-disc ml-6 mb-6">
                    <li>Illegal, fraudulent, or unauthorized activities</li>
                    <li>Malware, phishing, scams, or harmful links</li>
                    <li>Spamming or abuse of system resources</li>
                    <li>Violation of any applicable laws or regulations</li>
                </ul>

                <p className="mb-6">
                    We reserve the right to suspend or terminate accounts violating these
                    rules without notice.
                </p>

                {/* 5 */}
                <h2 className="text-xl font-semibold mb-2">5. Payments & Subscriptions</h2>
                <p className="mb-6">
                    Some features of Trimify may require payment. All payments are processed
                    through third-party payment gateways. By purchasing any plan, you agree
                    to our pricing and refund policies.
                </p>

                {/* 6 */}
                <h2 className="text-xl font-semibold mb-2">6. Refund Policy</h2>
                <p className="mb-6">
                    All payments are final and non-refundable except in cases of proven
                    non-delivery. Please review our Refund Policy page for full details.
                </p>

                {/* 7 */}
                <h2 className="text-xl font-semibold mb-2">
                    7. Intellectual Property
                </h2>
                <p className="mb-6">
                    All content, branding, logos, designs, and software on Trimify are the
                    intellectual property of Trimify. You may not copy, modify, distribute,
                    or reverse-engineer any part of our service without written permission.
                </p>

                {/* 8 */}
                <h2 className="text-xl font-semibold mb-2">
                    8. Service Availability & Limitations
                </h2>
                <p className="mb-6">
                    We strive to maintain uninterrupted service, but we do not guarantee
                    that Trimify will be error-free, secure, or always available. Temporary
                    downtime may occur due to maintenance or technical issues.
                </p>

                {/* 9 */}
                <h2 className="text-xl font-semibold mb-2">9. Limitation of Liability</h2>
                <p className="mb-6">
                    Trimify shall not be liable for any direct, indirect, incidental, or
                    consequential damages arising from the use or inability to use our
                    services, including data loss or business interruption.
                </p>

                {/* 10 */}
                <h2 className="text-xl font-semibold mb-2">10. Termination</h2>
                <p className="mb-6">
                    We reserve the right to suspend or terminate your access to Trimify at
                    any time for violation of these terms or misuse of the platform.
                </p>

                {/* 11 */}
                <h2 className="text-xl font-semibold mb-2">
                    11. Changes to Terms
                </h2>
                <p className="mb-6">
                    Trimify may update these Terms & Services at any time. Continued use of
                    the service after changes indicates your acceptance of the updated
                    terms.
                </p>

                {/* 12 */}
                <h2 className="text-xl font-semibold mb-2">12. Governing Law</h2>
                <p className="mb-6">
                    These terms shall be governed and interpreted in accordance with the
                    laws applicable in Pakistan, without regard to conflict of law
                    principles.
                </p>

                {/* 13 */}
                <h2 className="text-xl font-semibold mb-2">13. Contact Us</h2>
                <p className="mb-2">
                    If you have any questions regarding these Terms & Services, contact us
                    at:
                </p>

                <p className="font-medium">
                    Email:{" "}
                    <a
                        href="mailto:trimify4u@gmail.com"
                        className="text-blue-600 underline"
                    >
                        trimify4u@gmail.com
                    </a>
                </p>
            </div>
        </div>
        </>
    );
};

export default page;
