"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Loader from '@/app/components/Loader'

const page = () => {
  const [password, setpassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [showError, setshowError] = useState("")
  const [loading, setloading] = useState(false)
  const params=useParams();
  const { shortName } = params;
 
  async function handleVerification(){
    setshowError("")
    setloading(true)
    if(password!==confirmPassword){
             setshowError("Password does not match")     
             return
    }
     
       let req=await fetch(`/api/verifylink?Shortname=${shortName}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({Password:password})
       })
       let response=await req.json()
       if(response.error===404){
         window.location.href="/link-expired"
       }if(response.error){
         setshowError(response.error)
       }
       if(response.success){
        window.location.href=response.URL2redirect
       }
       setloading(false)
  }

  return (
    <div className='w-full min-h-[79vh] flex justify-center items-center p-3'>
      <div className='bg-yellow-200 text-black w-full md:w-[40%] min-h-fit md:min-h-[60vh] flex flex-col gap-4 justify-center items-center mt-[-40px] rounded-[8px] p-8'>
        <div className='mb-[30px] flex justify-center items-center flex-col gap-4'>
          <h1 className='text-xl md:text-3xl font-bold bree-bold'>This Link {shortName} is Password Protected 🔐</h1>
          <p className='text-xs md:text-lg poppins-semi'>Enter the Url Password to continue Redirection</p></div>
        <div className='flex flex-col gap-2 ' >
          <div className='flex flex-col gap-6  '>
            <input type="password" placeholder='Enter the Password' className='w-[40vh] outline-none border-b-2 ' value={password} onChange={(e)=>setpassword(e.target.value)} />
            <input type="password" placeholder='Confirm Password' className='w-[40vh] outline-none border-b-2 ' value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)}/>
             {showError && <p className="text-red-800 mt-[-20px] poppins-semi">{showError}</p>}

            </div>
            {loading && <Loader/>}
          <button className='bg-green-300 text-black w-full rounded-[4px] p-4 mt-4 cursor-pointer' onClick={handleVerification}>Redirect Now</button>
        </div>
      </div></div>
  )
}

export default page
