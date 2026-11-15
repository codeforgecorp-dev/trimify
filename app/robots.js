export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/user/",
        "/login",
        "/reset_password",
        "/sign-up-to-trimify",
        "/api/",
        "/admin",
      ],
    },
    sitemap: "https://www.trimy.me/sitemap.xml",
  };
}
