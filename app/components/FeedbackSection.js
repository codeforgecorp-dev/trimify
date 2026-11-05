"use client";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Loader from "./Loader";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { MessageSquare, Send, Sparkles, User, Mail, MessageCircle } from "lucide-react";

const FeedbackSection = ({ pageNo }) => {
  const [Feedbacks, setFeedbacks] = useState();
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [feedback, setfeedback] = useState("");
  const [loading, setloading] = useState(false);
  dayjs.extend(relativeTime);

  useEffect(() => {
    async function getFeedback() {
      try {
        let request = await fetch(`/api/blog?blogPageNo=${pageNo}`);
        let result = await request.json();
        if (result.success === true) {
          setFeedbacks(result.Feedback);
        }
      } catch (err) {
        console.error("Feedback fetch error:", err);
      }
    }
    getFeedback();
  }, [pageNo]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.trim().length < 4) {
      toast.warn("Username must be at least 4 characters", {
        position: "top-right",
        autoClose: 2500,
      });
      return;
    }
    if (email.trim().length < 8) {
      toast.warn("Please enter a valid email address", {
        position: "top-right",
        autoClose: 2500,
      });
      return;
    }
    if (feedback.trim().length < 20) {
      toast.warn("Feedback must be at least 20 characters", {
        position: "top-right",
        autoClose: 2500,
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
          Username: username.trim(),
          Email: email.trim(),
          Feedback: feedback.trim(),
          blogPageNo: pageNo,
        }),
      });

      let response = await a.json();

      if (response.status === 200 || response.success) {
        toast.success("Feedback submitted successfully!", {
          position: "top-right",
          autoClose: 2500,
        });

        setFeedbacks((prev) => [
          {
            Username: username.trim(),
            Email: email.trim(),
            Feedback: feedback.trim(),
            createdAt: new Date().toISOString(),
          },
          ...(prev || []),
        ]);

        setemail("");
        setusername("");
        setfeedback("");
      } else {
        toast.error("Failed to submit. Try again", {
          position: "top-right",
          autoClose: 2500,
        });
      }
    } catch {
      toast.error("Network error! Try again later", {
        position: "top-right",
        autoClose: 2500,
      });
    }

    setloading(false);
  }

  return (
    <section className="w-full my-12 select-none">
      <ToastContainer className="pt-16" />

      {/* Section Header */}
      <div className="bg-[#0A0A0A] border-3 border-black text-[#FACC15] p-4 text-center mb-6 shadow-[4px_4px_0px_#EF4444]">
        <h2 className="font-bungee text-2xl sm:text-3xl tracking-wide flex items-center justify-center gap-2">
          <MessageCircle className="w-6 h-6 stroke-[2.5]" />
          <span>COMMUNITY FEEDBACK</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container (Col 1-5) */}
        <div className="lg:col-span-5 bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FACC15] border-2 border-black font-bungee text-xs uppercase mb-4 shadow-[2px_2px_0px_#000] rotate-[-1deg]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SHARE THOUGHTS</span>
          </div>

          <h3 className="font-bungee text-xl text-black mb-4">GIVE YOUR FEEDBACK</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block font-bungee text-xs text-black uppercase mb-1">
                Your Username:
              </label>
              <div className="relative">
                <input
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                  type="text"
                  id="username"
                  className="w-full p-3 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
                  placeholder="e.g. AlexMorgan"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-bungee text-xs text-black uppercase mb-1">
                Your Email:
              </label>
              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                placeholder="alex@example.com"
                type="email"
                id="email"
                className="w-full p-3 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm focus:bg-white focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
              />
            </div>

            {/* Feedback Content */}
            <div>
              <label htmlFor="feedback" className="block font-bungee text-xs text-black uppercase mb-1">
                Your Feedback (min 20 chars):
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setfeedback(e.target.value)}
                required
                placeholder="Write your honest comments or questions here..."
                name="feedback"
                id="feedback"
                rows={4}
                maxLength={400}
                className="w-full p-3 bg-[#FFFDF0] border-2 border-black font-bold text-black text-sm focus:bg-white focus:outline-none resize-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
              />
              <span className="text-[11px] font-bold text-black/50 block text-right mt-0.5">
                {feedback.length}/400
              </span>
            </div>

            {loading && <Loader />}

            <button
              type="submit"
              disabled={loading}
              className="w-full brutal-btn brutal-btn-red py-3 font-bungee text-sm tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? "SUBMITTING..." : "SUBMIT FEEDBACK"}</span>
              <Send className="w-4 h-4 stroke-[3]" />
            </button>
          </form>
        </div>

        {/* Feedback List Container (Col 6-12) */}
        <div className="lg:col-span-7 bg-[#FFFBEB] border-4 border-black p-6 shadow-[6px_6px_0px_#000] flex flex-col gap-4 max-h-[640px] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b-2 border-black/20">
            <h3 className="font-bungee text-xl text-black">PAST COMMENTS</h3>
            <span className="px-2.5 py-0.5 bg-[#FACC15] text-black font-black text-xs uppercase border-2 border-black shadow-[1px_1px_0px_#000]">
              {Feedbacks?.length || 0} TOTAL
            </span>
          </div>

          {(!Feedbacks || Feedbacks.length === 0) && (
            <div className="py-12 text-center font-bungee text-black/50 text-base">
              NO FEEDBACK YET. BE THE FIRST TO COMMENT!
            </div>
          )}

          {Feedbacks?.map((item, index) => (
            <div
              key={index}
              className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_#000] flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-bungee text-sm text-black flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#EF4444]" />
                  <span>{item.Username}</span>
                </span>
                <span className="font-space text-[11px] font-bold text-black/50">
                  {dayjs(item.createdAt).fromNow()}
                </span>
              </div>
              <p className="font-space text-xs font-bold text-black/60 truncate">
                {item.Email}
              </p>
              <p className="font-space text-sm font-bold text-black/85 leading-relaxed pt-1 border-t border-black/10">
                "{item.Feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
