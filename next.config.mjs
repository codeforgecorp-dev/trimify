/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  images: {
    domains: [
      "api.ipgeolocation.io",
      "ipgeolocation.io",
      "www.countryflags.io",
      "flagcdn.com",
      "www.google.com",
    ],
  },
};

export default withPWA({
  dest: "public",
  disable:!isProd
})(nextConfig);
