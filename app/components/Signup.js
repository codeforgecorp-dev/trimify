"use client"; // Indicates this is a client-side component
import React, { useEffect } from "react"; // Import React for JSX
import Link from "next/link"; // Import Link for navigation
import GoogleLoginButton from "../components/GoogleButton"; // Import Google login button component
import { useState } from "react"; // Import useState hook for state management
import Image from "next/image"; // Import Image for optimized image rendering
import { useForm } from "react-hook-form"; // Import useForm for form handling
import Loader from "../components/Loader"; // Import custom Loader component
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer and toast for notifications
import Head from "next/head"; // Import Head for metadata
import { useSession } from "next-auth/react";

// Define the Signup component
const Signup = () => {
  const [show1stPassword, setshow1stPassword] = useState(false); // State to toggle confirm password visibility

  const [loading, setloading] = useState(false); // State to manage the loading spinner

  const router = useRouter(); // Initialize the router for navigation
  const { data: session, status } = useSession();

  useEffect(() => {
    const GoogleData = async () => {
      if (status === "authenticated") {
        let email = session.user.email;
        let username = email.split("@")[0].toLowerCase();
        router.push(`/user/${username}/dashboard`);
        toast.success("Redirecting to your Dashboard", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    };

    GoogleData();
  }, [session, status, router]);

  // Initialize form handling using react-hook-form
  const {
    register, // Register input fields
    handleSubmit, // Handle form submission
    watch, // Watch input values
    formState: { errors }, // Form state and errors
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    setloading(true); // Set loading state to true
    try {



      {
        let user = "user"; // Placeholder variable
        // Send a POST request to the sign-up API
        let a = await fetch("/api/sign-up", {
          method: "POST", // HTTP method
          body: JSON.stringify(data), // Send form data as JSON
          headers: { "Content-Type": "application/json" }, // Specify JSON content type
        });
        // Handle the API response
        a.json().then((res) => {
          if (res.success === false) {
            // Show error toast if sign-up fails
            toast.error(res.error, {
              position: "top-right",
              autoClose: 1000,
            });
          } else {
            // Show success toast if sign-up succeeds
            toast.success("Redirecting to login page", {
              position: "top-right",
              autoClose: 1000,
            });

            // Redirect to the user dashboard
            setTimeout(() => {
              router.push(`/login`);
            }, 2000);
          }
        });
      }
    } catch (error) {
      // Show error toast if an exception occurs
      toast.error("An error occurred. Please try again Later.", {
        position: "top-right",
        autoClose: 1000,
      });
    } finally {
      setloading(false); // Set loading state to false
    }
  };

  // Render the component
  return (
    <>
      {/* Add structured data for SEO */}
      <Head>
        <title>Sign Up to Trimify</title>
        <meta
          name="description"
          content="Create your Trimify account to shorten and manage links with analytics."
        />
        <link rel="canonical" href="/sign-up-to-trimify" />
      </Head>
      {/* Toast container for notifications */}
      <ToastContainer className={"mt-12"} />
      <div
        className="hero roboto-semi   w-full p-2  md:p-4 flex justify-center items-center"
        style={{ minHeight: "calc(100vh - 142px)", height: "full" }}
      >
        {/* Main container for the sign-up form */}
        <div className=" border-2 border-gray-800 bg-white p-6 rounded-2xl shadow-2xl  w-full max-w-[65vh] h-auto ">
          {/* Title of the sign-up page */}
          <h1 className="text-gray-800 bree-bold font-bold text-3xl text-center mt-5 ">
            Sign up to Trimify
          </h1>
          {/* Sign-up form */}
          <form
            id="submitForm"
            onSubmit={handleSubmit(onSubmit)} // Handle form submission
            className="flex flex-col gap-4 mt-10"
          >
            {/* Input fields for first and last name */}
            <div className="flex gap-2 w-full">
              <input
                title="Enter your first name"
                autoComplete="given-name" // Enable autocomplete for first name
                className=" text-gray-800 bg-white border border-gray-300  rounded-md py-3 p-2 focus:scale-102 focus:outline-none focus:ring-2 focus:ring-blue-400
 transition-all duration-300 ease-in-out  w-[160%] "
                type="text"
                {...register("FirstName", { required: true })} // Register input field
                id="FirstName"
                placeholder="Enter First Name"
              />
              <input
                title="Enter your last name"
                className=" text-gray-800 bg-white border border-gray-300  rounded-md py-3 p-2 focus:scale-102 focus:outline-none focus:ring-2 focus:ring-blue-400
 transition-all duration-300 ease-in-out  w-full sm:w-[130%] "
                autoComplete="family-name" // Enable autocomplete for last name
                type="text"
                {...register("LastName", { required: true })} // Register input field
                placeholder="Enter Last Name"
              />
            </div>

            {/* Input field for email or mobile number */}
            <input
              title="Enter email or mobile number"
              value={watch("Email")} // Watch the value of Email input
              autoComplete="email" // Enable autocomplete for email
              className=" text-gray-800 bg-white border border-gray-300  rounded-md py-3 p-2 focus:scale-102 focus:outline-none focus:ring-2 focus:ring-blue-400
transition-all duration-300 ease-in-out   "
              id="Email/Mobile Number"
              type="email"
              {...register("Email", { required: true })} // Register input field
              placeholder="Enter Email or Mobile Number"
            />

            {/* Input field for username */}
            <input
              title="Enter your new username"
              className=" text-gray-800 bg-white border border-gray-300  rounded-md py-3 p-2 focus:scale-102 focus:outline-none focus:ring-2 focus:ring-blue-400
transition-all duration-300 ease-in-out   "
              autoComplete="additional-name webauthn" // Enable autocomplete for username
              type="text"
              placeholder="Enter your new username"
              {...register("Username", {
                required: true,
                validate: (value) =>
                  !/\s/.test(value) || "Username cannot contain spaces", // Validate username
              })}
            />
            {errors.Username && (
              <div className="mt-[-10px] font-bold text-red-600">
                {errors.Username.message} {/* Display username error */}
              </div>
            )}

            {/* Input field for password */}
            <div className="relative w-full">
              <input
                title="Enter your new password"
                {...register("password", {
                  required:
                    "Password is required and it should be 8+ characters", // Password validation
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{8,}$/,
                    message:
                      "Password must be 8+ characters and include letters, numbers, and special characters",
                  },
                })}
                id="Password"
                type={show1stPassword ? "text" : "password"} // Toggle password visibility
                autoComplete="new-password" // Enable autocomplete for password
                placeholder="Enter your password"
                className=" text-gray-800 bg-white border border-gray-300  rounded-md py-3 p-2 focus:scale-102 focus:outline-none focus:ring-2 focus:ring-blue-400
transition-all duration-300 ease-in-out  w-full "
              />
              {/* Toggle password visibility */}
              <Image
                priority={true}
                title={show1stPassword ? "Hide password" : "Show password"}
                onClick={() => setshow1stPassword(!show1stPassword)} // Toggle visibility state
                alt="toggle visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                width={28}
                height={28}
                src={show1stPassword ? "/hide.png" : "/show.png"} // Show appropriate icon
              />
            </div>
            {errors.password && (
              <div className="mt-[-10px] font-bold text-red-600">
                {errors.password.message} {/* Display password error */}
              </div>
            )}



           {/* Terms and policies checkbox */}
            <label
              htmlFor="form"
              className="text-gray-800 text-xs md:text-sm flex  items-center gap-1"
            >
              <input
                type="checkbox"
                className="cursor-pointer"
                required
                aria-label="Agree to terms and policies"
              />
              <span>
                By checking it you agree to our{" "}
                <Link href="/terms-and-services" className="underline text-green-500">
                  Terms and Policies
                </Link>
              </span>
            </label>

            {/* Submit button */}
            <button
              title="Create your account"
              aria-label="Create your account"
              type="submit"
              className={
                loading
                  ? " transition-all ease-in-out duration-300 font-bold bg-green-400 text-black w-full p-4 hover:scale-100 rounded-[3px] cursor-not-allowed roboto-bold"
                  : "cursor-pointer transition-all ease-in-out duration-300 font-bold hover:bg-green-400 hover:text-black w-full p-4 bg-green-500 text-white rounded-[3px] hover:scale-101 inter-bold"
              }
              disabled={loading} // Disable button when loading
            >
              {loading ? "Creating Account..." : "Create Account"}{" "}
              {/* Show loading text */}
            </button>
          </form>

          {/* Show loader when loading */}
          {loading && <Loader style={{ marginTop: "10px" }} />}

          {/* Login link */}
          <div className="flex gap-[2px] items-center justify-end ">
            <p className="text-gray-800 mt-3">Already have an account?</p>
            <span
              title="If you already have trimify account then login"
              className="underline mt-3 text-green-500"
            >
              <Link href="/login">Login</Link>
            </span>
          </div>

          {/* Divider */}
          <p className="font-extrabold text-xl text-gray-800 text-center">or</p>

          {/* Google Sign-in button */}
          <div className="flex justify-center mt-2 cursor-pointer">
            <div
              title="Sign up using your google account"
              className="w-full bg-gray-50 rounded-lg border-1 border-black"
            >
              <GoogleLoginButton width={300} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Export the Signup component as default
export default Signup;
