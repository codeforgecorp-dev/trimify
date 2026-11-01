"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { X } from "lucide-react";
import QRCodeGenerator from "@/app/components/QRCodeGenerator";
import Image from "next/image";
import Logout from "@/app/components/Logout";
import AuthWrapper from "@/app/components/AuthWrapper";
import Head from "next/head";
import { useParams } from "next/navigation";
import Upgrade2premium from "@/app/components/Upgrade2premium";

export default function Page() {
  const [data, setdata] = useState([]); // Data state
  const [Loading, setLoading] = useState(false);
  // States for input fields and messages
  const [LongUrl, setLongUrl] = useState(""); // State for the long URL input
  const [ShortName, setShortName] = useState(""); // State for the short URL input
  const [Msg, setMsg] = useState(""); // State for the generated short URL message
  const [On, setOn] = useState(false); // State to toggle the display of the short URL
  const [ActiveModalShortName, setActiveModalShortName] = useState("");
  const [showDeleteConfirmation, setshowDeleteConfirmation] = useState(false);
  const [showPersonalDetails, setshowPersonalDetails] = useState(false);
  const [personalDetails, setpersonalDetails] = useState();
  const [showEditBox, setshowEditBox] = useState(false)
  const [changeUsername, setchangeUsername] = useState(false);
  const [newUsername, setnewUsername] = useState("");
  const [showMoreFeature, setshowMoreFeature] = useState(false)
  const [isPremium, setisPremium] = useState(false)
  const [addUTMTracking, setaddUTMTracking] = useState(false)
  const [utmSource, setutmSource] = useState("")
  const [showSources, setshowSources] = useState(false)
  const [utmMedium, setutmMedium] = useState("")
  const [showMediums, setshowMediums] = useState(false)
  const [utmCampaign, setutmCampaign] = useState("")
  const [showLinkRules, setshowLinkRules] = useState(false)
  const [expiryDate, setexpiryDate] = useState()
  const [expiryConfirmed, setExpiryConfirmed] = useState(false);
  const [maxClick, setmaxClick] = useState("")
  const [showDateError, setshowDateError] = useState(false)
  const [showMaxNumberError, setshowMaxNumberError] = useState()
  const [infoBox, setinfoBox] = useState(false)
  const [showPasswordBox, setshowPasswordBox] = useState(false)
  const [showPasswordError, setshowPasswordError] = useState("")
  const [passwordConfirmed, setpasswordConfirmed] = useState(false)
  const [password, setpassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [selectedItem, setSelectedItem] = useState(null)
  const [newshortName, setnewshortName] = useState(null);
  const [utmnewSource, setutmnewSource] = useState(null);
  const [utmnewMedium, setutmnewMedium] = useState(null);
  const [utmnewCampaign, setutmnewCampaign] = useState(null);
  const [expireAt, setexpireAt] = useState(null);
  const [newmaxClicks, setnewmaxClicks] = useState(null)
  const [editingItem, setEditingItem] = useState(null);
  const [showConflictError, setshowConflictError] = useState(false)
  const [showLenghtError, setshowLenghtError] = useState(false)
  const [showUpgradeBox, setshowUpgradeBox] = useState(false) 
  // change button states (separate)
  const [changeShortName, setChangeShortName] = useState(false);
  const [changeUtmSource, setChangeUtmSource] = useState(false);
  const [changeUtmMedium, setChangeUtmMedium] = useState(false);
  const [changeUtmCampaign, setChangeUtmCampaign] = useState(false);
  const [changeExpireAt, setChangeExpireAt] = useState(false);
  const [changeMaxClicks, setChangeMaxClicks] = useState(false);
  const [showexpiryDateError, setshowexpiryDateError] = useState(false)
  const hasUTM =
    selectedItem?.utm?.source ||
    selectedItem?.utm?.medium ||
    selectedItem?.utm?.campaign;

  //Editing States
  const [Editing, setEditing] = useState(false);
  const [linkID, setlinkID] = useState("");
  const params = useParams()
  const username = params.user;
  const utmSources = ["google",
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
  ]
  const utmMediums = [
    "cpc",
    "organic",
    "social",
    "email",
    "referral",
    "display",
    " affiliate",
    "sms",
    "push",
    "other",

  ]
  {
    /*Fetching Data Starts Here*/
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/userdata/${username}`);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data1 = await response.json();
        if (data1.Verification === true) {
          setisPremium(true)
        }
        if (Array.isArray(data1.urls)) {
          setdata(data1.urls); // Update state with fetched data
        } else {
          toast.error("Invalid data format, try again later");
        }
      } catch (error) {
        toast.warn("Server Error, try again later");
      } finally {
        setLoading(false); // Set Loading to false after fetch attempt
      }
    };

    fetchData();
  }, [username]); // Re-fetch when Loading state is set to false
  {
    /*Fetching Data Ends Here*/
  }


  {
    /*handleDelete Starts Here*/
  }
  // Delete URL handler
  const handleDelete = async (item) => {
    try {
      const deleteUrl = await fetch(`/api/userdata/${username}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ShortName: item }),
      });
      const response = await deleteUrl.json();
      if (deleteUrl.ok) {
        toast.success("URL deleted successfully", {
          position: "top-right",
          autoClose: 1000,
        });

        setdata((prevData) => prevData.filter((url) => url.ShortName !== item));
      }
    } catch (err) {
      toast.error("Failed to delete URL", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };
  {
    /*handleDelete Ends Here*/
  }
  async function handleDeleteAll() {
    setshowDeleteConfirmation(false);
    if (data.length === 0) {
      toast.error("No Link Found", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }
    const deleteALL = await fetch(`/api/userdata/${username}?deleteALL=true`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ UserName: username }),
    });
    let response = await deleteALL.json();

    if (response.success) {
      toast.success("ALL Links Deleted", {
        position: "top-right",
        autoClose: 1000,
      });
      setdata([]);
    } else if (response.error) {
      toast.error("Failed to Delete", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }
  {
    /*handleCopy Starts Here*/
  }
  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Short URL Copied", {
        position: "top-right",
        autoClose: 1000,
      });
    });
  };
  {
    /*handleCopy Ends Here*/
  }
  {
    /*GenerateUrl Starts Here*/
  }
  // Function to handle URL generation
  async function GenerateUrl() {
    if (Editing) {
      setEditing(false); // Reset Editing state
    }
    // Check if both input fields are filled
    if (!LongUrl.trim() || !ShortName.trim()) {
      // Show a warning toast if inputs are empty
      toast.warn("Please Fill Both Input Fields!", {
        position: "top-right", // Position of the toast
        autoClose: 1000, // Auto close after 3 seconds
      });
      return; // Exit the function
    }
    if (addUTMTracking === true && !utmMedium && !utmSource) {
      toast.warn("Please Fill Source and Medium Fields", {
        position: "top-right", // Position of the toast
        autoClose: 1000, // Auto close after 3 seconds
      });
      return
    }
    let formattedUrl = LongUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = "https://" + formattedUrl;
    }

    // Strict URL Validation
    if (!isValidURL(formattedUrl)) {
      toast.error("Invalid URL", { position: "top-right", autoClose: 1000 });
      return;
    }
    setLoading(true); // Set Loading state to true
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
          LongUrl: LongUrl, // Long URL input
          ShortName: ShortName, // Short URL input
          time: time, // Current time
          date: data, // Current date
          passwordSet: password,
          clicks: 0,
          utm: {
            utm_Source: utmSource,
            utm_Medium: utmMedium,
            utm_Campaign: utmCampaign,
          },
          expirydate: expiryDate,
          maxClicks: maxClick
        }),
      });

      let result = await response.json(); // Parse the JSON response
      setMsg(result.ShortName); // Set the generated short URL message

      // Check if the response is not OK
      if (!response.ok) {
        // Show a warning toast if the URL already exists
        toast.warn("Short Name already exists", {
          position: "top-right",
          autoClose: 1000,
        });

        setShortName(""); // Clear the short URL input
        return; // Exit the function
      } else {
        // Show a success toast if the URL is generated successfully
        toast.success("Short Link Created", {
          position: "top-right",
          toastId: "short-link-created",
          autoClose: 1000,
        });
        setExpiryConfirmed(false)
        setpasswordConfirmed(false)
        setpassword("")
        setconfirmPassword("")
        setutmCampaign("")
        setutmMedium("")
        setutmSource("")
        setaddUTMTracking(false)
        setshowMoreFeature(false)
        // Update the data state with the new URL
        let date = new Date().toLocaleDateString();
        let time = new Date().toLocaleTimeString();
        // Manually create new URL object to insert
        const newUrl = {
          LongUrl: LongUrl,
          ShortName: ShortName, // If backend generates it, you need to fetch it in response
          fullShortUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/${ShortName}`, // Use the full short URL from the response
          date: date,
          time: time,
          createdAt: new Date().toISOString(),
        };
        setdata((prevData) => [newUrl, ...prevData]);
        // 💡 Reset the previous state to trigger re-render
        setOn(false);
        setMsg("");

        // Wait for next render tick to set new values (ensures re-animation)
        setTimeout(() => {
          setMsg(result.fullShortUrl); // Set the full short URL
          setOn(true); // Show the updated short URL
        }, 0);

        // Clear the input fields
        setLongUrl("");
        setShortName(""); //he display of the short URL
      }
    } catch (err) {
      toast.warn("Server error Try again later", {
        position: "top-right", // Position of the toast
        autoClose: 1000, // Auto close after 3 seconds
      }); // Show a warning toast if an error occurs

    } finally {
      setLoading(false); // Set Loading state to false
    }
  }

  {
    /*GenerateUrl Ends Here*/
  }

  {
    /*Validation Starts Here */
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
  {
    /* Validation Ends Here */
  }

  {
    /* handleEdit Starts Here */
  }
  // Function to handle URL editing
  const handleEdit = (ShortName, LongUrl, id) => {
    try {
      setEditing(true); // Set Editing state to true
      // Set the input fields with the existing URL data
      setLongUrl(LongUrl);
      setShortName(ShortName);
      setlinkID(id);
    } finally {
      // Set Editing state to false
    }
  };
  {
    /* handleEdit Starts Here */
  }
  {
    /*Function to update data on server */
  }
  async function handleEditCancel(params) {
    setshowLenghtError(false)
    setshowConflictError(false)
    setshowexpiryDateError(false)
    setChangeExpireAt(false)
    setChangeMaxClicks(false)
    setChangeUtmCampaign(false)
    setChangeUtmMedium(false)
    setChangeUtmSource(false)
    setChangeShortName(false)
    setshowEditBox(false)
    // Clearing the New Change states of input 
    setnewmaxClicks(null)
    setnewshortName(null)
    setutmnewCampaign(null)
    setutmnewMedium(null)
    setexpireAt(null)
    setutmnewSource(null)
    setEditingItem(null)
  }
  async function handleUpdate(id, ShortName) {
    setshowexpiryDateError(false)
    setshowConflictError(false)
    setshowLenghtError(false)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // ignore time

    const selectedDate = new Date(expireAt);
    selectedDate.setHours(0, 0, 0, 0); // ignore time
    if(newshortName.length<=0){
      setshowLenghtError(true)
      return
    }
    if (expireAt!==null && selectedDate < today) {
      setshowexpiryDateError(true);
      return;
    } else {
      setshowexpiryDateError(false);
    }
    try {
      setLoading(true)
      let req2updateData = await fetch(`/api/userdata/${username}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          linkid: id,
          shortName: newshortName,
          newexpireAt: expireAt,
          utmCampaign: utmnewCampaign,
          utmSource: utmnewSource,
          utmMedium: utmnewMedium,
          maxClicks: newmaxClicks,
        })
      })
      let response = await req2updateData.json()
      console.log(response)
      if (response.conflict) {
        setshowConflictError(true)
        return
      }
      if (response.success) {
        toast.success("Data updated Successfully", {
          position: "top-right",
          autoClose: 1000
        })

        setChangeExpireAt(false)
        setChangeMaxClicks(false)
        setChangeUtmCampaign(false)
        setChangeUtmMedium(false)
        setChangeUtmSource(false)
        setChangeShortName(false)
        setshowEditBox(false)

        setnewmaxClicks(null)
        setnewshortName(null)
        setutmnewCampaign(null)
        setutmnewMedium(null)
        setexpireAt(null)
        setutmnewSource(null)
        setEditingItem(null)
      }
      setLoading(false)
    } catch (err) {
       setLoading(false)
    } 


  }
  async function getPersonaDetails() {
    let personalDetails2 = await fetch(
      `/api/userdata/${username}?personalDetails=true`
    );
    let response = await personalDetails2.json();
    setpersonalDetails(response.detailObject);

  }
  useEffect(() => {
    if (showPersonalDetails) getPersonaDetails();
  }, [showPersonalDetails]);
  async function changeUserName() {
    // 🛑 First, validate input
    if (!newUsername.trim()) {
      toast.warn("Please enter a valid username", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    // 🟢 Then call API (don't toggle here!)
    try {
      const response = await fetch(
        `/api/userdata/${username}?changeUsername=true`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Username: newUsername.trim(),
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Username updated!", {
          position: "top-right",
          autoClose: 1000,
        });
        localStorage.removeItem("Token");
        setchangeUsername(false); // Now disable the input
        window.location.href = "/login"
      } else {
        toast.error(result?.error || "Failed to update username", {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (err) {
      toast.error("Server error while changing username", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  }
  async function handleMoreFeatures() {
    if (ShortName === "" || LongUrl === "") {
      toast.error("Please fill both inputs First", {
        position: "top-right",
        autoClose: 1000
      })
      return
    }
    setshowMoreFeature(!showMoreFeature)
  }
  async function handleDone() {

    // Reset errors first
    setshowDateError(false);
    setshowMaxNumberError(false);

    // -------- Expiry Date Validation (optional field) --------
    if (expiryDate) {
      const selectedDate = new Date(expiryDate);
      const today = new Date();

      // Remove time for correct comparison
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        setshowDateError(true);
        return;
      }
    }

    // -------- Max Click Validation (optional field) --------
    if (maxClick !== "" && Number(maxClick) <= 0) {
      setshowMaxNumberError(true);
      return;
    }


    // -------- All Valid → Close Modal --------
    setshowLinkRules(false);
    setExpiryConfirmed(true)
  }
     async function handlePassword(){
      setshowPasswordError("")
    if(password!==confirmPassword){
         setshowPasswordError("Password do not matches")
    }else if(password.length<6 || password.includes(" ")){
        setshowPasswordError("")
         setshowPasswordError("Password must be at least 6 characters long and not contain spaces")
    }
    setpasswordConfirmed(true)
    setshowPasswordBox(false)
  }
  async function handleRemovePassword() {
    setpassword("")
    setconfirmPassword("")
    setpasswordConfirmed(!passwordConfirmed)

  }
  async function handleRemoveRules() {
    setexpiryDate("")
    setmaxClick("")
    setExpiryConfirmed(!expiryConfirmed)

  }
  const renderUTMValue = (value) => value ? value : "(Not Set)";
  function truncateUrl(url, maxLength = 60) {
    if (url?.length <= maxLength) return url; // short enough, no change

    const start = url?.slice(0, 50); // first 15 chars
    const end = url?.slice(-20);     // last 10 chars
    return `${start}***${end}`;     // middle replaced with stars
  }

  return (
    <>
      <ToastContainer className={"pt-12"} />
      <Logout
        username={username}
        setshowDeleteConfirmation={setshowDeleteConfirmation}
        setshowPersonalDetails={setshowPersonalDetails}
      />
      <AuthWrapper username={username} />

      <Head>
        <title>User Dashboard - Trimify</title>
        <meta
          name="description"
          content="A separate dashboard provided by TRIMIFY to its logged user in which they can create custom links and manage them"
        />
      </Head>

      <div
        className="hero flex flex-col items-center md:p-4    text-gray-800"
        style={{ minHeight: "calc(100vh - 63px)", height: "full" }}
      >
        <div className="md:my-2 bg-gray-100 mx-auto max-w-[210vh] w-full  min-h-[60vh]rounded-xl flex flex-col gap-3 z-10 p-6  md:rounded-2xl">
          <h2 className="text-4xl md:text-5xl text-center mt-2 bree-bold ">
            Trimify Control Room
          </h2>
          <div className="w-full gap-2 flex flex-col  justify-between mt-6 md:mt-8 relative">
            <h2 className="text-gray-800 text-xl md:text-2xl poppins-bold">
              Create New Short Link
            </h2>
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <input
                aria-label="Enter the long URL"
                name="Enter the long URL"
                type="url"
                title="Enter the long url"
                autoComplete="on"
                autoFocus
                className="w-full focus:ring-1 focus:ring-gray-400 flex-grow bg-white p-4 rounded-[4px]  outline-none text-gray-700  "
                placeholder="Paste Long Url"
                value={LongUrl}
                onChange={(e) => setLongUrl(e.target.value)} // Update state on change
              />
              <input
                aria-label="Enter the Short Name"
                name="Enter the Name"
                type="url"
                title="Enter the Short Name"
                autoComplete="on"
                autoFocus
                className="md:w-[30%] focus:ring-1 focus:ring-gray-400 flex-grow bg-white p-4 rounded-[4px]  outline-none text-gray-700  "
                placeholder="Write short Name"
                onChange={(e) => setShortName(e.target.value)} // Update state on change
                value={ShortName}
              />


              <div className="relative md:w-[280px] ">
                <button
                  className="relative w-full h-full bg-white text-black rounded-[2px] flex justify-center items-center p-1 gap-1  poppins-semi cursor-pointer "
                  onClick={handleMoreFeatures}
                  disabled={!isPremium}
                >
                  More Options
                  <span className="transition-all duration-300 ease-in-out">
                    <Image
                      src={showMoreFeature ? "/up.png" : "/down.png"}
                      width={showMoreFeature ? 24 : 28}
                      height={showMoreFeature ? 24 : 28}
                      alt="toggle"
                    />
                  </span>
                </button>

                {/* LOCK OVERLAY */}
                {!isPremium && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[1px] cursor-not-allowed rounded-[2px]">
                    <Image src="/lock.png" width={28} height={28} alt="Locked"  onClick={() => setshowUpgradeBox(true)} />
                  </div>
                )}

                {/* DROPDOWN */}
                {showMoreFeature && (
                  <ul className="absolute z-20 bg-white border border-green-400 rounded-b-md shadow-md w-[150px]">
                    <li
                      className="p-2 hover:bg-green-100 cursor-pointer"
                      onClick={() => { setaddUTMTracking(!addUTMTracking), setshowMoreFeature(false) }}
                    >
                      ADD UTM
                    </li>
                    <li
                      className="p-2 hover:bg-green-100 cursor-pointer"
                      onClick={() => { setshowLinkRules(!showLinkRules), setshowMoreFeature(false) }}
                    >
                      Expiry Rules
                    </li>
                    <li
                      className="p-2 hover:bg-green-100 cursor-pointer"
                      onClick={() => { setshowPasswordBox(!showPasswordBox), setshowMoreFeature(false) }}
                    >
                      Add Password
                    </li>
                  </ul>
                )}
                           {showUpgradeBox && <Upgrade2premium setshowUpgradeBox={setshowUpgradeBox} />}
              </div>
              {!addUTMTracking && <button
                className="md:ml-2 p-2 md:w-[20%] rounded-[8px] cursor-pointer bg-gray-800 text-white hover:bg-gray-700 text-sm md:text-base "
                title="Count Clicks on URL"
                aria-label="Count Clicks on URL"
                name="Click Counter"
                onClick={Editing ? updateData : GenerateUrl}
              >
                {Editing ? "Save Now" : "Create Now"}
              </button>

              }
            </div>
          </div>
         <div className="flex gap-4 flex-col md:flex-row mt-2 md:items-center">
          {expiryConfirmed && (
            <div className="flex items-center gap-1 text-green-600 text-xl poppins-semi mt-1">
              <span>✔</span>
              <span>Expiry Rules applied</span>
              <button className=" border-b-2 border-red-600 text-black bg-white rounded-sm px-1 ml-2 cursor-pointer hover:bg-red-300 transition-all ease-in-out duration-300  " onClick={handleRemoveRules}>Remove</button>
            </div>
          )}
          {passwordConfirmed && (
            <div className="flex items-center gap-1 text-green-600 text-xl poppins-semi mt-1">
              <span>✔</span>
              <span>Password Protection Applied</span>
              <button className=" border-b-2 border-red-600 text-black bg-white rounded-sm px-1 ml-2 cursor-pointer hover:bg-red-300 transition-all ease-in-out duration-300  " onClick={handleRemovePassword}>Remove</button>
            </div>
          )}</div>


          {addUTMTracking &&
            <div className="flex flex-col flex-wrap  gap-2  h-auto">
              <h2 className="inter-semi text-xl ">ADD UTM Tracking</h2>
              <div className="flex flex-wrap gap-4">

                <div className="relative flex-grow">
                  <input
                    placeholder="UTM Source"
                    className="w-full border-b-3 border-green-300 bg-white p-4 pr-12 rounded-t-[12px] outline-none text-gray-700"
                    type="text"
                    value={utmSource}
                    onChange={(e) => setutmSource(e.target.value)}
                  />

                  <Image
                    onClick={() => { setshowSources((prev) => !prev) }}
                    src="/down.png"
                    width={24}
                    height={24}
                    alt="dropdown"
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  />

                  {/* Dropdown */}
                  {showSources && (
                    <ul className="absolute z-10 w-full bg-white border border-green-400 rounded-b-md shadow-md">
                      {utmSources.map((item, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-green-100 cursor-pointer"
                          onClick={() => {
                            setutmSource(item);
                            setshowSources(false);
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="relative flex-grow">
                  <input placeholder="UTM Medium" className="w-full   bg-white p-4 rounded-t-[12px] border-b-3 border-green-300  outline-none text-gray-700  " type="text" value={utmMedium} onChange={(e) => setutmMedium(e.target.value)} />
                  <Image
                    onClick={() => setshowMediums((prev) => !prev)}
                    src="/down.png"
                    width={24}
                    height={24}
                    alt="dropdown"
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  />
                  {showMediums && (
                    <ul className="absolute z-10 w-full bg-white border border-green-400 rounded-b-md shadow-md">
                      {utmMediums.map((item, index) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-green-100 cursor-pointer"
                          onClick={() => {
                            setutmMedium(item);
                            setshowMediums(false);
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="relative flex-grow">
                  <input placeholder="UTM Campaign" className=" w-full bg-white p-4 rounded-t-[12px]  border-b-3 border-green-300 outline-none text-gray-700  " type="text" value={utmCampaign} onChange={(e) => setutmCampaign(e.target.value)
                  } />
                  <Image
                    src="/down.png"
                    width={24}
                    height={24}
                    alt="dropdown"
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  />
                </div>


                <button className="bg-gray-800 text-white p-4 rounded-[8px] cursor-pointer" onClick={GenerateUrl}>Add Tracking</button>
              </div>

            </div>
          }
          {showLinkRules &&
            <div className=" inset-1 z-10 fixed backdrop-blur-sm border-b border-1 border-green-400 flex items-center justify-center">
              <div className="bg-white md:min-h-[60vh] rounded-xl p-4 md:min-w-[70vh] flex flex-col gap-10">

                <h2 className="inter-semi text-2xl pt-2">Link Expiry Rules</h2>

                <div className="flex flex-col gap-4 border-b-2 border-green-400">
                  <h3 className="poppins-bold text-lg ">Select Expiry Date:</h3>
                  <input type="date" className="outline-none " required={true} onChange={(e) => { setexpiryDate(e.target.value), console.log(expiryDate) }} />

                </div>
                <p className="mt-[-33px] text-red-900 ">The Link will expire on 12AM night</p>
                {showDateError && <p className="text-red-800 mt-[-30px] poppins-semi">Please select a future expiry date.</p>}


                <div className="flex flex-col gap-4 border-b-2 border-green-400">
                  <h3 className="poppins-bold text-lg ">Maximum Number of Clicks:</h3>
                  <input type="number" className="outline-none " placeholder="e.g : 10 (Optional)" onChange={(e) => { setmaxClick(e.target.value) }} />
                </div>
                {showMaxNumberError && <p className="text-red-800 mt-[-30px] poppins-semi">Number must be above 0</p>}

                <div className="flex gap-4 justify-end  md:mt-12">
                  <button className="cursor-pointer bg-red-300 p-2 rounded-md hover:bg-red-200 transition-all ease-in-out duration-200 " onClick={() => { setshowLinkRules(false), setshowDateError(false), setshowMaxNumberError(false) }}>Close</button>
                  <button className="cursor-pointer bg-green-300 p-2 rounded-md hover:bg-green-200 transition-all ease-in-out duration-200" onClick={handleDone}>Done</button>
                </div>

              </div>
            </div>
          }
          {showPasswordBox &&
            <div className=" inset-1 z-10 fixed backdrop-blur-sm border-b border-1 border-green-400 flex items-center justify-center">
              <div className="bg-white md:min-h-[60vh] rounded-xl p-4 md:min-w-[70vh] flex flex-col gap-10">

                <h2 className="inter-semi text-2xl pt-2">Add Password Protection 🔒</h2>

                <div className="flex flex-col gap-2 border-b-2 border-green-400">
                  <h3 className="poppins-bold text-lg ">Enter Password:</h3>
                  <input type="password" className="outline-none  bg-gray-50 p-2 rounded-t-[8px]" value={password} placeholder="Write Password Here" required={true} onChange={(e) => { setpassword(e.target.value), console.log(expiryDate) }} />

                </div>
                <p className="mt-[-33px] text-red-900 ">The Link password can't be changed</p>
                   {showPasswordError && <p className="text-red-800 mt-[-30px] poppins-semi">{showPasswordError}</p>}
          

                <div className="flex flex-col gap-2 border-b-2 border-green-400 mt-[-10px]">
                  <h3 className="poppins-bold text-lg ">Confirm Password:</h3>
                  <input type="password" className="outline-none  bg-gray-50 p-2 rounded-t-[8px]" value={confirmPassword} placeholder="Re-enter Password Here" onChange={(e) => { setconfirmPassword(e.target.value) }} />
                </div>
                
                <div className="flex gap-4 justify-end  md:mt-12">
                  <button className="cursor-pointer bg-red-300 p-2 rounded-md hover:bg-red-200 transition-all ease-in-out duration-200 " onClick={() => { setshowPasswordBox(false), setshowPasswordError("") ,setpassword(""), setconfirmPassword("")}}>Close</button>
                  <button className="cursor-pointer bg-green-300 p-2 rounded-md hover:bg-green-200 transition-all ease-in-out duration-200" onClick={handlePassword}>Done</button>
                </div>

              </div>
            </div>
          }
          <div className="flex justify-between items-center px-2 mt-4">
            <h2 className="font-bold text-xl md:text-2xl mt-1 text-start">
              Your URLs ({data.length || 0})
            </h2>
          </div>

          <main className="flex flex-col gap-8">
            {data?.length > 0 &&
              !Loading &&
              data.map((items, index) => (
                <div
                  key={index}
                  className=" bg-gray-50 rounded-2xl w-full overflow-x-auto p-4 "
                >
                  <div className=" w-full flex flex-col gap-2">
                    <div className="flex md:flex-row flex-col md:justify-between md:items-center">
                     <div className="flex items-center gap-2">
  {items.LongUrl && (
    <>
      {/* Extract domain safely */}
      {(() => {
        let domain;
        try {
          domain = new URL(items.LongUrl).hostname.replace("www.", "").trim();
        } catch (err) {
          domain = "trimy.me"; // fallback domain if invalid URL
        }
        return (
          <>
            <Image
              src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`}
              className="w-[64px] h-[64px] md:mr-1"
              width={18}
              height={18}
              alt="favicon"
            />
            <h2 className="geist-semi text-2xl">{domain}</h2>
          </>
        );
      })()}
    </>
  )}
</div>

                      <div className="flex flex-wrap gap-4 items-center">
                        <button
                          className="  rounded-full bg-gray-200 flex items-center  cursor-pointer hover:bg-gray-100 poppins-semi duration-300 transition-all ease-in-out"
                          title="Copy Short URL"
                          aria-label="Copy Short URL"
                          onClick={() => {
                            setSelectedItem(items) // store THIS link
                            setinfoBox(true)
                          }
                          }
                        >
                          {" "}
                          <Image
                            title="Link Info"
                            src="/info.png"
                            className=" "
                            width={28}
                            height={28}
                          ></Image>

                        </button>
                        {infoBox && (
                          <>
                            <div className="fixed w-full h-full inset-0 flex items-center justify-center">
                              <div className="md:w-[500px] md:h-[70vh] w-full bg-white rounded-xl m-4 flex flex-col p-8 gap-4">

                                <h2 className="text-2xl inter-semi underline">Link Details</h2>

                                {/* UTM INFO */}
                                <div className="flex flex-col gap-2">
                                  <h2 className="poppins-bold text-xl">UTM Info</h2>

                                  {hasUTM ? (
                                    <div className="flex gap-2">
                                      {/* SOURCE */}
                                      <div className="flex-1 flex flex-col gap-1">
                                        <span className="text-xs text-gray-600">Source</span>
                                        <div className="p-1 bg-gray-100 border-b border-green-400 truncate">
                                          {renderUTMValue(selectedItem.utm?.source)}
                                        </div>
                                      </div>

                                      {/* MEDIUM */}
                                      <div className="flex-1 flex flex-col gap-1">
                                        <span className="text-xs text-gray-600">Medium</span>
                                        <div className="p-1 bg-gray-100 border-b border-green-400 truncate">
                                          {renderUTMValue(selectedItem.utm?.medium)}
                                        </div>
                                      </div>

                                      {/* CAMPAIGN */}
                                      <div className="flex-1 flex flex-col gap-1">
                                        <span className="text-xs text-gray-600">Campaign</span>
                                        <div className="p-1 bg-gray-100 border-b border-green-400 truncate">
                                          {renderUTMValue(selectedItem.utm?.campaign)}
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="w-full p-1 bg-gray-100 border-b border-green-400 text-gray-600">
                                      (Not Set)
                                    </div>
                                  )}
                                </div>

                                {/* LINK EXPIRY */}
                                <div className="flex flex-col gap-2">
                                  <h2 className="poppins-bold text-xl">Link Expiry Date</h2>
                                  <div className="w-full p-1 bg-gray-100 border-b border-green-400">
                                    {selectedItem?.expireAt ? <> {new Date(selectedItem.expireAt).toLocaleDateString()} 12:00 am</> : "(Not Set)"}
                                  </div>
                                </div>

                                {/* MAX CLICKS */}
                                <div className="flex flex-col gap-2">
                                  <h2 className="poppins-bold text-xl">Max Clicks</h2>
                                  <div className="w-full p-1 bg-gray-100 border-b border-green-400">
                                    {selectedItem?.maxClicks ? <>  {selectedItem.maxClicks}</> : "(Not Set)"}
                                  </div>
                                </div>

                                {/* CREATED DATE */}
                                <div className="flex flex-col gap-2">
                                  <h2 className="poppins-bold text-xl">Date of Creation</h2>
                                  <div className="w-full p-1 bg-gray-100 border-b border-green-400">
                                    {new Date(selectedItem.createdAt).toLocaleDateString()}

                                  </div>
                                </div>

                                <button
                                  className="mt-2 w-[10vh] self-end cursor-pointer hover:bg-gray-600 transition-all bg-gray-800 text-white rounded-sm p-2"
                                  onClick={() => setinfoBox(false)}
                                >
                                  Close
                                </button>

                              </div>
                            </div>
                          </>
                        )}

                        <button
                          className="p-1 bg-gray-200 flex items-center rounded-sm cursor-pointer hover:bg-gray-100 poppins-semi duration-300 transition-all ease-in-out"
                          title="Copy Short URL"
                          aria-label="Copy Short URL"
                          onClick={() => handleCopy(items.fullShortUrl)}
                        >
                          {" "}
                          <Image
                            src="/copy.png"
                            className=" w-[18px] h-[18px] mr-1"
                            width={18}
                            height={18}
                          ></Image>
                          Copy
                        </button>
                        <button
                          className="p-1 bg-gray-200 flex items-center rounded-sm cursor-pointer hover:bg-gray-100 poppins-semi duration-300 transition-all ease-in-out "
                          title="Edit URL"
                          aria-label="Edit URL"
                          data-testid="edit-link-btn"
                          onClick={() => {
                            setEditingItem(items), setshowEditBox(true)
                          }}
                        >
                          <Image
                            src="/edit.png"
                            className=" w-[18px] h-[18px] mr-1 "
                            width={18}
                            height={18}
                          ></Image>{" "}
                          Edit
                        </button>
                        {showEditBox && editingItem && (
                          <div data-testid="edit-link-modal" className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50">
                            <div className="w-[600px] h-[75vh] rounded-xl bg-white flex flex-col gap-6 p-6 overflow-y-auto">

                              <h2 className="text-2xl bree-bold">Edit your Link</h2>

                              {/* ================= SHORT NAME ================= */}
                              <div className="flex flex-col gap-2">
                                <h2 className="text-lg inter-bold">Short Name</h2>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    className="w-full border-b-2 border-green-400 py-1 px-2 outline-none rounded-t-[8px] bg-gray-100"
                                    value={changeShortName ? newshortName : editingItem.ShortName || "Not Set"}
                                    onChange={(e) => setnewshortName(e.target.value)}
                                  />
                                  {changeShortName === false &&
                                    <button
                                      className={`w-[30%] p-2 rounded bg-gray-700 text-white hover:text-gray-500 cursor-pointer `}
                                      onClick={() => {
                                        setnewshortName(editingItem.ShortName || "");
                                        setChangeShortName(true);
                                      }}
                                    >
                                      Change
                                    </button>}
                                </div>
                                {showLenghtError&& <p className="text-red-700 bg-gray-100 p-1">ShortName cannot be empty</p>}
                                {showConflictError && <p className="text-red-700 bg-gray-100 p-1">ShortName Already Exists</p>}
                              </div>

                              {!isPremium && (
                                <div className="bg-gray-50 text-red-600 p-1 mb-[-20px]">
                                  Premium Package Required for these features 👇
                                </div>
                              )}

                              <div className="bg-gray-50 text-red-600 p-1 mb-[-20px]">
                                If you want to remove anything Click on Change button and in input field write <b>remove.</b>
                              </div>

                              {/* ================= UTM INFO ================= */}
                              <div className="flex flex-col gap-2">
                                <h2 className="text-lg inter-bold">UTM Info</h2>
                                <div className="flex gap-2">

                                  {/* SOURCE */}
                                  <div className="flex-1 flex flex-col gap-1 w-[30%]">
                                    <span className="text-xs text-gray-600">Source</span>
                                    <input
                                      value={changeUtmSource ? utmnewSource : editingItem.utm?.source || "Not Set"}
                                      disabled={!isPremium || !changeUtmSource}
                                      onChange={(e) => setutmnewSource(e.target.value)}
                                      className="p-1 bg-gray-100 border-b border-green-400 rounded"
                                    />
                                    {changeUtmSource === false &&
                                      <button
                                        className={`mt-1 px-2 py-1 rounded ${isPremium ? " bg-gray-700 text-white hover:text-gray-200 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed "}`}
                                        disabled={!isPremium}
                                        onClick={() => {
                                          if (!isPremium) return;
                                          setutmnewSource(editingItem.utm?.source || "");
                                          setChangeUtmSource(true);
                                        }}
                                      >
                                        {editingItem.utm?.source ? "Change" : "Add"}
                                      </button>}
                                  </div>

                                  {/* MEDIUM */}
                                  <div className="flex-1 flex flex-col gap-1 w-[30%]">
                                    <span className="text-xs text-gray-600">Medium</span>
                                    <input
                                      value={changeUtmMedium ? utmnewMedium : editingItem.utm?.medium || "Not Set"}
                                      disabled={!isPremium || !changeUtmMedium}
                                      onChange={(e) => setutmnewMedium(e.target.value)}
                                      className="p-1 bg-gray-100 border-b border-green-400 rounded"
                                    />
                                    {changeUtmMedium === false &&
                                      <button
                                        className={`mt-1 px-2 py-1 rounded ${isPremium ? "bg-gray-700 text-white hover:text-gray-200 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                                        disabled={!isPremium}
                                        onClick={() => {
                                          if (!isPremium) return;
                                          setutmnewMedium(editingItem.utm?.medium || "");
                                          setChangeUtmMedium(true);
                                        }}
                                      >
                                        {editingItem.utm?.medium ? "Change" : "Add"}
                                      </button>}
                                  </div>

                                  {/* CAMPAIGN */}
                                  <div className="flex-1 flex flex-col gap-1 w-[30%]">
                                    <span className="text-xs text-gray-600">Campaign</span>
                                    <input
                                      value={changeUtmCampaign ? utmnewCampaign : editingItem.utm?.campaign || "Not Set"}
                                      disabled={!isPremium || !changeUtmCampaign}
                                      onChange={(e) => setutmnewCampaign(e.target.value)}
                                      className="p-1 bg-gray-100 border-b border-green-400 rounded"
                                    />
                                    {changeUtmCampaign === false &&
                                      <button
                                        className={`mt-1 px-2 py-1 rounded ${isPremium ? "bg-gray-700 text-white hover:text-gray-200 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                                        disabled={!isPremium}
                                        onClick={() => {
                                          if (!isPremium) return;
                                          setutmnewCampaign(editingItem.utm?.campaign || "");
                                          setChangeUtmCampaign(true);
                                        }}
                                      >
                                        {editingItem.utm?.campaign ? "Change" : "Add"}
                                      </button>}
                                  </div>

                                </div>
                              </div>

                              {/* ================= EXPIRY DATE ================= */}
                              <div className="flex flex-col gap-2">
                                <h2 className="text-lg inter-bold">Expiry Date</h2>
                                <div className="flex gap-2">
                                  <input
                                    type={changeExpireAt ? "date" : "text"}
                                    disabled={!isPremium || !changeExpireAt}
                                    value={
                                      changeExpireAt ? expireAt : new Date(editingItem.expireAt).toLocaleDateString()
                                    }
                                    onChange={(e) => setexpireAt(e.target.value)}
                                    className="w-full bg-gray-100 p-2 rounded border"
                                  />
                                  {changeExpireAt === false &&
                                    <button
                                      className={`w-[30%] p-2 rounded ${isPremium ? "bg-gray-700 text-white hover:text-gray-500 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                                      disabled={!isPremium}
                                      onClick={() => {
                                        if (!isPremium) return;
                                        setexpireAt(editingItem.expireAt ? new Date(editingItem.expireAt).toISOString().slice(0, 16) : "");
                                        setChangeExpireAt(true);
                                      }}
                                    >
                                      {editingItem.expireAt ? "Change" : "Add"}
                                    </button>}
                                </div>
                                {showexpiryDateError && <p className="text-red-800 ">Please select a expiry future date</p>}
                              </div>

                              {/* ================= MAX CLICKS ================= */}
                              <div className="flex flex-col gap-2">
                                <h2 className="text-lg inter-bold">Max Clicks</h2>
                                <div className="flex gap-2">
                                  <input
                                    type="number"
                                    disabled={!isPremium || !changeMaxClicks}
                                    value={changeMaxClicks ? newmaxClicks ?? "" : editingItem.maxClicks ?? "Not Set"}
                                    onChange={(e) => setnewmaxClicks(Number(e.target.value))}
                                    className="w-full bg-gray-100 p-2 rounded border"
                                  />
                                  {changeMaxClicks === false &&
                                    <button
                                      className={`w-[30%] p-2 rounded ${isPremium ? "bg-gray-700 text-white hover:text-gray-500 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                                      disabled={!isPremium}
                                      onClick={() => {
                                        if (!isPremium) return;
                                        setnewmaxClicks(editingItem.maxClicks ?? null);
                                        setChangeMaxClicks(true);
                                      }}
                                    >
                                      {editingItem.maxClicks ? "Change" : "Add"}
                                    </button>
                                  }
                                </div>
                              </div>

                              {/* ================= ACTION BUTTONS ================= */}
                              <div className="flex justify-end gap-3 mt-4">
                                <button
                                  className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:text-gray-200 transition-all duration-300 ease-in-out"
                                  onClick={handleEditCancel}
                                >
                                  Cancel
                                </button>

                                <button
                                  className={`px-4 py-2 rounded cursor-pointer transition-all duration-300 ease-in-out bg-green-600 text-white hover:text-green-300`}
                                  onClick={() => handleUpdate(editingItem._id, editingItem.ShortName)}
                                  disabled={Loading}
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                        )}




                        <button
                          className="p-1 bg-gray-200 flex items-center rounded-sm cursor-pointer hover:bg-gray-100 poppins-semi duration-300 transition-all ease-in-out"
                          onClick={() => setActiveModalShortName(items.LongUrl)}
                        >
                          <Image
                            src="/qr.png"
                            className="mr-1 border-1 border-gray-800"
                            width={24}
                            height={24}
                          ></Image>
                          QR Code
                        </button>
                        <button
                          className="p-1 bg-gray-200 flex items-center rounded-sm cursor-pointer hover:bg-gray-100 poppins-semi duration-300 transition-all ease-in-out"
                          onClick={() => handleDelete(items.ShortName)}
                        >
                          <Image
                            src="/bin.png"
                            className="mr-1 "
                            width={24}
                            height={24}
                          ></Image>
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="ml-2 flex flex-col gap-1 mt-4 md:mt-0">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/link.png"
                          className=" w-[18px] h-[18px] mr-1 "
                          width={18}
                          height={18}
                        ></Image>{" "}
                        <h3 className="text-xl text-blue-700">
                          <Link
                            className="underline-none  hover:underline"
                            href={items.fullShortUrl}
                            target="_blank"
                          >
                            {items.fullShortUrl.replace("http://", " ")}
                          </Link>
                        </h3>
                      </div>
                      <h3 className="text-xl geist break-words">
                        <Link
                          className="underline-none  hover:underline"
                          href={items.LongUrl}
                          target="_blank"
                        >
                          {truncateUrl(items.LongUrl)}
                        </Link>
                      </h3>
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col items-center gap-4 mt-8 md:mt-4 w-full justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative inline-block">
  <button
    className="p-2 rounded-sm bg-gray-800 text-white ml-2 flex items-center justify-center gap-1 cursor-pointer hover:bg-gray-600 transition-colors duration-300"
    title="Click Data"
    disabled={!isPremium}
  >
    <Link
      href={`/user/${username}/analytics/${items.ShortName}?username=${username}`}
      className="w-full h-full"
    >
      Click Data
    </Link>
  </button>

  {/* LOCK OVERLAY */}
  {!isPremium && (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[1px] cursor-not-allowed rounded-sm">
      <Image src="/lock.png" width={20} height={20} alt="Locked" onClick={!isPremium ? () => setshowUpgradeBox(true) : null} />
    </div>
  )}
</div>

                      <div className="flex items-center gap-1">
                        <Image
                          src={"/calendar.png"}
                          className="w-[18px] h-[18px]"
                          width={18}
                          height={18}
                        ></Image>
                        <p className="inter-semi">{items.time}</p>
                        <p className="inter-semi">{items.date}</p>
                      </div>
                    </div>
                    <div className="flex justify-center float-right">
                      <div className="flex items-center gap-2 bg-gray-600 hover:bg-green-700 transition-colors duration-300 text-white rounded-lg px-4 py-2 shadow-md cursor-pointer">
                        <p className="text-lg font-bold bree-bold">Clicks</p>
                        <span className="bg-white text-green-600 font-semibold px-2  rounded-full shadow-sm">
                          {items.clicks ?? 0}
                        </span>

                      </div>

                    </div>

                  </div>
                </div>
              ))}
          </main>
        </div >
        {ActiveModalShortName && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto ">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-2xl max-w-sm w-80 md:w-full relative z-[1001] pointer-events-auto">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold mb-2 text-gray-800">
                  QR Code
                </h2>
                <div className="bg-gray-100 p-1 hover:bg-gray-50 transition-all duration-200 ease-in-out mb-4 md:mb-3 cursor-pointer rounded-full">
                  <X
                    className=" "
                    onClick={() => setActiveModalShortName("")}
                  />
                </div>
              </div>
              <QRCodeGenerator ShortName={ActiveModalShortName} />

              <div className="mt-4 flex justify-end gap-2"></div>
            </div>
          </div>
        )
        }
        {/* URL Removal Confirmation Box Starts Here */}
        {
          showDeleteConfirmation && (
            <div className="fixed inset-0   mx-auto md:w-full flex items-center justify-center z-[1000] bg-black/40 backdrop-blur-sm">
              <div className="md:w-[400px] w-[90%] p-6 rounded-md  bg-white z-[1001]">
                <h2 className="poppins-bold text-xl">
                  Confirm to Delete All Links
                </h2>
                <h3 className="poppins-semi text-sm mt-1">
                  This can't be undone
                </h3>
                <div className="flex gap-4 float-right mt-4">
                  <button
                    className="bg-gray-100 poppins-semi p-2 rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-50"
                    onClick={() => setshowDeleteConfirmation(false)}
                  >
                    {" "}
                    Cancel
                  </button>
                  <button
                    className="bg-red-200  poppins-semi p-2 rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:bg-red-100 "
                    onClick={handleDeleteAll}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )
        }
        {/* URL Removal Confirmation Box Ends Here */}

        {
          showPersonalDetails && personalDetails && (
            <div className="fixed inset-0 flex justify-center items-center z-[1000] bg-black/30 md:backdrop-blur-sm p-2 md:p-4">
              <div className="md:w-[40%] w-full bg-white p-8 rounded-2xl flex flex-col">
                <h2 className="bree-bold text-2xl md:text-4xl md:text-center">
                  Your Personal Details
                </h2>

                <div className="flex flex-col gap-1 mt-6 md:mt-12 w-full">
                  <h2 className="text-xl poppins-semi">Your Username:</h2>
                  <div className="flex gap-2 w-full">
                    <input
                      className={`${changeUsername
                        ? "bg-white border-1 border-black"
                        : "bg-blue-100"
                        }   w-[60%] p-2 rounded-lg`}
                      value={
                        changeUsername ? newUsername : personalDetails.Username
                      }
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, ""); // remove all spaces
                        setnewUsername(value);
                      }}
                      disabled={!changeUsername}
                      placeholder="Enter username (no spaces allowed)"
                    ></input>
                    <button
                      className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg text-white w-[40%] cursor-pointer"
                      onClick={
                        changeUsername
                          ? changeUserName
                          : () => setchangeUsername(true)
                      }
                    >
                      {changeUsername ? "Update Now" : "Change"}
                    </button>
                  </div>

                  <div className="mt-4">
                    <h2 className="text-lg md:text-xl poppins-semi">
                      Registered Email:
                    </h2>
                    <h3 className="bg-blue-100 p-2 rounded-lg">
                      {personalDetails.Email}
                    </h3>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-lg md:text-xl poppins-semi">
                      Account Type:
                    </h2>
                    <h3 className="bg-blue-100 p-2 rounded-lg">
                      {personalDetails.isPremium ? "Premium" : "Basic"}
                    </h3>
                  </div>

                  <div className="mt-4">
                    <h2 className="text-lg md:text-xl poppins-semi">
                      Account Creation Date:
                    </h2>
                    <div className="flex bg-blue-100 items-center gap-1  p-2 rounded-lg">
                      <Image
                        src={"/calendar.png"}
                        className="w-[18px] h-[18px]"
                        width={18}
                        height={18}
                      ></Image>
                      <h3 className="bg-blue-100">
                        {new Date(personalDetails.createdAt).toLocaleDateString()}{" "}
                        {new Date(personalDetails.createdAt).toLocaleTimeString()}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h2 className="text-lg md:text-xl poppins-semi">
                      Total Links Created:
                    </h2>
                    <h3 className="bg-blue-100 p-2 rounded-lg">
                      {personalDetails.totalLinks}
                    </h3>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      className="p-3 bg-gray-900 hover:bg-gray-700 text-white rounded-md cursor-pointer"
                      onClick={() => setshowPersonalDetails(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div >
    </>
  );
}
