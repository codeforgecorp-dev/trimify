"use client"
import React from 'react'
import Loader2 from '../components/Loader2'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'

const Page = () => {
      const [userData, setuserData] = useState()
      const [feedbackData, setfeedbackData] = useState([])
      const [Loading, setLoading] = useState(true)
      const [Verified, setVerified] = useState(false)
      const [openDropdownId, setOpenDropdownId] = useState(null);
      const [transactionData, settransactionData] = useState()
      const [showBox, setshowBox] = useState("Users")
      const router = useRouter()
      const colors = [""]
      useEffect(() => {
            async function verify_admin() {
                  try {
                        const request = await fetch("/api/admin/verify/");
                        const res = await request.json();

                        if (res.success) {
                              toast.success(res.message, { autoClose: 1000 });
                              setVerified(true);
                        } else {
                              toast.error(res.message);
                              router.push("/login");
                        }
                  } catch (err) {
                        toast.error("Something went wrong");
                        router.push("/login");
                  } finally {
                        setLoading(false);
                  }
            }

            verify_admin();
      }, []);
      async function getUserData() {
            const request = await fetch("/api/admin/");
            const res = await request.json();
            setuserData(res.Data);
      }
      async function getTransactionData() {
            const request = await fetch("/api/admin?Data=transactional")
            const res = await request.json()

            settransactionData(res.transactionData)
      }
      async function getFeedbackData() {
            const request = await fetch("/api/admin?Data=Feedback")
            const res = await request.json()

            setfeedbackData(res.FeedbackData)
      }

      useEffect(() => {
            if (Verified) {
                  getUserData();
                  getTransactionData()
                  getFeedbackData()
            }
      }, [Verified]);

      async function handleDelete(Username) {
            let deleteReq = await fetch("/api/admin/", {
                  method: "DELETE",
                  headers: {
                        "Content-Type": "application/json",

                  },
                  body: JSON.stringify({ username: Username })
            })
            let res = await deleteReq.json()
            toast.success("User Deleted Successfully",{
                  position:"top-right",
                  autoClose:1000
            })
            getUserData(); // reload users ✅
      }

      async function handleAssignPremium(Username, currentStatus) {
            try {
                  const req = await fetch("/api/admin/", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username: Username, isPremium: !currentStatus }),
                  });
                  const res = await req.json();
                  if (res.success) {
                        toast.success(
                              !currentStatus ? `✅ Premium granted to ${Username}` : `🔁 Premium removed from ${Username}`,
                              { position: "top-right", autoClose: 1500 }
                        );
                        getUserData();
                  } else {
                        toast.error("Failed to update premium status", { position: "top-right", autoClose: 1500 });
                  }
            } catch {
                  toast.error("Server error", { position: "top-right", autoClose: 1500 });
            }
      }

      return (
            <>
                  {Loading && <Loader2 />}
                  <ToastContainer className={"pt-12"} />

                  <div className='  bg-[#001433] text-white '>
                        <div className=' bg-[#001433] min-w-full  flex-wrap md:rounded-2xl md:px-12 flex flex-col'>
                              <h1 className='text-4xl text-center  poppins-bold pt-6'>Admin Panel</h1>
                              <div className='flex gap-2 mt-[50px] bg-black w-fit px-4 py-2 rounded-xl border-2 border-white mx-auto'>
                                    <button
                                          onClick={() => setshowBox("Users")}
                                          className='bg-yellow-300 text-white px-2 py-1 md:px-4 md:py-2 cursor-pointer rounded-[7px] hover:bg-amber-200 hover:text-black transition-all duration-300 ease-in-out text-sm md:text-xl poppins-semi'>Users</button>
                                    <button
                                          onClick={() => { setshowBox("Feedbacks"), getFeedbackData() }}
                                          className='bg-yellow-300 text-white px-2 py-1 md:px-4 md:py-2 cursor-pointer rounded-[7px] hover:bg-amber-200 hover:text-black transition-all duration-300 ease-in-out text-sm md:text-xl poppins-semi'>Feedbacks</button>
                                    <button
                                          onClick={() => { setshowBox("Transactions"), getTransactionData() }}
                                          className='bg-yellow-300 text-white px-2 py-1 md:px-4 md:py-2 cursor-pointer rounded-[7px] hover:bg-amber-200 hover:text-black transition-all duration-300 ease-in-out text-sm md:text-xl poppins-semi'>Transactions</button>
                              </div>
                              {showBox === "Users" && <h2 className='text-center text-3xl bree md:mb-16 mb-8 mt-6'>ALL Users Data 👇👇</h2>}
                              {showBox === "Users" && <h2 className=' text-xl bree md:text-3xl  mt-2 md:mt-6 md:ml-6 ml-12 md:mb-0 mb-[-30px] '>Total Users({userData?.length})</h2>}
                              {showBox === "Transactions" && <h2 className='text-center text-3xl bree md:mb-16 mb-8 mt-6'>ALL Transactional Data 👇👇</h2>}
                              {showBox === "Transactions" && <h2 className=' text-xl bree md:text-3xl  mt-2 md:mt-6 md:ml-6 ml-6 md:mb-0 mb-[-30px] '>Total Transactions({transactionData?.length})</h2>}
                              {showBox === "Feedbacks" && <h2 className='text-center text-3xl bree md:mb-16 mb-8 mt-6'>ALL Feedbacks 👇👇</h2>}
                              {showBox === "Feedbacks" && <h2 className=' text-xl bree md:text-3xl  mt-2 md:mt-6 md:ml-6 ml-12 md:mb-0 mb-[-30px] '>Total Feedbacks({feedbackData?.length})</h2>}
                              <main className='p-4  flex flex-wrap gap-8 justify-center md:justify-start flex-start  rounded-2xl  hide-scrollbar overflow-auto mb-[30px] min-h-[60vh] md:min h-full '>

                                    {showBox === "Users" && (
                                          userData?.length === 0
                                                ? <div className="min-h-[60vh]" />
                                                : userData?.map((item, index) => (<div key={index}>


                                                      <div className="relative   bg-neutral-800 max-w-sm w-full mt-8  md:mx-0 mx-auto border border-default rounded-base shadow-xs rounded-[10px] ">
                                                            <div className='relative w-full h-24 md:h-36 bg-green-800 rounded-t-[12px]'>
                                                                  <button
                                                                        onClick={() => setOpenDropdownId(openDropdownId === item._id ? null : item._id)}
                                                                        className='float-right text-center mr-6 cursor-pointer mt-2  font-extrabold text-2xl  pb-3 h-[30px]'>. . .</button>
                                                                  {openDropdownId === item._id && <div className='bg-black  z-10 text-yellow-400 w-[150px]  absolute right-2 top-12'>

                                                                        <button
                                                                              onClick={() => { handleAssignPremium(item.Username, item.isPremium); setOpenDropdownId(null); }}
                                                                              className={`border-b-1 cursor-pointer border-white w-full ${item.isPremium ? 'text-red-400' : 'text-yellow-400'}`}>
                                                                              {item.isPremium ? '🔁 Remove Premium' : '⭐ Assign Premium'}
                                                                        </button>
                                                                        <button
                                                                              onClick={() => handleDelete(item.Username)}
                                                                              className='border-b-1 border-white cursor-pointer w-full'>Delete User</button>

                                                                  </div>}

                                                                  <div className='absolute min-w-[120px] min-h-[120px] rounded-full bg-gray-800 bottom-[-50px] left-[32%] text-6xl text-center flex items-center justify-center'>
                                                                        {item.Username.split("")[0]}
                                                                  </div>
                                                            </div>
                                                            <div className='w-full ml-4 mt-16 flex flex-col '>
                                                                  <div className='w-full p-2 flex gap-2'>
                                                                        <h3 className='poppins-bold'>Email:</h3>
                                                                        <p>{item.Email}</p>
                                                                  </div>
                                                                  <div className='w-full p-2 flex gap-2'>
                                                                        <h3 className='poppins-bold'>Full Name:</h3>
                                                                        <p>Zain ul Abdeen</p>
                                                                  </div>
                                                                  <div className='w-full p-2 flex gap-2 '>
                                                                        <h3 className='poppins-bold'>Username:</h3>
                                                                        <p>{item.Username}</p>
                                                                  </div>
                                                                  <div className='w-full p-2 flex gap-2 '>
                                                                        <h3 className='poppins-bold'>Country:</h3>
                                                                        <p>{item.Country}</p>
                                                                  </div>
                                                                  <div className='w-full p-2 flex gap-2 '>
                                                                        <h3 className='poppins-bold'>City:</h3>
                                                                        <p>{item.City}</p>
                                                                  </div>
                                                                  <div className='w-full p-2 flex gap-2'>
                                                                        <h3 className='poppins-bold'>Package:</h3>
                                                                        <p>{item.isPremium ? "Premium" : "Basic"}</p>
                                                                  </div>
                                                                  <div className='w-full p-2 flex gap-2 flex-wrap'>
                                                                        <h3 className='poppins-bold'>Account Creation Date:</h3>
                                                                        <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                                                                  </div>
                                                                  <div className='w-full p-2 flex gap-2 flex-wrap'>
                                                                        <h3 className='poppins-bold'>Provider:</h3>
                                                                        <p>{item.Provider ? "Google" : "Credentials"}</p>
                                                                  </div>
                                                                  <div className='w-full p-2 flex gap-2 '>
                                                                        <h3 className='poppins-bold'>Total Links:</h3>
                                                                        <p>{item.totalLinks}</p>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>)))}
                                    {showBox === "Feedbacks" && (
                                          feedbackData?.length === 0
                                                ? <div className="w-full min-h-fit flex items-center justify-center text-gray-200 text-xl">
                                                      No users found
                                                </div>
                                                : feedbackData?.map((item, index) =>
                                                (
                                                      <div className="relative h-fit   bg-neutral-800 max-w-sm w-full mt-8  md:mx-0 mx-auto border border-default rounded-base shadow-xs rounded-[10px] "> <div className='w-full px-2 py-1 flex gap-1 flex-wrap mt-2'>
                                                            <h3 className='poppins-bold'>Email:</h3>
                                                            <p>{item.Email}</p>
                                                      </div>
                                                       <div className='w-full px-2 py-1 flex gap-1 flex-wrap mt-2'>
                                                            <h3 className='poppins-bold'>Username:</h3>
                                                            <p>{item.Username}</p>
                                                      </div>
                                                            <div className='w-full px-2 py-1 flex gap-1 flex-col flex-wrap'>
                                                                  <h3 className='poppins-bold'>Feedback:</h3>
                                                                  <p>{item.Feedback}</p>
                                                            </div>
                                                             <div className='w-full px-2 py-1 flex gap-1 flex-wrap'>
                                                                  <h3 className='poppins-bold'>Blog Page No:</h3>
                                                                  <p>{item.blogPageNo}</p>
                                                            </div>
                                                             <div className='w-full px-2 py-1 flex gap-1 flex-wrap'>
                                                                  <h3 className='poppins-bold'>Posted at:</h3>
                                                                  <p>{new Date(item.createdAt).toUTCString()}</p>
                                                            </div>
                                                            </div>
                                                )))

                                    }
                                    {showBox === "Transactions" && (
                                          transactionData?.length === 0
                                                ? <div className="min-h-[60vh]" />
                                                : transactionData?.map((item, index) =>
                                                (<div key={index}>
                                                      <div className="relative   bg-neutral-800 max-w-sm w-full mt-8  md:mx-0 mx-auto border border-default rounded-base shadow-xs rounded-[10px] "> <div className='w-full p-2 flex gap-1 flex-wrap mt-2'>
                                                            <h3 className='poppins-bold'>Customer ID:</h3>
                                                            <p>{item.customerID}</p>
                                                      </div>
                                                            <div className='w-full p-2 flex gap-1 flex-wrap'>
                                                                  <h3 className='poppins-bold'>Transaction ID:</h3>
                                                                  <p>{item.transactionID}</p>
                                                            </div>
                                                            <div className='w-full p-2 flex gap-1 flex-wrap'>
                                                                  <h3 className='poppins-bold'>Email:</h3>
                                                                  <p>{item.email}</p>
                                                            </div>
                                                            <div className='w-full p-2 flex gap-1 flex-wrap'>
                                                                  <h3 className='poppins-bold'>Amount Paid:</h3>
                                                                  <p>{item.amountPaid}</p>
                                                            </div>
                                                            <div className='w-full p-2 flex gap-1 flex-wrap'>
                                                                  <h3 className='poppins-bold'>Premium Granted:</h3>
                                                                  <p>{item.premiumGranted ? "Yes" : "No"}</p>
                                                            </div>
                                                            <div className='w-full p-2 flex gap-1 flex-wrap'>
                                                                  <h3 className='poppins-bold'>Status:</h3>
                                                                  <p>{item.transactionStatus}</p>
                                                            </div>
                                                            <div className='w-full p-2 flex gap-1 flex-wrap'>
                                                                  <h3 className='poppins-bold'>Created At:</h3>
                                                                  <p>{new Date(item.createdAt).toLocaleDateString() + " " + new Date(item.createdAt).toLocaleTimeString()}</p>
                                                            </div>


                                                      </div>
                                                </div>)))}
                              </main>
                        </div>
                  </div>
            </>
      )
}

export default Page

