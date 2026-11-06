"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoogleLoginButton from "../components/GoogleButton";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../components/Loader";
import { useSession } from "next-auth/react";
import { Lock, User, ArrowRight, Eye, EyeOff, Sparkles } from "lucide-react";

const Login = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && !hasRedirected) {
      const email = session?.user?.email;
      if (email) {
        const username = email.split("@")[0].toLowerCase();
        setHasRedirected(true);
        toast.success(
          "Successfully logged in via Google! Redirecting to Dashboard...",
          {
            position: "top-right",
            autoClose: 1000,
          }
        );
        router.push(`/user/${username}/dashboard`);
      }
    }
  }, [status, session, hasRedirected, router]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    if (username.trim().length === 0) {
      setLoading(false);
      toast.error("Please enter your username", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    if (password.length === 0) {
      toast.error("Please enter your password", {
        position: "top-right",
        autoClose: 1500,
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          Username: username.trim(),
          Password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success && result.admin) {
        toast.success("Admin Logged In Successfully", {
          position: "top-right",
          autoClose: 1000,
        });
        router.push("/admin");
        return;
      }

      if (result.token) {
        localStorage.setItem("Token", result.token);
      }

      if (result.success) {
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 1000,
        });
        router.push(`/user/${username.trim()}/dashboard`);
      } else {
        toast.error(result.error || "Login failed. Please check credentials.", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch {
      toast.error("Network error! Please try again later.", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ToastContainer className="pt-16" />
      <div className="min-h-[calc(100vh-142px)] w-full bg-halftone-warm flex flex-col justify-center items-center p-4 sm:p-6 select-none">
        <div className="relative w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 flex flex-col items-center gap-5">
          {/* Top Tag Sticker */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MEMBER ACCESS</span>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="font-bungee text-2xl sm:text-3xl text-black tracking-tight drop-shadow-[2px_2px_0px_#FACC15]">
              WELCOME BACK
            </h1>
            <p className="font-space text-xs sm:text-sm font-bold text-black/70 mt-1">
              Sign in to manage your branded links and analytics.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block font-bungee text-xs text-black uppercase mb-1">
                Username:
              </label>
              <div className="relative">
                <input
                  required
                  onChange={(e) => setusername(e.target.value)}
                  value={username}
                  autoComplete="username"
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  data-testid="login-email"
                  className="w-full p-3 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm placeholder:text-black/40 focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block font-bungee text-xs text-black uppercase mb-1">
                Password:
              </label>
              <div className="relative">
                <input
                  required
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  data-testid="login-password"
                  className="w-full p-3 pr-10 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm placeholder:text-black/40 focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
                />
                <button
                  type="button"
                  onClick={() => setshowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 hover:text-black cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 stroke-[2.5]" /> : <Eye className="w-4 h-4 stroke-[2.5]" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right -mt-1">
              <Link
                href="/reset_password"
                className="font-bungee text-xs text-[#EF4444] hover:text-black underline tracking-wide"
              >
                FORGOT PASSWORD?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              data-testid="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full brutal-btn brutal-btn-yellow py-3.5 font-bungee text-sm sm:text-base tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? "LOGGING IN..." : "LOGIN NOW ⚡"}</span>
            </button>
          </form>

          {loading && <Loader />}

          {/* Divider */}
          <div className="w-full flex items-center gap-3 my-1">
            <div className="flex-1 h-0.5 bg-black/20" />
            <span className="font-bungee text-xs text-black/50 px-2 py-0.5 bg-[#FFFBEB] border border-black/30 rotate-[-1deg]">
              OR
            </span>
            <div className="flex-1 h-0.5 bg-black/20" />
          </div>

          {/* Google Login */}
          <div className="w-full">
            <GoogleLoginButton width={380} />
          </div>

          {/* Sign up prompt */}
          <div className="text-center pt-2 font-space text-xs sm:text-sm font-bold text-black/80">
            Don't have an account yet?{" "}
            <Link
              href="/sign-up-to-trimify"
              className="font-bungee text-[#EF4444] underline hover:text-black ml-1"
            >
              SIGN UP FOR FREE →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
