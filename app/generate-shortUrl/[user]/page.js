"use client"; // Indicates this is a client-side component
import React, { useEffect } from "react"; // Import React and useEffect for side effects
import { useState } from "react"; // Import useState hook for state management
import Link from "next/link"; // Import Link for navigation
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast for notifications
import Loader from "@/app/components/Loader"; // Import custom Loader component
import { motion } from "framer-motion"; // Import motion for animations
import { set } from "mongoose"; // Import set from mongoose (not used here)
import Script from "next/script";
export default function UserUrl({ params }) {
  const username = params.user; // Extract the username from the route parameters
  const [longUrl, setlongUrl] = useState(""); // State for the long URL input
  const [shortUrl, setshortUrl] = useState(""); // State for the short URL input
  const [Msg, setMsg] = useState(""); // State for the generated short URL message
  const [On, setOn] = useState(false); // State to toggle the display of the short URL
  const [loading, setloading] = useState(false); // State to manage the loading spinner

  // Function to handle URL generation
  async function GenerateUrl() {
    // Check if both input fields are filled
    if (!longUrl.trim() || !shortUrl.trim()) {
      // Show a warning toast if inputs are empty
      toast.warn(
        "Please fill both Long URL and Short Name before generating!",
        {
          position: "top-right", // Position of the toast
          autoClose: 3000, // Auto close after 3 seconds
        }
      );
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
      let Time = await Date.now(); // Get the current timestamp
      let time = new Date(Time).toLocaleTimeString(); // Format time
      let data = new Date(Time).toLocaleDateString(); // Format date

      // Send a POST request to the API with the input data
      const response = await fetch(`/api/`, {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
        },
        body: JSON.stringify({
          username: username, // Include the username
          longUrl: longUrl, // Long URL input
          shortName: shortUrl, // Short URL input
          time: time, // Current time
          date: data, // Current date
          analytics: [],
          clicks: 0,
        }),
      });

      let result = await response.json(); // Parse the JSON response
 
      // Check if the response is not OK
      if (!response.ok) {
        // Show a warning toast if the URL already exists
        toast.warn("The url with this short name already exists", {
          position: "top-right",
          autoclose: 3000,
        });
        setlongUrl(""); // Clear the long URL input
        setshortUrl(""); // Clear the short URL input
        if(setOn===true){
          setOn(false)
        }
        return; // Exit the function
      } else {
        // Show a success toast if the URL is generated successfully
        setMsg(result.shortUrl); // Set the generated short URL message

        toast.success("The shorturl has been generated successfully", {
          position: "top-right",
          autoClose: 3000,
        });

        // 💡 Reset the previous state to trigger re-render
        setOn(false);
        setMsg("");

        // Wait for next render tick to set new values (ensures re-animation)
        setTimeout(() => {
          setMsg(result.fullShortUrl); // Set the full short URL
          setOn(true); // Show the updated short URL
        }, 0);

        // Clear the input fields
        setlongUrl("");
        setshortUrl(""); //he display of the short URL
      }
    } catch (err) {
      toast,
        warn("Server error Try again later", {
          position: "top-right", // Position of the toast
          autoClose: 3000, // Auto close after 3 seconds
        }); // Show a warning toast if an error occurs
      console.log(err);
    } finally {
      setloading(false); // Set loading state to false
    }
  }
  // Validation Function:
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
    <head>
      <title>Create custom URLs for free</title>
      <meta name="description" content="Create the short urls with custom domain name and feel free to analyze them through dashboard" />
    </head>
          <Script
        src="https://cdn.lordicon.com/lordicon.js"
        strategy="lazyOnload" // loads script during idle time after page load
      />
      {/* Toast container for notifications */}
      <ToastContainer className={"pt-12"} />
      <div className="relative  w-full bg-slate-900 flex justify-center items-center p-4" style={{ minHeight: "calc(100vh - 142px)", height: "full" }}>
        {/* Main container for the form */}
        <div
          className="flex flex-col z-10 bg-slate-700  sm:max-w-[50vh] md:max-w-[90vh] justify-center items-center min-h-[46vh] md:min-h-[60vh] w-full text-white
          gap-6 rounded-2xl shadow-lg shadow-gray-600 p-4"
        >
          {/* Title */}
          <h1 className=" text-xl bree md:bree-bold  md:text-4xl">
            Generate Shorturl From Here
          </h1>
          {/* Input for the long URL */}
          <input
            title="Enter the long url"
            aria-label="Enter Long URL"
            autoComplete="on"
            className="bg-gray-800 z-2 font-bold outline-purple-700 rounded-2xl max-w-[80vh] w-full text-gray-white px-4 py-4  shadow-2xs shadow-white focus:scale-102 focus:outline-purple-900 transition-all duration-300 ease-in-out"
            placeholder="Enter Long url"
            type="text"
            onChange={(e) => setlongUrl(e.target.value)} // Update state on change
            value={longUrl} // Bind state to input
          />
          {/* Input for the short name */}
          <input
            title="Enter the short name"
            aria-label="Enter Short Name"
            autoComplete="on"
            className="bg-gray-800 z-2 roboto-bold  outline-purple-700 rounded-2xl max-w-[80vh] w-full text-gray-white px-4 py-4  shadow-2xs shadow-white focus:scale-102 focus:outline-purple-900 transition-all duration-300 ease-in-out"
            placeholder="Enter Short Name"
            type="text"
            onChange={(e) => setshortUrl(e.target.value)} // Update state on change
            value={shortUrl} // Bind state to input
          />
          {/* Button to trigger URL generation */}
          <button
            title="Click to generate shorturl"
            aria-label="Click to generate shorturl"
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
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} // Initial animation state
                animate={{ opacity: 1, scale: 1 }} // Final animation state
                transition={{ duration: 1 }} // Animation duration
                className="text-xl z-2 font-extrabold text-black text-center flex flex-col items-center justify-center gap-2"
              >
               <div className="flex items-center gap-2">
                <div className="flex flex-col md:flex-row justify-center items-center gap-2 ">
                <span >The short url is:</span>
            
                <Link
                  title="Click to open the short url"
                  rel="noopener noreferrer" // Prevents the new page from accessing the original page
                  target="_blank" // Open link in a new tab
                  className="text-white  font-bold cursor-pointer underline z-2 break-words"
                  href={Msg} // Link to the generated short URL
                >
                  {Msg}
                </Link>
                    </div>   
                <span className="mt-2">
                  <lord-icon
                    aria-label="Copy to Clipboard"
                    onClick={() => {
                      handleCopy(Msg); // Call handleCopy with the generated short URL
                    }}
                    alt="Copy to Clipboard"
                    src="https://cdn.lordicon.com/iykgtsbt.json"
                    trigger="hover"
                    colors="primary:black,secondary:#08a88a"
                    className="w-[28px] h-[28px] cursor-pointer"
                    title="Copy to Clipboard"
                  ></lord-icon>
                </span>
                </div>
                  <button 
                  title="Go back to dashboard"
                  aria-label="Go back to dashboard"
                  className="text-xl font-semibold bg-slate-900 text-white p-3 rounded-xl hover:scale-102 transition-all duration-300 ease-in-out hover:text-white hover:bg-purple-700 px-8 ">
                <Link href={`/user/${username}/dashboard`}>Go back to dashboard</Link>
              </button>
              </motion.div>
             
            </>
          )}
         
        </div>
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3b82f6,transparent)] opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#9333ea,transparent)] opacity-20"></div>
      </div>
    </>
  );
}

