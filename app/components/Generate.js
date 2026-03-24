// Import necessary modules and components
"use client"; // Indicates this is a client-side component
import React from "react"; // Import React for JSX
import { useState } from "react"; // Import useState hook for state management
import Link from "next/link"; // Import Link for navigation
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast for notifications
import Loader from "../components/Loader"; // Import a custom Loader component
import { motion } from "framer-motion"; // Import motion for animations
import { nanoid } from "nanoid";
import Head from "next/head";
import Script from "next/script"
// Define the Generate component
const Generate = () => {
  // State variables for managing input fields, messages, and loading state
  const [longUrl, setlongUrl] = useState(""); // State for the long URL input
  const [Msg, setMsg] = useState(""); // State for the generated short URL message
  const [On, setOn] = useState(false); // State to toggle the display of the short URL
  const [loading, setloading] = useState(false); // State to manage the loading spinner

  // Function to handle URL generation
  async function GenerateUrl() {
    // Check if both input fields are filled
    if (!longUrl.trim()) {
      // Show a warning toast if inputs are empty
      toast.warn("Please enter the long url", {
        position: "top-right", // Position of the toast
        autoClose: 3000, // Auto close after 3 seconds
      });
      return; // Exit the function
    }
  let formattedUrl = longUrl.trim();
  if (!/^https?:\/\//i.test(formattedUrl)) {
    formattedUrl = "https://" + formattedUrl;
  }  
      // Strict URL Validation
  if (!isValidURL(formattedUrl)) {
    toast.error("Invalid URL", { position: "top-right", autoClose: 3000 });
    return;
  }
    setloading(true); // Set loading state to true

    try {
      // Get the current time and date
      let Time = Date.now(); // Get the current timestamp
      let time = new Date(Time).toLocaleTimeString(); // Format time
      let date = new Date(Time).toLocaleDateString(); // Format date

      // Send a POST request to the API with the input data
      const response = await fetch(`/api/`, {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
        },
        body: JSON.stringify({
          longUrl: longUrl, // Long URL input
          shortName: nanoid(4), // Short URL input
          time: time, // Current time
          date: date, // Current date
        }),
      });

      const result = await response.json(); // Parse the JSON response

      // Check if the response is not OK
      if (!response.ok) {
        // Show a warning toast with the error message
        toast.warn(result.error || "Something went wrong", {
          position: "top-right",
          autoClose: 3000,
        });

        // Clear the message and toggle state
        setMsg("");
        setOn(false);
        return; // Exit the function
      }

      // Show a success toast if the URL is generated successfully

      // Show a success toast if the URL is generated successfully
      // Show a success toast if the URL is generated successfully
      toast.success("The shorturl has been generated successfully", {
        position: "top-right",
        autoClose: 3000,
      });

      // 💡 Reset the previous state to trigger re-render
      setOn(false);
      setMsg("");

      // Wait for next render tick to set new values (ensures re-animation)
      setTimeout(() => {
        setMsg(result.fullShortUrl); // Set the generated short URL
        setOn(true); // Show the updated short URL
      }, 0);

      // Clear the input fields
      setlongUrl("");
    } catch (err) {
      // Show an error toast if an exception occurs
      toast.error("Server error Try again later", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(err); // Log the error to the console
      setMsg(""); // Clear the message
    } finally {
      setloading(false); // Set loading state to false
    }
  }
  function isValidURL(userURL) {
  try {
    const url = new URL(userURL);
    return url.hostname.includes("."); 
  } catch {
    return false;
  }
}
  // Function to handle copying the short URL to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text); // Copy the text to clipboard
    toast.success("URL copied to clipboard", {
      position: "top-right", // Position of the toast
      autoClose: 3000, // Auto close after 3 seconds
    });
  };
  // Render the component
  return (
    <>
      <Head>
        <title>Generate Short URL</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Generate Short URL" />
        <meta
          name="keywords"
          content="URL Shortener, Short URL, Generate Short URL"
        />
        <meta name="author" content="Your Name" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Script
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="lazyOnload" // loads script during idle time after page load
      />
      {/* Toast container for notifications */}
      <ToastContainer className={"pt-12"} />
      <div className="relative w-full bg-slate-900 flex justify-center items-center p-4" style={{ minHeight: "calc(100vh - 142px)", height:"full"}}>
        {/* Main container for the form */}
        <div
          className="flex flex-col z-10 bg-slate-700  sm:max-w-[50vh] md:max-w-[90vh] justify-center items-center min-h-[70vh] p-3   w-full text-white
          gap-6 rounded-2xl shadow-lg shadow-gray-600 "
        >
          {/* Title */}
          <h1 className="text-xl bree md:bree-bold  md:text-4xl">
            Generate Shorturl From Here
          </h1>
          {/* Input for the long URL */}
          <input
            aria-label="Enter the long URL"
            name="Enter the long URL"
            type="url"
            title="Enter the long url"
            autoComplete="on"
            className="bg-gray-800 z-2  focus:scale-102 font-bold outline-purple-700 rounded-2xl max-w-[80vh] w-full text-gray-white px-4 py-5 shadow-2xs shadow-white transition-all duration-300 ease-in-out"
            placeholder="Enter Long url"
            onChange={(e) => setlongUrl(e.target.value)} // Update state on change
            value={longUrl} // Bind state to input
          />

          {/* Button to trigger URL generation */}
          <button
            title="Generate Short URL"
            aria-label="Generate Short URL"
            name="Generate Short URL"
            className={
              loading
                ? " md:max-w-[79vh] max-w-[75vh] w-full sm:rounded-xl rounded-[5px] cursor-not-allowed z-2 p-4 shadow-2xs shadow-white text-xl roboto-bold text-red-900 bg-white transition-all duration-400 ease-in-out"
                : "bg-purple-700 md:max-w-[79vh] max-w-[75vh] w-full sm:rounded-xl rounded-[5px] cursor-pointer z-2 p-4 shadow-2xs shadow-white text-xl text-white roboto-bold hover:text-red-900 hover:bg-white transition-all duration-400 ease-in-out hover:scale-102"
            }
            onClick={GenerateUrl} // Call GenerateUrl on click
            disabled={loading} // Disable button if loading
          >
            {loading ? "Generating shorturl..." : "Generate shorturl"}{" "}
            {/* Show loading text */}
          </button>
          {/* Show loader if loading */}
          {loading && <Loader />}
          {/* Show the generated short URL if available */}
            {On && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-xl z-2 font-extrabold text-black text-center flex flex-col items-center justify-center gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="flex flex-col md:flex-row justify-center items-center gap-2 ">
                <span >The short url is:</span>
                <Link
                  title="Click to open the short url"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-white font-bold cursor-pointer underline z-2"
                  href={Msg}
                >
                  {Msg}
                </Link>
                </div>
                <span className="pt-12 md:pt-4">
                  <lord-icon
                    onClick={() => handleCopy(Msg)}
                    src="https://cdn.lordicon.com/iykgtsbt.json"
                    trigger="hover"
                    colors="primary:black,secondary:#08a88a"
                    className="w-[28px] h-[28px] cursor-pointer"
                    title="Copy to Clipboard"
                  ></lord-icon>
                </span>
              </div>
              <p className="text-sm text-gray-300 font-medium mt-1">
                ⚠️ This short URL includes a 5-second ad redirection before
                reaching the final page. Please wait patiently.
              </p>
            </motion.div>
          )}
          <div className="border-2 border-gray-900 w-full mt-4 flex flex-col justify-center items-center p-2 gap-3 rounded-lg max-w-[77vh] bg-slate-50">
            <h2 className="text-center text-2xl font-semibold text-black">
              Want to prevent ads and create urls with custom name??
            </h2>
            <button
            title="Signup to create custom short URLs"
            aria-label="Signup to create custom short URLs"
            name="Signup to create custom short URLs"
            className="text-xl font-semibold bg-slate-900 text-white p-3 rounded-xl hover:scale-102 transition-all duration-300 ease-in-out hover:text-white hover:bg-purple-700">
              <Link href="/sign-up-to-trimify">Signup now</Link>
            </button>
          </div>
        </div>
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b82f6,transparent)] opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#9333ea,transparent)] opacity-20"></div>
      </div>
    </>
  );
};

// Export the Generate component as default
export default Generate;
