import React from 'react';
import Image from "next/image"
export const metadata = {
  title: "Contact - Trimify", 
  description: "Get in touch with Trimify for feedback and support. Contact us via email or phone.We will response you as soon as possible. We are always waiting for your feedback! ", 
  keywords: [
    "contact Trimify",
    "support URL shortener",
    "customer service Trimify",
    "URL shortener help",
    "contact link shortener"
  ],
    alternates:{
    canonicals:"https://trimify.xyz/contact"
  },
   openGraph: {
   title: "Contact - Trimify",
   description:
      "Get in touch with Trimify for feedback and support. Contact us via email or phone.We will response you as soon as possible. We are always waiting for your feedback!",
    url: "/contact",
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
    title: "Contact - Trimify",
    description: "Get in touch with Trimify for feedback and support. Contact us via email or phone.We will response you as soon as possible. We are always waiting for your feedback!",
    images: ["/og-image.png"],
  },
};
const Contact = () => {
  return (
    <main
      className="hero relative  w-full  z-2 mx-auto flex p-4 md:p-10"
      aria-label="Main contact section"
      style={{ minHeight: "calc(100vh - 142px)", height: "full" }}
    >
      <section
        className="mx-auto bg-gray-100 md:max-w-4xl w-full text-gray-800 z-10 px-10 py-2 flex flex-col items-center gap-4 rounded-xl"
        aria-labelledby="contact-heading"
      >
        <header>
          <h1
            id="contact-heading"
            className="text-4xl bree text-center underline mt-8"
          >
            Contact Us
          </h1>
          <p className="poppins-semi mt-5 text-xl italic">
            Here are some options through which you can contact us and submit
            your feedback regarding your experience with this URL shortener. We
            would be happy to hear from you and try to enhance our website based
            on your suggestions.
          </p>
        </header>

        <section className="flex flex-col justify-center items-center gap-4 not-italic mx-auto pr-5">
          <address aria-labelledby="email-heading">
            <div className="flex items-center gap-2 justify-center text-center">
              <Image src="/email.png" width={32} height={32} alt="Email Icon" />
              <p id="email-heading" className="text-2xl font-bold underline">
                Email
              </p>
            </div>
            <p className="text-center text-xl font-bold mt-2">
              <a
                href="mailto:trimify4u@gmail.com"
                className="hover:underline hover:text-blue-300 ml-7"
              >
                trimify4u@gmail.com
              </a>
            </p>
          </address>
          <section
            aria-labelledby="phone-heading"
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2">
              <Image src="/phone.png" width={32} height={32} alt="Phone Icon" />
              <p
                id="phone-heading"
                className="text-2xl font-bold underline m-0"
              >
                Contact Number
              </p>
            </div>
            <p className="text-xl font-bold mt-2">
              <a
                href="tel:+923001090277"
                className="hover:underline hover:text-blue-300 ml-10"
              >
                +92 3159890576
              </a>
            </p>
          </section>

          <section aria-labelledby="whatsapp-heading">
            <div className="flex items-center gap-2 justify-center text-center">
              <Image
                src="/whatsapp.png"
                width={32}
                height={32}
                alt="WhatsApp Icon"
              />
              <p
                id="whatsapp-heading"
                className="text-2xl font-bold underline"
              >
                WhatsApp Support
              </p>
            </div>
            <p className="text-center text-xl font-bold mt-2">
              <a
                href="https://wa.me/03159890576"
                className="underline hover:text-blue-300 ml-2"
              >
                Chat Now
              </a>
            </p>
          </section>
        </section>

        <p className="text-xl font-extrabold text-center">
          We are always waiting for your feedback!
        </p>
      </section>

    </main>
  );
};

export default Contact;
