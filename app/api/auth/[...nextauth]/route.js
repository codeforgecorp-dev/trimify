import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/app/lib/mongoose";
import Data from "@/app/models/Sign-up";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],

  secret: process.env.JWT_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      await connectDB();

      if (account.provider === "google") {
        const existingUser = await Data.findOne({
          Email: user.email,
        });

        if (!existingUser) {
          let City = "";
          let Country = "";

          try {
            const host = process.env.HOST_URL;

            if (!host) {
              throw new Error("HOST_URL is missing");
            }

            const geoRes = await fetch(
              `${host}/api/location`,
              {
                cache: "no-store",
              }
            );

            if (!geoRes.ok) {
              throw new Error(
                `Location API failed: ${geoRes.status}`
              );
            }

            const geo = await geoRes.json();

            City = geo.city || "";
            Country = geo.country || "";

          } catch (error) {
            console.error(
              "Location fetching failed:",
              error
            );
          }

          await Data.create({
            FullName: user.name,
            Email: user.email,
            Username: user.email.split("@")[0],
            Image: user.image,
            Provider: "google",
            Country: Country,
            City: City,
            Role: "user",
            isPremium: false,
          });
        }

        return true;
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
