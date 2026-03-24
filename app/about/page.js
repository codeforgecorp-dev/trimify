import React from "react";

export const metadata={
  title: "About - Trimify",
  description: "Learn more about Trimify, a modern URL shortener built with Next.js,MongoDB and by using a lot of advance programming techniques.",
  keywords: [
    "about Trimify",
    "URL shortener company",
    "link shortener service",
    "trusted URL shortener",
    "Trimify team",
    "Trimify developer"
  ],
  alternates:{
    canonicals:"/about"
  },
   openGraph: {
   title: "About - Trimify",
   description:
      "Learn more about Trimify, a modern URL shortener built with Next.js,MongoDB and by using a lot of advance programming techniques.",
    url: "/about",
    siteName: "Trimify",
    images: [
      {
        url: "/og-image.png", // Recommended: 1200x630 og-image instead of favicon
        width: 800,
        height: 600,
        alt: "Trimify logo",
      },
    ],
    locale: "en-US",
    type: "website",
  },
    twitter: {
    card: "summary_large_image",
    title: "About - Trimify",
    description: "Learn more about Trimify, a modern URL shortener built with Next.js,MongoDB and by using a lot of advance programming techniques.",
    images: ["/og-image.png"],
  },
};
const About = () => {
  return (
<>
  <main className="hero relative min-h-[80.8vh] w-full z-2 mx-auto flex p-10">
    <div className="mx-auto bg-gray-50 max-w-5xl w-full text-gray-800 z-10 px-10 py-8 flex flex-col items-center gap-6 rounded-xl">
      <header>
        <h1
          id="about-us-heading"
          className="text-3xl font-bold underline mt-8"
          aria-label="About Trimify section"
        >
          About Trimify
        </h1>
      </header>
      <section className="flex flex-col gap-4">
        <p className="italic text-xl poppins-semi font-semibold">
          <b>Trimify</b> is a modern, fast, and reliable URL shortening and link analytics platform designed to help individuals, students, marketers, and businesses manage their links efficiently. Our mission is to make long URLs simple, trackable, and easy to share across the web.
        </p>
        <p className="italic text-xl poppins-semi font-semibold">
          Designed for simplicity and ease of use, <b>Trimify</b> provides registered users with a personalized dashboard where they can manage links, track analytics, generate QR codes, and create branded aliases for better digital marketing.
        </p>
        <p className="italic text-xl poppins-semi font-semibold">
          <b>Trimify</b> also works for users without accounts, making it flexible and accessible. The platform is continuously evolving, with new features being added regularly to enhance the user experience.
        </p>
        <p className="italic text-xl poppins-semi font-semibold">
          We are committed to trust and safety. <b>Trimify</b> does not support malicious content, phishing, spam, or deceptive practices. We actively monitor and prevent misuse to ensure a secure experience for all users.
        </p>
        <p className="italic text-xl poppins-semi font-semibold">
          <b>Location:</b> Pakistan Based <br />
          <b>Developer & Manager:</b> Zain Ul Abdeen
        </p>
        <p className="italic text-xl poppins-semi font-semibold">
          Whether you're a casual user or a digital professional, <b>Trimify</b> is your go-to platform for efficient link management, tracking, and sharing.
        </p>
      </section>
    </div>

    {/* Radial gradient backgrounds */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b82f6,transparent)] opacity-30"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#9333ea,transparent)] opacity-20"></div>
  </main>
</>
  );
};

export default About;
