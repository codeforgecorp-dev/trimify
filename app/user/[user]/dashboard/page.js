"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { X, Lock, Sparkles, Copy, Edit3, QrCode, Trash2, BarChart2, Info, ArrowRight, Check, AlertTriangle, Calendar, Clock } from "lucide-react";
import QRCodeGenerator from "@/app/components/QRCodeGenerator";
import Image from "next/image";
import Logout from "@/app/components/Logout";
import AuthWrapper from "@/app/components/AuthWrapper";
import Head from "next/head";
import { useParams } from "next/navigation";
import Upgrade2premium from "@/app/components/Upgrade2premium";

export default function Page() {
  const [data, setdata] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [LongUrl, setLongUrl] = useState("");
  const [ShortName, setShortName] = useState("");
  const [Msg, setMsg] = useState("");
  const [On, setOn] = useState(false);
  const [ActiveModalShortName, setActiveModalShortName] = useState("");
  const [showDeleteConfirmation, setshowDeleteConfirmation] = useState(false);
  const [showPersonalDetails, setshowPersonalDetails] = useState(false);
  const [personalDetails, setpersonalDetails] = useState();
  const [showEditBox, setshowEditBox] = useState(false);
  const [changeUsername, setchangeUsername] = useState(false);
  const [newUsername, setnewUsername] = useState("");
  const [showMoreFeature, setshowMoreFeature] = useState(false);
  const [isPremium, setisPremium] = useState(false);
  const [addUTMTracking, setaddUTMTracking] = useState(false);
  const [utmSource, setutmSource] = useState("");
  const [showSources, setshowSources] = useState(false);
  const [utmMedium, setutmMedium] = useState("");
  const [showMediums, setshowMediums] = useState(false);
  const [utmCampaign, setutmCampaign] = useState("");
  const [showLinkRules, setshowLinkRules] = useState(false);
  const [expiryDate, setexpiryDate] = useState();
  const [expiryConfirmed, setExpiryConfirmed] = useState(false);
  const [maxClick, setmaxClick] = useState("");
  const [showDateError, setshowDateError] = useState(false);
  const [showMaxNumberError, setshowMaxNumberError] = useState();
  const [infoBox, setinfoBox] = useState(false);
  const [showPasswordBox, setshowPasswordBox] = useState(false);
  const [showPasswordError, setshowPasswordError] = useState("");
  const [passwordConfirmed, setpasswordConfirmed] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [newshortName, setnewshortName] = useState(null);
  const [utmnewSource, setutmnewSource] = useState(null);
  const [utmnewMedium, setutmnewMedium] = useState(null);
  const [utmnewCampaign, setutmnewCampaign] = useState(null);
  const [expireAt, setexpireAt] = useState(null);
  const [newmaxClicks, setnewmaxClicks] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showConflictError, setshowConflictError] = useState(false);
  const [showLenghtError, setshowLenghtError] = useState(false);
  const [showUpgradeBox, setshowUpgradeBox] = useState(false);

  const [changeShortName, setChangeShortName] = useState(false);
  const [changeUtmSource, setChangeUtmSource] = useState(false);
  const [changeUtmMedium, setChangeUtmMedium] = useState(false);
  const [changeUtmCampaign, setChangeUtmCampaign] = useState(false);
  const [changeExpireAt, setChangeExpireAt] = useState(false);
  const [changeMaxClicks, setChangeMaxClicks] = useState(false);
  const [showexpiryDateError, setshowexpiryDateError] = useState(false);
  const hasUTM =
    selectedItem?.utm?.source ||
    selectedItem?.utm?.medium ||
    selectedItem?.utm?.campaign;

  const [Editing, setEditing] = useState(false);
  const [linkID, setlinkID] = useState("");
  const params = useParams();
  const username = params.user;
  const utmSources = [
    "google",
    "facebook",
    "instagram",
    "twitter",
    "linkedin",
    "youtube",
    "email",
    "newsletter",
    "direct",
    "referral",
    "other",
  ];
  const utmMediums = [
    "cpc",
    "organic",
    "social",
    "email",
    "referral",
    "display",
    "affiliate",
    "sms",
    "push",
    "other",
  ];

  async function fetchData() {
    setLoading(true);
    try {
      let a = await fetch(`/api/userdata/${username}`);
      let user = await a.json();
      setdata(user.data || []);
      setisPremium(user.isPremium);
    } catch {
      toast.error("Failed to load your URLs", {
        position: "top-right",
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [username]);

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const handleDelete = async (shortName) => {
    try {
      let a = await fetch(`/api/userdata/${username}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ShortName: shortName }),
      });
      let response = await a.json();
      if (response.success) {
        toast.success("Link deleted successfully", {
          position: "top-right",
          autoClose: 1000,
        });
        setdata(data.filter((item) => item.ShortName !== shortName));
      }
    } catch {
      toast.error("Failed to delete link", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const handleDeleteAll = async () => {
    try {
      let a = await fetch(`/api/userdata/${username}?deleteAll=true`, {
        method: "DELETE",
      });
      let response = await a.json();
      if (response.success) {
        toast.success("All links deleted", {
          position: "top-right",
          autoClose: 1000,
        });
        setdata([]);
        setshowDeleteConfirmation(false);
      }
    } catch {
      toast.error("Failed to delete all links", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  async function GenerateUrl() {
    if (!LongUrl.trim()) {
      toast.warn("Please enter long URL", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    let formattedUrl = LongUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = "https://" + formattedUrl;
    }

    if (!isValidURL(formattedUrl)) {
      toast.error("Invalid URL format", { position: "top-right", autoClose: 1000 });
      return;
    }

    setLoading(true);

    try {
      let Time = Date.now();
      let time = new Date(Time).toLocaleTimeString();
      let date = new Date(Time).toLocaleDateString();

      const response = await fetch(`/api/userdata/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          LongUrl: formattedUrl,
          ShortName: ShortName,
          time: time,
          date: date,
          utmSource: utmSource,
          utmMedium: utmMedium,
          utmCampaign: utmCampaign,
          expiryDate: expiryDate,
          maxClicks: maxClick,
          password: password,
        }),
      });

      const result = await response.json();

      if (result.conflict) {
        toast.error("Short name already in use. Pick another!", {
          position: "top-right",
          autoClose: 1000,
        });
        return;
      }

      if (result.success) {
        toast.success("Short link created successfully!", {
          position: "top-right",
          autoClose: 1000,
        });

        setExpiryConfirmed(false);
        setpasswordConfirmed(false);
        setpassword("");
        setconfirmPassword("");
        setutmCampaign("");
        setutmMedium("");
        setutmSource("");
        setaddUTMTracking(false);
        setshowMoreFeature(false);

        const newUrl = {
          LongUrl: LongUrl,
          ShortName: ShortName,
          fullShortUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/${ShortName}`,
          date: date,
          time: time,
          createdAt: new Date().toISOString(),
        };
        setdata((prevData) => [newUrl, ...prevData]);

        setOn(false);
        setMsg("");
        setTimeout(() => {
          setMsg(result.fullShortUrl);
          setOn(true);
        }, 0);

        setLongUrl("");
        setShortName("");
      }
    } catch {
      toast.warn("Server error. Try again later.", {
        position: "top-right",
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
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

  async function handleEditCancel() {
    setshowLenghtError(false);
    setshowConflictError(false);
    setshowexpiryDateError(false);
    setChangeExpireAt(false);
    setChangeMaxClicks(false);
    setChangeUtmCampaign(false);
    setChangeUtmMedium(false);
    setChangeUtmSource(false);
    setChangeShortName(false);
    setshowEditBox(false);
    setnewmaxClicks(null);
    setnewshortName(null);
    setutmnewCampaign(null);
    setutmnewMedium(null);
    setexpireAt(null);
    setutmnewSource(null);
    setEditingItem(null);
  }

  async function handleUpdate(id, ShortName) {
    setshowexpiryDateError(false);
    setshowConflictError(false);
    setshowLenghtError(false);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(expireAt);
    selectedDate.setHours(0, 0, 0, 0);
    if (!newshortName || newshortName.length <= 0) {
      setshowLenghtError(true);
      return;
    }
    if (expireAt !== null && selectedDate < today) {
      setshowexpiryDateError(true);
      return;
    }

    try {
      setLoading(true);
      let req2updateData = await fetch(`/api/userdata/${username}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          linkid: id,
          shortName: newshortName,
          newexpireAt: expireAt,
          utmCampaign: utmnewCampaign,
          utmSource: utmnewSource,
          utmMedium: utmnewMedium,
          maxClicks: newmaxClicks,
        }),
      });
      let response = await req2updateData.json();
      if (response.conflict) {
        setshowConflictError(true);
        return;
      }
      if (response.success) {
        toast.success("Link updated successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
        handleEditCancel();
        fetchData();
      }
    } catch {
      toast.error("Failed to update link");
    } finally {
      setLoading(false);
    }
  }

  async function getPersonaDetails() {
    try {
      let personalDetails2 = await fetch(
        `/api/userdata/${username}?personalDetails=true`
      );
      let response = await personalDetails2.json();
      setpersonalDetails(response.detailObject);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (showPersonalDetails) getPersonaDetails();
  }, [showPersonalDetails]);

  async function changeUserName() {
    if (!newUsername.trim()) {
      toast.warn("Please enter a valid username", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    try {
      const response = await fetch(
        `/api/userdata/${username}?changeUsername=true`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Username: newUsername.trim() }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("Username updated! Please log in again.", {
          position: "top-right",
          autoClose: 1000,
        });
        localStorage.removeItem("Token");
        setchangeUsername(false);
        window.location.href = "/login";
      } else {
        toast.error(result?.error || "Failed to update username", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch {
      toast.error("Server error while changing username", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }

  async function handleMoreFeatures() {
    if (ShortName === "" || LongUrl === "") {
      toast.error("Please fill both URL and Short Name fields first", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }
    setshowMoreFeature(!showMoreFeature);
  }

  async function handleDone() {
    setshowDateError(false);
    setshowMaxNumberError(false);

    if (expiryDate) {
      const selectedDate = new Date(expiryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        setshowDateError(true);
        return;
      }
    }

    if (maxClick !== "" && Number(maxClick) <= 0) {
      setshowMaxNumberError(true);
      return;
    }

    setshowLinkRules(false);
    setExpiryConfirmed(true);
  }

  async function handlePassword() {
    setshowPasswordError("");
    if (password !== confirmPassword) {
      setshowPasswordError("Passwords do not match");
      return;
    } else if (password.length < 6 || password.includes(" ")) {
      setshowPasswordError("Password must be 6+ characters without spaces");
      return;
    }
    setpasswordConfirmed(true);
    setshowPasswordBox(false);
  }

  async function handleRemovePassword() {
    setpassword("");
    setconfirmPassword("");
    setpasswordConfirmed(false);
  }

  async function handleRemoveRules() {
    setexpiryDate("");
    setmaxClick("");
    setExpiryConfirmed(false);
  }

  const renderUTMValue = (value) => (value ? value : "(Not Set)");

  function truncateUrl(url, maxLength = 60) {
    if (url?.length <= maxLength) return url;
    const start = url?.slice(0, 40);
    const end = url?.slice(-18);
    return `${start}…${end}`;
  }

  return (
    <>
      <ToastContainer className="pt-16" />
      <Logout
        username={username}
        setshowDeleteConfirmation={setshowDeleteConfirmation}
        setshowPersonalDetails={setshowPersonalDetails}
      />
      <AuthWrapper username={username} />

      <Head>
        <title>Control Room - Trimify</title>
        <meta
          name="description"
          content="Create custom links, build campaign tracking, and manage link security."
        />
      </Head>

      <div className="min-h-[calc(100vh-64px)] w-full bg-halftone-warm p-3 sm:p-6 select-none">
        <div className="max-w-6xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-5 sm:p-8 md:p-10 flex flex-col gap-8">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b-3 border-black">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FACC15] text-black font-bungee text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-1deg] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMMAND CENTER</span>
              </div>
              <h1 className="font-bungee text-2xl sm:text-4xl text-black tracking-tight drop-shadow-[2px_2px_0px_#FACC15]">
                TRIMIFY CONTROL ROOM
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bungee text-xs uppercase px-3 py-1.5 bg-black text-white border-2 border-black shadow-[2px_2px_0px_#EF4444]">
                USER: @{username}
              </span>
              {isPremium && (
                <span className="font-bungee text-xs uppercase px-3 py-1.5 bg-[#EF4444] text-white border-2 border-black shadow-[2px_2px_0px_#000] animate-wiggle">
                  PRO MEMBER
                </span>
              )}
            </div>
          </div>

          {/* ================= LINK CREATOR FORM ================= */}
          <div className="p-5 sm:p-6 bg-[#FFFBEB] border-3 border-black shadow-[5px_5px_0px_#000] flex flex-col gap-4">
            <h2 className="font-bungee text-lg sm:text-xl text-black flex items-center gap-2">
              <span>CREATE NEW SHORT LINK</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
              {/* Long URL Input */}
              <div className="md:col-span-6">
                <input
                  aria-label="Enter the long URL"
                  type="url"
                  autoComplete="on"
                  autoFocus
                  className="w-full p-3.5 bg-white border-2 border-black font-bold text-black text-sm placeholder:text-black/40 focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
                  placeholder="Paste long URL (e.g. https://my-site.com)"
                  value={LongUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                />
              </div>

              {/* Short Name Input */}
              <div className="md:col-span-3">
                <input
                  aria-label="Enter the Short Name"
                  type="text"
                  autoComplete="off"
                  className="w-full p-3.5 bg-white border-2 border-black font-bold text-black text-sm placeholder:text-black/40 focus:outline-none shadow-[inset_1px_1px_0px_rgba(0,0,0,0.08)]"
                  placeholder="Custom alias (optional)"
                  value={ShortName}
                  onChange={(e) => setShortName(e.target.value)}
                />
              </div>

              {/* More Options / Locked Pro Toggles */}
              <div className="md:col-span-3 relative flex gap-2">
                <button
                  type="button"
                  className={`flex-1 brutal-btn bg-white hover:bg-[#FFFDF0] text-black py-3 px-3 font-bungee text-xs tracking-wider flex items-center justify-center gap-1.5 cursor-pointer ${
                    !isPremium ? "opacity-75" : ""
                  }`}
                  onClick={handleMoreFeatures}
                >
                  <span>MORE OPTIONS</span>
                  <span className="text-xs">▼</span>
                </button>

                {!isPremium && (
                  <div
                    onClick={() => setshowUpgradeBox(true)}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-xs border-2 border-black font-bungee text-xs text-black cursor-pointer shadow-[2px_2px_0px_#000]"
                  >
                    <Lock className="w-4 h-4 mr-1 text-[#EF4444]" />
                    <span>UNLOCK PRO</span>
                  </div>
                )}

                {/* More Options Dropdown */}
                {showMoreFeature && (
                  <ul className="absolute top-full mt-2 left-0 right-0 z-30 bg-white border-3 border-black shadow-[5px_5px_0px_#000] p-1.5 flex flex-col gap-1 animate-slideDown">
                    <li>
                      <button
                        type="button"
                        className="w-full text-left p-2 font-space text-xs font-bold text-black hover:bg-[#FEF3C7] cursor-pointer"
                        onClick={() => {
                          setaddUTMTracking(!addUTMTracking);
                          setshowMoreFeature(false);
                        }}
                      >
                        🎯 Add UTM Campaign
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="w-full text-left p-2 font-space text-xs font-bold text-black hover:bg-[#FEF3C7] cursor-pointer"
                        onClick={() => {
                          setshowLinkRules(!showLinkRules);
                          setshowMoreFeature(false);
                        }}
                      >
                        ⏱️ Expiry & Click Limits
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="w-full text-left p-2 font-space text-xs font-bold text-black hover:bg-[#FEF3C7] cursor-pointer"
                        onClick={() => {
                          setshowPasswordBox(!showPasswordBox);
                          setshowMoreFeature(false);
                        }}
                      >
                        🔒 Password Protection
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Active Rules Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {expiryConfirmed && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#22C55E] text-black border-2 border-black font-space text-xs font-bold shadow-[2px_2px_0px_#000]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Expiry rule set</span>
                  <button
                    type="button"
                    onClick={handleRemoveRules}
                    className="ml-1 px-1.5 bg-black text-white hover:bg-[#DC2626] text-[10px] uppercase font-bungee"
                  >
                    Remove
                  </button>
                </div>
              )}

              {passwordConfirmed && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FACC15] text-black border-2 border-black font-space text-xs font-bold shadow-[2px_2px_0px_#000]">
                  <Lock className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Password protected</span>
                  <button
                    type="button"
                    onClick={handleRemovePassword}
                    className="ml-1 px-1.5 bg-black text-white hover:bg-[#DC2626] text-[10px] uppercase font-bungee"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* UTM Tracking Fields */}
            {addUTMTracking && (
              <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000] flex flex-col gap-3">
                <span className="font-bungee text-xs text-black uppercase">
                  UTM CAMPAIGN BUILDER
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <input
                      placeholder="UTM Source (e.g. google)"
                      value={utmSource}
                      onChange={(e) => setutmSource(e.target.value)}
                      className="w-full p-2.5 bg-[#FFFDF0] border-2 border-black text-xs font-bold"
                    />
                  </div>
                  <div className="relative">
                    <input
                      placeholder="UTM Medium (e.g. social)"
                      value={utmMedium}
                      onChange={(e) => setutmMedium(e.target.value)}
                      className="w-full p-2.5 bg-[#FFFDF0] border-2 border-black text-xs font-bold"
                    />
                  </div>
                  <div className="relative">
                    <input
                      placeholder="UTM Campaign (e.g. promo2025)"
                      value={utmCampaign}
                      onChange={(e) => setutmCampaign(e.target.value)}
                      className="w-full p-2.5 bg-[#FFFDF0] border-2 border-black text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Create Button */}
            <button
              onClick={GenerateUrl}
              disabled={Loading}
              className="w-full sm:w-auto self-end brutal-btn brutal-btn-yellow py-3.5 px-8 font-bungee text-sm tracking-wider cursor-pointer disabled:opacity-50"
            >
              <span>{Loading ? "CREATING..." : "CREATE SHORT LINK NOW ⚡"}</span>
            </button>
          </div>

          {/* ================= MODAL: LINK RULES ================= */}
          {showLinkRules && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
              <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col gap-5 animate-slideDown">
                <div className="flex items-center justify-between pb-2 border-b-2 border-black">
                  <h3 className="font-bungee text-lg text-black">LINK EXPIRY RULES</h3>
                  <button
                    onClick={() => setshowLinkRules(false)}
                    className="p-1 hover:bg-[#EF4444] hover:text-white border border-black"
                  >
                    <X className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

                <div className="space-y-3 font-space text-xs sm:text-sm font-bold">
                  <div>
                    <label className="block font-bungee text-xs uppercase mb-1">
                      Expiry Date:
                    </label>
                    <input
                      type="date"
                      onChange={(e) => setexpiryDate(e.target.value)}
                      className="w-full p-2.5 bg-[#FFFDF0] border-2 border-black font-bold"
                    />
                    <p className="text-[11px] text-black/60 mt-1">
                      Link expires automatically at 12:00 AM on selected date.
                    </p>
                    {showDateError && (
                      <p className="text-[#DC2626] text-xs font-bold mt-1">
                        Please select a future date.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-bungee text-xs uppercase mb-1">
                      Max Clicks (Optional):
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 50"
                      value={maxClick}
                      onChange={(e) => setmaxClick(e.target.value)}
                      className="w-full p-2.5 bg-[#FFFDF0] border-2 border-black font-bold"
                    />
                    {showMaxNumberError && (
                      <p className="text-[#DC2626] text-xs font-bold mt-1">
                        Must be a positive number.
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      setshowLinkRules(false);
                      setshowDateError(false);
                      setshowMaxNumberError(false);
                    }}
                    className="brutal-btn bg-white px-4 py-2 font-bungee text-xs"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleDone}
                    className="brutal-btn brutal-btn-yellow px-5 py-2 font-bungee text-xs"
                  >
                    APPLY RULES
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= MODAL: PASSWORD PROTECTION ================= */}
          {showPasswordBox && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
              <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col gap-5 animate-slideDown">
                <div className="flex items-center justify-between pb-2 border-b-2 border-black">
                  <h3 className="font-bungee text-lg text-black">LINK PASSWORD</h3>
                  <button
                    onClick={() => setshowPasswordBox(false)}
                    className="p-1 hover:bg-[#EF4444] hover:text-white border border-black"
                  >
                    <X className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

                <div className="space-y-3 font-space text-xs sm:text-sm font-bold">
                  <div>
                    <label className="block font-bungee text-xs uppercase mb-1">
                      Set Password:
                    </label>
                    <input
                      type="password"
                      placeholder="Min 6 characters"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      className="w-full p-2.5 bg-[#FFFDF0] border-2 border-black font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bungee text-xs uppercase mb-1">
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                      className="w-full p-2.5 bg-[#FFFDF0] border-2 border-black font-bold"
                    />
                  </div>
                  {showPasswordError && (
                    <p className="text-[#DC2626] text-xs font-bold">
                      {showPasswordError}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      setshowPasswordBox(false);
                      setshowPasswordError("");
                      setpassword("");
                      setconfirmPassword("");
                    }}
                    className="brutal-btn bg-white px-4 py-2 font-bungee text-xs"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handlePassword}
                    className="brutal-btn brutal-btn-yellow px-5 py-2 font-bungee text-xs"
                  >
                    SAVE PASSWORD
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= URLS LIST ================= */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bungee text-xl sm:text-2xl text-black">
                YOUR MANAGED LINKS ({data?.length || 0})
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {data?.length > 0 &&
                data.map((items, index) => {
                  let domain = "trimy.me";
                  try {
                    domain = new URL(items.LongUrl).hostname.replace("www.", "").trim();
                  } catch {}

                  return (
                    <div
                      key={index}
                      className="bg-[#FFFDF0] border-3 border-black shadow-[4px_4px_0px_#000] p-4 sm:p-5 flex flex-col gap-4 hover:-translate-y-0.5 transition-transform"
                    >
                      {/* Top Row: Domain & Action Buttons */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-black/15">
                        <div className="flex items-center gap-2.5">
                          <Image
                            src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`}
                            className="w-7 h-7 border border-black"
                            width={28}
                            height={28}
                            alt="favicon"
                          />
                          <span className="font-bungee text-sm sm:text-base text-black">
                            {domain}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            className="p-1.5 bg-white border border-black shadow-[1px_1px_0px_#000] hover:bg-[#FEF3C7] cursor-pointer"
                            title="Link Info"
                            onClick={() => {
                              setSelectedItem(items);
                              setinfoBox(true);
                            }}
                          >
                            <Info className="w-4 h-4 text-black" />
                          </button>

                          <button
                            type="button"
                            className="px-2.5 py-1 bg-[#FACC15] border border-black shadow-[1px_1px_0px_#000] hover:bg-[#FDE047] font-bungee text-xs text-black flex items-center gap-1 cursor-pointer"
                            onClick={() => handleCopy(items.fullShortUrl)}
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>COPY</span>
                          </button>

                          <button
                            type="button"
                            data-testid="edit-link-btn"
                            className="px-2.5 py-1 bg-white border border-black shadow-[1px_1px_0px_#000] hover:bg-gray-100 font-bungee text-xs text-black flex items-center gap-1 cursor-pointer"
                            onClick={() => {
                              setEditingItem(items);
                              setshowEditBox(true);
                            }}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>EDIT</span>
                          </button>

                          <button
                            type="button"
                            className="px-2.5 py-1 bg-white border border-black shadow-[1px_1px_0px_#000] hover:bg-gray-100 font-bungee text-xs text-black flex items-center gap-1 cursor-pointer"
                            onClick={() => setActiveModalShortName(items.LongUrl)}
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>QR</span>
                          </button>

                          <button
                            type="button"
                            className="px-2.5 py-1 bg-[#EF4444] text-white border border-black shadow-[1px_1px_0px_#000] hover:bg-[#DC2626] font-bungee text-xs flex items-center gap-1 cursor-pointer"
                            onClick={() => handleDelete(items.ShortName)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>DELETE</span>
                          </button>
                        </div>
                      </div>

                      {/* Middle: Short & Long URLs */}
                      <div className="flex flex-col gap-1">
                        <Link
                          href={items.fullShortUrl}
                          target="_blank"
                          className="font-bungee text-base sm:text-lg text-[#EF4444] hover:text-black underline break-all"
                        >
                          {items.fullShortUrl}
                        </Link>
                        <Link
                          href={items.LongUrl}
                          target="_blank"
                          className="font-space text-xs sm:text-sm font-bold text-black/60 hover:text-black truncate"
                        >
                          {truncateUrl(items.LongUrl)}
                        </Link>
                      </div>

                      {/* Bottom Row: Analytics & Date */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-black/10 text-xs font-space font-bold text-black/75">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/user/${username}/analytics/${items.ShortName}?username=${username}`}
                            className="brutal-btn bg-black text-[#FACC15] hover:bg-white hover:text-black px-3 py-1.5 font-bungee text-[11px]"
                          >
                            VIEW ANALYTICS 📊
                          </Link>

                          <div className="flex items-center gap-1 text-[11px]">
                            <Calendar className="w-3.5 h-3.5 text-black/50" />
                            <span>{items.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="font-bungee text-[11px] text-black">CLICKS:</span>
                          <span className="px-2 py-0.5 bg-[#FACC15] text-black border border-black font-bungee text-xs shadow-[1px_1px_0px_#000]">
                            {items.clicks ?? 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {(!data || data.length === 0) && (
                <div className="p-12 text-center bg-[#FFFDF0] border-2 border-dashed border-black/30">
                  <h3 className="font-bungee text-base text-black/50">
                    NO LINKS CREATED YET. TRIM YOUR FIRST URL ABOVE!
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= MODAL: EDIT LINK ================= */}
        {showEditBox && editingItem && (
          <div data-testid="edit-link-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-lg bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 max-h-[85vh] overflow-y-auto flex flex-col gap-5 animate-slideDown">
              <div className="flex items-center justify-between pb-2 border-b-2 border-black">
                <h3 className="font-bungee text-lg text-black">EDIT LINK</h3>
                <button
                  onClick={handleEditCancel}
                  className="p-1 hover:bg-[#EF4444] hover:text-white border border-black"
                >
                  <X className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

              {/* Short Name Edit */}
              <div className="space-y-1 font-space">
                <label className="block font-bungee text-xs uppercase mb-1">
                  Short Alias:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 p-2.5 bg-[#FFFDF0] border-2 border-black font-bold text-xs sm:text-sm"
                    value={changeShortName ? newshortName : editingItem.ShortName || ""}
                    onChange={(e) => setnewshortName(e.target.value)}
                  />
                  {!changeShortName && (
                    <button
                      className="brutal-btn bg-[#FACC15] px-3 font-bungee text-xs"
                      onClick={() => {
                        setnewshortName(editingItem.ShortName || "");
                        setChangeShortName(true);
                      }}
                    >
                      EDIT
                    </button>
                  )}
                </div>
                {showLenghtError && <p className="text-[#DC2626] text-xs font-bold">Alias cannot be empty</p>}
                {showConflictError && <p className="text-[#DC2626] text-xs font-bold">Alias already taken</p>}
              </div>

              {/* UTM Info Edit */}
              <div className="space-y-2 font-space pt-2 border-t border-black/15">
                <span className="block font-bungee text-xs uppercase">Campaign UTMs:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <span className="text-[10px] font-bold block mb-1">Source</span>
                    <input
                      value={changeUtmSource ? utmnewSource : editingItem.utm?.source || ""}
                      disabled={!changeUtmSource}
                      onChange={(e) => setutmnewSource(e.target.value)}
                      className="w-full p-2 bg-[#FFFDF0] border-2 border-black text-xs font-bold"
                    />
                    {!changeUtmSource && (
                      <button
                        className="mt-1 w-full text-[10px] font-bungee py-1 bg-black text-white"
                        onClick={() => {
                          setutmnewSource(editingItem.utm?.source || "");
                          setChangeUtmSource(true);
                        }}
                      >
                        CHANGE
                      </button>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold block mb-1">Medium</span>
                    <input
                      value={changeUtmMedium ? utmnewMedium : editingItem.utm?.medium || ""}
                      disabled={!changeUtmMedium}
                      onChange={(e) => setutmnewMedium(e.target.value)}
                      className="w-full p-2 bg-[#FFFDF0] border-2 border-black text-xs font-bold"
                    />
                    {!changeUtmMedium && (
                      <button
                        className="mt-1 w-full text-[10px] font-bungee py-1 bg-black text-white"
                        onClick={() => {
                          setutmnewMedium(editingItem.utm?.medium || "");
                          setChangeUtmMedium(true);
                        }}
                      >
                        CHANGE
                      </button>
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold block mb-1">Campaign</span>
                    <input
                      value={changeUtmCampaign ? utmnewCampaign : editingItem.utm?.campaign || ""}
                      disabled={!changeUtmCampaign}
                      onChange={(e) => setutmnewCampaign(e.target.value)}
                      className="w-full p-2 bg-[#FFFDF0] border-2 border-black text-xs font-bold"
                    />
                    {!changeUtmCampaign && (
                      <button
                        className="mt-1 w-full text-[10px] font-bungee py-1 bg-black text-white"
                        onClick={() => {
                          setutmnewCampaign(editingItem.utm?.campaign || "");
                          setChangeUtmCampaign(true);
                        }}
                      >
                        CHANGE
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t-2 border-black">
                <button
                  className="brutal-btn bg-white px-4 py-2 font-bungee text-xs"
                  onClick={handleEditCancel}
                >
                  CANCEL
                </button>
                <button
                  className="brutal-btn brutal-btn-yellow px-5 py-2 font-bungee text-xs"
                  onClick={() => handleUpdate(editingItem._id, editingItem.ShortName)}
                  disabled={Loading}
                >
                  {Loading ? "SAVING..." : "SAVE CHANGES"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODAL: LINK DETAILS ================= */}
        {infoBox && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col gap-4 animate-slideDown">
              <div className="flex items-center justify-between pb-2 border-b-2 border-black">
                <h3 className="font-bungee text-lg text-black">LINK METADATA</h3>
                <button
                  onClick={() => setinfoBox(false)}
                  className="p-1 hover:bg-[#EF4444] hover:text-white border border-black"
                >
                  <X className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

              <div className="space-y-3 font-space text-xs sm:text-sm font-bold">
                <div>
                  <span className="font-bungee text-[11px] block mb-1">Source / Medium / Campaign:</span>
                  <div className="p-2.5 bg-[#FFFDF0] border-2 border-black">
                    {selectedItem.utm?.source || selectedItem.utm?.medium || selectedItem.utm?.campaign
                      ? `${selectedItem.utm?.source || "none"} / ${selectedItem.utm?.medium || "none"} / ${selectedItem.utm?.campaign || "none"}`
                      : "(Not Configured)"}
                  </div>
                </div>

                <div>
                  <span className="font-bungee text-[11px] block mb-1">Expiration Schedule:</span>
                  <div className="p-2.5 bg-[#FFFDF0] border-2 border-black">
                    {selectedItem.expireAt
                      ? new Date(selectedItem.expireAt).toLocaleDateString()
                      : "Never Expires"}
                  </div>
                </div>

                <div>
                  <span className="font-bungee text-[11px] block mb-1">Created At:</span>
                  <div className="p-2.5 bg-[#FFFDF0] border-2 border-black">
                    {new Date(selectedItem.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <button
                className="brutal-btn bg-black text-[#FACC15] py-2 px-4 font-bungee text-xs self-end mt-2"
                onClick={() => setinfoBox(false)}
              >
                CLOSE
              </button>
            </div>
          </div>
        )}

        {/* ================= MODAL: QR CODE ================= */}
        {ActiveModalShortName && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col gap-4 animate-slideDown">
              <div className="flex items-center justify-between pb-2 border-b-2 border-black">
                <h3 className="font-bungee text-lg text-black">EXPORT QR CODE</h3>
                <button
                  onClick={() => setActiveModalShortName("")}
                  className="p-1 hover:bg-[#EF4444] hover:text-white border border-black"
                >
                  <X className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

              <QRCodeGenerator ShortName={ActiveModalShortName} />
            </div>
          </div>
        )}

        {/* ================= MODAL: DELETE ALL CONFIRMATION ================= */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col gap-4 animate-slideDown">
              <div className="flex items-center gap-2 text-[#DC2626]">
                <AlertTriangle className="w-6 h-6 stroke-[3]" />
                <h3 className="font-bungee text-lg">DELETE ALL LINKS?</h3>
              </div>
              <p className="font-space text-xs sm:text-sm font-bold text-black/80">
                This action is destructive and irreversible. All shortened links and click analytics will be permanently erased.
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  className="brutal-btn bg-white px-4 py-2 font-bungee text-xs"
                  onClick={() => setshowDeleteConfirmation(false)}
                >
                  CANCEL
                </button>
                <button
                  className="brutal-btn brutal-btn-red px-5 py-2 font-bungee text-xs"
                  onClick={handleDeleteAll}
                >
                  DELETE ALL PERMANENTLY
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODAL: PERSONAL DETAILS ================= */}
        {showPersonalDetails && personalDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-8 flex flex-col gap-5 animate-slideDown">
              <div className="flex items-center justify-between pb-2 border-b-2 border-black">
                <h3 className="font-bungee text-lg text-black">ACCOUNT PROFILE</h3>
                <button
                  onClick={() => setshowPersonalDetails(false)}
                  className="p-1 hover:bg-[#EF4444] hover:text-white border border-black"
                >
                  <X className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

              <div className="space-y-3 font-space text-xs sm:text-sm font-bold">
                <div>
                  <span className="font-bungee text-[11px] block mb-1">Username:</span>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 p-2 bg-[#FFFDF0] border-2 border-black font-bold"
                      value={changeUsername ? newUsername : personalDetails.Username}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\s/g, "");
                        setnewUsername(val);
                      }}
                      disabled={!changeUsername}
                      placeholder="Username (no spaces)"
                    />
                    <button
                      className="brutal-btn bg-[#FACC15] px-3 font-bungee text-xs"
                      onClick={changeUsername ? changeUserName : () => setchangeUsername(true)}
                    >
                      {changeUsername ? "SAVE" : "EDIT"}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="font-bungee text-[11px] block mb-1">Email:</span>
                  <div className="p-2 bg-[#FFFDF0] border-2 border-black">{personalDetails.Email}</div>
                </div>

                <div>
                  <span className="font-bungee text-[11px] block mb-1">Account Tier:</span>
                  <div className="p-2 bg-[#FEF3C7] border-2 border-black font-bungee">
                    {personalDetails.isPremium ? "PRO LIFETIME" : "BASIC STARTER"}
                  </div>
                </div>

                <div>
                  <span className="font-bungee text-[11px] block mb-1">Total Links Shortened:</span>
                  <div className="p-2 bg-[#FFFDF0] border-2 border-black">{personalDetails.totalLinks || 0}</div>
                </div>
              </div>

              <button
                className="brutal-btn bg-black text-[#FACC15] py-2 px-4 font-bungee text-xs self-end mt-2"
                onClick={() => setshowPersonalDetails(false)}
              >
                CLOSE
              </button>
            </div>
          </div>
        )}

        {showUpgradeBox && <Upgrade2premium setshowUpgradeBox={setshowUpgradeBox} />}
      </div>
    </>
  );
}
