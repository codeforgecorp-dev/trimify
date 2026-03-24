"use client";
import React from "react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Loader from "./Loader";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import e from "cors";
const FeedbackSection = ({ pageNo }) => {
  const [Feedbacks, setFeedbacks] = useState();
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [feedback, setfeedback] = useState("");
  const [loading, setloading] = useState(false);
  dayjs.extend(relativeTime);

  useEffect(() => {
    async function getFeedback() {
      let request = await fetch(`/api/blog?blogPageNo=${pageNo}`);
      let result = await request.json();
      if (result.success !== true) {
        return;
      } else {
        setFeedbacks(result.Feedback);
      }
    }
    getFeedback();
  }, [pageNo]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.length < 4) {
      toast.warn("Please enter your username. Minimum length is 4", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (email.length < 8) {
      toast.warn("Please enter a valid email", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (feedback.length < 20) {
      toast.warn("Minimum length of feedback is 20 characters", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setloading(true);

    try {
      let a = await fetch("/api/blog/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: username,
          Email: email,
          Feedback: feedback,
          blogPageNo: pageNo,
        }),
      });

      let response = await a.json();


      if (response.status === 200) {
        toast.success("Feedback submitted successfully.", {
          position: "top-right",
          autoClose: 3000,
        });

        // ✅ Add feedback to list instantly
        setFeedbacks((prev) => [
          {
            Username: username,
            Email: email,
            Feedback: feedback,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ]);

        // Clear form fields
        setemail("");
        setusername("");
        setfeedback("");
      } else {
        toast.error("Failed to submit. Try Again", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {

      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    setloading(false);
  }
  return (
    <>
      <ToastContainer />
      <h2 className="bg-slate-800 bree-bold m-2 text-3xl text-white p-4 text-center">
        User Feedback Section
      </h2>
      <div className="md:flex  p-4">
        <div className=" flex bg-gray-100 flex-col gap-8 py-8 border-black border-3 md:w-[37%] max-h-fit">
          <h2 className="mx-4 roboto-bold text-3xl">Give Your Feedback</h2>

          <form>
            <div className="flex flex-col gap-4 mx-4">
              {/* Username Field */}
              <div className="flex flex-col items-start gap-2 ">
                <label htmlFor="username" className="text-2xl">
                  Enter your Username:
                </label>
                <input
                  value={username}
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                  required
                  type="text"
                  id="username"
                  className="border-black border-2 bg-white outline-none focus:scale-103 transition-all ease-in-out duration-300 px-3 py-2 w-full md:w-80 roboto-semi"
                  placeholder="Enter your Username"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="email" className="text-2xl">
                  Enter your Email:
                </label>
                <input
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  required
                  placeholder="Enter your Email"
                  type="email"
                  id="email"
                  className="border-black border-2 bg-white outline-none focus:scale-103 transition-all ease-in-out duration-300 px-3 py-2 w-full md:w-80 roboto-semi"
                />
              </div>

              {/* Feedback form */}

              <div className="flex flex-col items-start gap-2">
                <label htmlFor="email" className="text-2xl ">
                  <h2> Your Feedback: </h2>
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => {
                    setfeedback(e.target.value);
                  }}
                  required
                  placeholder="Max Length is 400 character!"
                  name="feedback"
                  id="feedback"
                  cols="60"
                  rows={6}
                  maxLength={400}
                  className="bg-white border-black border-2 outline-none focus:scale-102 transition-all ease-in-out duration-300 resize-none p-2 roboto-semi max-w-full md:w-auto "
                ></textarea>
              </div>
              {loading && <Loader />}
              <button
                onClick={handleSubmit}
                title="Submit your Feedback"
                className="bg-gray-900 text-white p-4 cursor-pointer rounded-[6px] roboto-bold text-xl  transition-all ease-in-out duration-300 hover:bg-white hover:text-black  hover:scale-102 "
              >
                Submit now
              </button>
            </div>
          </form>
        </div>
        <div className="mt-4 md:mt-0 md:mx-4 bg-gray-100 flex flex-col gap-4 border-black border-3 py-8 px-4 overflow-y-auto max-h-[613px] w-full md:min-w-[62%] ">
          <h2 className=" roboto-bold text-3xl ">Past User Feedback</h2>
          <h2>Total Feedbacks ({Feedbacks?.length})</h2>
          {Feedbacks?.length === 0 && (
            <div className="flex justify-center item-center md:mt-40 underline text-xl roboto-bold ">
              {" "}
              <h2>No Feedback Found</h2>
            </div>
          )}

          {Feedbacks?.map((items, index) => (
            <div
              key={index}
              className="border border-gray-300 bg-white shadow-md rounded-xl p-5 transition-transform duration-300 hover:scale-[1.0] hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {items.Username}
                </h2>
                <span className="text-sm text-gray-500">
                  {dayjs(items.createdAt).fromNow()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <b>Email:</b> {items.Email}
              </p>
              <p className="text-gray-700 text-base italic">
                “{items.Feedback}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeedbackSection;
