// components/AuthWrapper.jsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast,ToastContainer } from "react-toastify";

export default function AuthWrapper({ children, username }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    const token = localStorage.getItem("Token");

    // ✅ Google Login
    if (status === "authenticated" && session?.user?.email) {
      setAuthorized(true);
      return;
    }

    // ✅ JWT Login
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const savedUsername = decoded.Username;

        if (savedUsername === username) {
          setAuthorized(true);
          return;
        } else {
          throw new Error("Username mismatch");
        }
      } catch {
        toast.error("Invalid token. Please login again.");
        router.push("/login");
      }
    } else {
      toast.warn("Please login first",{
        position:"top-right",
        autoClose:1000
      });
      router.push("/login");
    }
  }, [status, session, username, router]);

  if (status === "loading") return<>  <div>Loading session...</div></>
  if (!authorized) return <><div>Checking authentication...</div></>

  return children;
}
