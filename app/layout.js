import SessionWrapper from "./components/SessionProvider";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Roboto, Bree_Serif, Poppins, Inter, Space_Grotesk, Bungee } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-roboto",
});

const bree = Bree_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-bree",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bungee = Bungee({
  subsets: ["latin"],
  variable: "--font-bungee",
  weight: ["400"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FACC15",
};

export const metadata = {
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/og-image.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${bree.variable} ${poppins.variable} ${inter.variable} ${spaceGrotesk.variable} ${bungee.variable}`}
    >
      <head>
        <meta name="p:domain_verify" content="51adef505cfa5c693c3802397e72d16d" />
        <link rel="icon" href="/favicon.png" type="image/png" />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JYDGEXZ9ZD"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JYDGEXZ9ZD');
          `}
        </Script>
      </head>
      <body className="bg-[#FFFDF0] text-black selection:bg-[#FACC15] selection:text-black min-h-screen flex flex-col antialiased">
        <SpeedInsights />
        <Analytics />
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
