"use client"; // Indicates this is a client-side component
import React from "react";
import { useState } from "react"; // Import useState hook for state management
import Link from "next/link"; // Import Link for navigation
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast for notifications
import Loader from "../components/Loader"; // Import a custom Loader component
import { motion } from "framer-motion"; // Import motion for animations
import { set } from "mongoose";
const Counter = () => {
  const [loading, setloading] = useState(false);
  const [shortName, setshortName] = useState(""); // State for the short URL input
  const [On, setOn] = useState(false); // State to toggle the display of the short URL
  const [Msg, setMsg] = useState(""); // State for messages
  // Function to handle URL generation
  const handleCount = async () => {
    setloading(true); // Set loading state to true
    let a =await fetch("api/count-clicks", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify({
        shortName: shortName, // Short URL input
      }),
    });
    const clicks=await a.json()
    if(clicks.error){
      setloading(false); // Set loading state to false
      toast.error(clicks.error,{
        position:"top-right",

        autoClose:3000
      })
    }else{
      setloading(false); // Set loading state to false
      setOn(true); // Set On to true to display the short URL
      setMsg(clicks.totalClicks); // Set the message from the response
    }
    
  };

  return (
    <>
    <ToastContainer  className={"pt-12"}/> {/* ToastContainer for notifications */}
      <div
        className="relative w-full bg-slate-900 flex justify-center items-center p-4"
        style={{ minHeight: "calc(100vh - 142px)", height: "full" }}
      >
        {/* Main container for the form */}
        <div
          className="flex flex-col z-10 bg-slate-700  sm:max-w-[50vh] md:max-w-[90vh] justify-center items-center min-h-[70vh] p-3   w-full text-white
             gap-6 rounded-2xl shadow-lg shadow-gray-600 "
        >
          {/* Title */}
          <h1 className="text-xl bree md:bree-bold  md:text-3xl">
            Write the Short Name or Short URL
          </h1>
          {/* Input for the long URL */}
          <input
            aria-label="Enter the Short Name or Short URL"
            type="url"
            title="Enter the Short Name or Short URL"
            name="shortName"
            autoComplete="on"
            className="bg-gray-800 z-2  focus:scale-102 font-bold outline-purple-700 rounded-2xl max-w-[80vh] w-full text-gray-white px-4 py-5 shadow-2xs shadow-white transition-all duration-300 ease-in-out"
            placeholder="Enter the Short Name or Short URL"
            onChange={(e) => setshortName(e.target.value)} // Update state on change
            value={shortName} // Bind state to input
          />

          {/* Button to trigger URL generation */}
          <button
            title="Count the clicks on the short URL"
            aria-label="Count the clicks on the short URL"
            className={
              loading
                ? " md:max-w-[79vh] max-w-[75vh] w-full sm:rounded-xl rounded-[5px] cursor-not-allowed z-2 p-4 shadow-2xs shadow-white text-xl roboto-bold text-red-900 bg-white transition-all duration-400 ease-in-out"
                : "bg-purple-700 md:max-w-[79vh] max-w-[75vh] w-full sm:rounded-xl rounded-[5px] cursor-pointer z-2 p-4 shadow-2xs shadow-white text-xl text-white roboto-bold hover:text-red-900 hover:bg-white transition-all duration-400 ease-in-out hover:scale-102"
            }
            onClick={handleCount} // Call GenerateUrl on click
            disabled={loading} // Disable button if loading
          >
            {loading ? "Counting clicks..." : "Count the clicks"}{" "}
            {/* Show loading text */}
          </button>
          {/* Show loader if loading */}
          {loading && <Loader />}
          {/* Show the generated short URL if available */}
          {On && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} // Initial animation state
              animate={{ opacity: 1, scale: 1 }} // Final animation state
              transition={{ duration: 1 }} // Animation duration
              className="text-xl z-2 font-extrabold text-black text-center flex items-center justify-center gap-2"
              
            >
              <p className="roboto-bold text-black text-2xl">The number of clicks on this short urls are: <span className="underline text-white"><b>{Msg}</b></span></p>
            </motion.div>
          )}
          <div className="border-2 border-gray-900 w-full mt-4 flex flex-col justify-center items-center p-2 gap-3 rounded-lg max-w-[77vh] bg-slate-50">
            <h2 className="text-center text-2xl font-semibold text-black">
              Want to see more analytics of short url??
            </h2>
            <button 
            title="Signup to create custom short URLs"
            aria-label="Signup to create custom short URLs"
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

export default Counter;
