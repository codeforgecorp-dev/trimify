import SessionWrapper from "./components/SessionProvider";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import { Roboto, Bree_Serif,  Poppins, Inter } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-roboto",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FACC15", // ✅ Correct place
};
export const metadata = {
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/og-image.png"
  }
};
const bree = Bree_Serif({
  subsets: ["latin"],
  weight: ["400"], // ✅ دونوں include کریں
  display: "swap",
  variable: "--font-bree",
});
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins', // Optional CSS variable name
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Full variable range
  display: 'swap',
});
const inter = Inter({
   subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${bree.variable} ${poppins.variable} ${inter.variable}`}>
      <head>
       <meta name="p:domain_verify" content="51adef505cfa5c693c3802397e72d16d"/> 
       <link rel="icon" href="/favicon.png" type="image/png" />
       <meta name="yandex-verification" content="856eed846c4fcea9" />
       <meta name="google-adsense-account" content="ca-pub-6762794271004506" />   
  {/* Ads Section */}

         {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6N1QFL1KLS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6N1QFL1KLS');
          `}
        </Script>

         <Script src="https://pl28978509.profitablecpmratenetwork.com/20/2e/c8/202ec891c00ef24338c1ecfb82971537.js" strategy="afterInteractive" // loads after page is interactive
        />  
      </head>
      <body>
        {/* Move Script here */}
     
            
        <Script
          unsafe-eval
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        <SpeedInsights/>
        <Analytics/>
        <SessionWrapper>{children}</SessionWrapper>
         <Script
        src="https://pl26832714.profitablecpmratenetwork.com/33/d0/dd/33d0dd3fa614e573dd5b6af63f5b7a14.js"
        strategy="afterInteractive" // loads after page is interactive
       
      />
      

          
      </body>
    </html>
  );
}
