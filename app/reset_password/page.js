import ResetPassword from "../components/ResetPassword";
import Script from "next/script";
export const metadata = {
    title: "Reset Password | Trimify",
    description:
        "Reset your Trimify account password securely. Enter your registered email to receive a password recovery link and regain access to your dashboard.",
    keywords: [
        "Trimify forgot password",
        "reset Trimify password",
        "bitly alternative",
        "Trimify account recovery",
    ],
    alternates: {
        canonical: "https://trimy.me/reset_password",
    },
    openGraph: {
        title: "Forgot Password | Trimify",
        description:
            "Reset your Trimify account password securely. Enter your registered email to receive a password recovery link and regain access to your dashboard.",
        url: "https://trimy.me/reset_password",
        siteName: "Trimify",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Reset Password | Trimify",
        description:
            "Reset your Trimify account password securely. Enter your registered email to receive a password recovery link and regain access to your dashboard.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const page = () => {
    const getForgotPasswordStructuredData = () => ({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Forgot Password",
        description:
            "Reset your Trimify account password securely. Enter your registered email to receive a password recovery link and regain access to your dashboard.",
        url: "https://trimy.me/reset_password",
        publisher: {
            "@type": "Organization",
            name: "Trimify",
            url: "https://trimy.me",
        },
        inLanguage: "en",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": "https://trimy.me/reset_password",
        },
        potentialAction: {
            "@type": "RecoverAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: "https://trimy.me/reset_password",
            },
            name: "Reset Trimify Password",
        },
    });
    return (
        <>
            <Script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(getForgotPasswordStructuredData()),
                }}
            />
            <ResetPassword />
        </>
    )
}

export default page
