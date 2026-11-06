"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import GoogleLoginButton from "../components/GoogleButton";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";
import { Sparkles, Eye, EyeOff, UserPlus, CheckCircle2 } from "lucide-react";

const Signup = () => {
  const [show1stPassword, setshow1stPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      let email = session?.user?.email;
      if (email) {
        let username = email.split("@")[0].toLowerCase();
        router.push(`/user/${username}/dashboard`);
        toast.success("Redirecting to your Dashboard...", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    }
  }, [session, status, router]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setloading(true);
    try {
      let a = await fetch("/api/sign-up", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const res = await a.json();
      if (res.success === false) {
        toast.error(res.error || "Sign-up failed", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.success("Account created! Redirecting to login...", {
          position: "top-right",
          autoClose: 1500,
        });
        setTimeout(() => {
          router.push(`/login`);
        }, 1500);
      }
    } catch {
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <ToastContainer className="pt-16" />
      <div className="min-h-[calc(100vh-142px)] w-full bg-halftone-warm flex flex-col justify-center items-center p-4 sm:p-6 select-none">
        <div className="relative w-full max-w-lg bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 flex flex-col items-center gap-5">
          {/* Top Tag Sticker */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% FREE SIGNUP</span>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="font-bungee text-2xl sm:text-3xl text-black tracking-tight drop-shadow-[2px_2px_0px_#FACC15]">
              CREATE AN ACCOUNT
            </h1>
            <p className="font-space text-xs sm:text-sm font-bold text-black/70 mt-1">
              Start shortening, tracking, and styling links in seconds.
            </p>
          </div>

          {/* Sign-up form */}
          <form
            id="submitForm"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full"
          >
            {/* Names row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bungee text-[11px] text-black uppercase mb-1">
                  First Name:
                </label>
                <input
                  autoComplete="given-name"
                  className="w-full p-3 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm placeholder:text-black/40 focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
                  type="text"
                  placeholder="First Name"
                  {...register("FirstName", { required: true })}
                />
              </div>

              <div>
                <label className="block font-bungee text-[11px] text-black uppercase mb-1">
                  Last Name:
                </label>
                <input
                  autoComplete="family-name"
                  className="w-full p-3 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm placeholder:text-black/40 focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
                  type="text"
                  placeholder="Last Name"
                  {...register("LastName", { required: true })}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-bungee text-[11px] text-black uppercase mb-1">
                Email Address:
              </label>
              <input
                autoComplete="email"
                className="w-full p-3 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm placeholder:text-black/40 focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
                type="email"
                placeholder="alex@example.com"
                {...register("Email", { required: true })}
              />
            </div>

            {/* Username */}
            <div>
              <label className="block font-bungee text-[11px] text-black uppercase mb-1">
                Username:
              </label>
              <input
                autoComplete="username"
                type="text"
                placeholder="Choose username (no spaces)"
                className="w-full p-3 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm placeholder:text-black/40 focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
                {...register("Username", {
                  required: true,
                  validate: (value) =>
                    !/\s/.test(value) || "Username cannot contain spaces",
                })}
              />
              {errors.Username && (
                <div className="mt-1 font-bold text-xs text-[#DC2626]">
                  {errors.Username.message}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block font-bungee text-[11px] text-black uppercase mb-1">
                Password:
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required:
                      "Password is required and must be 8+ characters",
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{8,}$/,
                      message:
                        "Include letters, numbers, and a special character",
                    },
                  })}
                  type={show1stPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Min 8 chars, 1 number, 1 special"
                  className="w-full p-3 pr-10 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm placeholder:text-black/40 focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
                />
                <button
                  type="button"
                  onClick={() => setshow1stPassword(!show1stPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/60 hover:text-black cursor-pointer"
                  title={show1stPassword ? "Hide password" : "Show password"}
                >
                  {show1stPassword ? (
                    <EyeOff className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <Eye className="w-4 h-4 stroke-[2.5]" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="mt-1 font-bold text-xs text-[#DC2626]">
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 pt-1 cursor-pointer font-space text-xs font-bold text-black/85">
              <input
                type="checkbox"
                required
                className="mt-0.5 w-4 h-4 accent-[#EF4444] cursor-pointer"
              />
              <span>
                I agree to Trimify's{" "}
                <Link
                  href="/terms-and-services"
                  className="font-bungee text-[#EF4444] underline hover:text-black"
                >
                  Terms & Policies
                </Link>
              </span>
            </label>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full brutal-btn brutal-btn-red py-3.5 font-bungee text-sm sm:text-base tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT ⚡"}</span>
            </button>
          </form>

          {loading && <Loader />}

          {/* Divider */}
          <div className="w-full flex items-center gap-3 my-1">
            <div className="flex-1 h-0.5 bg-black/20" />
            <span className="font-bungee text-xs text-black/50 px-2 py-0.5 bg-[#FFFBEB] border border-black/30 rotate-[1deg]">
              OR
            </span>
            <div className="flex-1 h-0.5 bg-black/20" />
          </div>

          {/* Google Sign-in */}
          <div className="w-full">
            <GoogleLoginButton width={380} />
          </div>

          {/* Login prompt */}
          <div className="text-center pt-2 font-space text-xs sm:text-sm font-bold text-black/80">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bungee text-[#EF4444] underline hover:text-black ml-1"
            >
              LOG IN NOW →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
