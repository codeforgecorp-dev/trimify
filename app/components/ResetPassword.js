"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
const ResetPassword = () => {
    const [cooldown, setCooldown] = useState(0)
    const [disabled, setDisabled] = useState(false)
    const [userEmail, setuserEmail] = useState("")
    const [userName, setuserName] = useState("")
    const [showError, setShowError] = useState(false)
    const [emailError, setemailError] = useState("")
    const [showSuccess, setshowSuccess] = useState(false)
    const [OTPError, setOTPError] = useState("")
    const [emailBox, setemailBox] = useState(true)
    const [loading, setloading] = useState(false)
    const [otpVerificationBox, setotpVerificationBox] = useState(false)
    const [userOTP, setuserOTP] = useState("")
    const [showOTPError, setShowOTPError] = useState(false)
    const [passChangeBox, setpassChangeBox] = useState(false)
    const [newPass, setnewPass] = useState("")
    const [confirmPass, setconfirmPass] = useState("")
    const [showPassError, setshowPassError] = useState(false)
    const [passMsg, setpassMsg] = useState("")
    const [showSuccessBox, setshowSuccessBox] = useState(false)
    const [emailBtnDisabled, setemailBtnDisabled] = useState(false)
    const [otpBtnDisabled, setotpBtnDisabled] = useState(false)
    const [passBtnDisabled, setpassBtnDisabled] = useState(false)

    async function handleGenerateOTP() {
        if (!userEmail) {
            setShowError(true)
            setemailError("Please input your email")
            return
        }

        // Clear previous messages
        setShowError(false)
        setemailError("")
        setshowSuccess(false)
        setOTPError("")
        setShowOTPError(false)

        try {
            setloading(true)
            setemailBtnDisabled(true)

            const res = await fetch("/api/forget-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Emailid: userEmail })
            })

            const data = await res.json()
            console.log(data)

            if (data.success) {
                setemailBox(false)
                setotpVerificationBox(true)
                setCooldown(60)
                setDisabled(true)
                setuserName(data.username)
            } else {
                setemailBtnDisabled(false)
                setShowError(true)
                setemailError(data.msg || "Something went wrong")
            }

        } catch (err) {
            console.log(err)
            setShowError(true)
            setemailBtnDisabled(false)
            setemailError("Something went wrong")
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        if (cooldown <= 0) return
        const timeout = setTimeout(() => setCooldown(cooldown - 1), 1000)
        return () => clearTimeout(timeout)
    }, [cooldown])

    async function handleOTPVerification() {
        if (userOTP.length !== 6) {
            setShowOTPError(true)
            setOTPError("OTP must be exactly 6 digits")
            setshowSuccess(false)
            return
        }

        // Clear previous messages
        setShowOTPError(false)
        setOTPError("")
        setshowSuccess(false)

        try {
            setloading(true)
            setotpBtnDisabled(true)
            const verifyOTP = await fetch("/api/forget-password?validation=true", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Emailid: userEmail, OTP: userOTP.trim() })
            })
            const response = await verifyOTP.json()
            console.log(response)

            if (response.success) {
                setotpVerificationBox(false)
                setpassChangeBox(true)
                setshowSuccess(true)
                setShowOTPError(false)
                setOTPError("")
                setCooldown(0)
                setDisabled(false)
                
              
                setuserOTP("")
            } else {
                setShowOTPError(true)
                setOTPError(response.msg)
                setshowSuccess(false)
                setotpBtnDisabled(false)
            }
        } catch (err) {
            console.log(err)
            setShowOTPError(true)
            setotpBtnDisabled(false)
            setOTPError("Something went wrong")
            setshowSuccess(false)
        } finally {
            setloading(false)
        }
    }
    function validatePassword(password) {
        if (password.includes(" ")) {
            return "Password must be 8+ characters and include letters, numbers, and special characters";
        }

        if (password.length < 8) {
            return "Password must be 8+ characters and include letters, numbers, and special characters";
        }


        if (!/[0-9]/.test(password)) {
            return "Password must be 8+ characters and include letters, numbers, and special characters";
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return "Password must be 8+ characters and include letters, numbers, and special characters";
        }

        return null; // ✅ valid password
    }

    async function handlepassChange(params) {
        setshowPassError(false)
        if (newPass !== confirmPass) {
            setshowPassError(true)
            setpassMsg("Both Password must be same")
            return
        }

        const error = validatePassword(newPass)
        if (error) {
            setshowPassError(true)
            setpassMsg(error)
            return
        }
        try {
            setloading(true)
            setpassBtnDisabled(true)
            let changePass = await fetch("/api/forget-password?changePass=true", {
                method: "POST",
                headers: {
                    contentType: "application/json",
                },
                body: JSON.stringify({ Emailid: userEmail, newpass: newPass })
            })
            let response = await changePass.json()
            if (response.success) {
                setpassChangeBox(false)
                setshowSuccessBox(true)
                setuserEmail("")
                setShowError(false)
                setuserOTP("")
                setDisabled(false)


            } else {
                setshowPassError(true)
                setpassMsg(response.msg)
                setpassBtnDisabled(false)
                return
            }

        } catch {
            setshowPassError(true)
            setpassBtnDisabled(false)
            setpassMsg("Try Again Later")
        } finally {
            setloading(false)
        }
    }

    return (
        <div className='hero w-full min-h-[83vh] h-full  md:min-h-[80.5vh] flex justify-center p-5 md:p-8'>
            {emailBox && (
                <div className='min-h-[71vh] w-full md:w-[60vh] bg-gray-50 mx-auto rounded-2xl flex flex-col p-4 gap-12 border-2 relative z-10'>
                    <div>
                        <h1 className='bree-bold text-[28px] text-center mt-4'>You Forgot your Password 😢</h1>
                        <h2 className='pt-4 text-xl roboto-bold text-center px-2'>
                            But don't worry, you can recover your account in only 2 steps
                        </h2>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='inter-semi'>Enter Your Account Email:</h2>
                        <input
                            type="text"
                            value={userEmail}
                            onChange={(e) => setuserEmail(e.target.value)}
                            className='p-2 border-b-2 border-green-400 bg-white outline-none'
                            placeholder='Enter Your Email to find your Username'
                        />
                    </div>
                    {disabled && <p className='text-red-700 inter-bold mt-[-38px]'>Resend in {cooldown}s</p>}
                    {showError && <p className='text-red-700 inter-bold mt-[-38px]'>{emailError}</p>}
                    <button
                        disabled={emailBtnDisabled || loading}
                        className={`p-2 text-lg ${loading ? "bg-green-300" : "bg-green-400"} hover:bg-green-300 transition-all ease-in-out duration-300 rounded-md shadow-sm cursor-pointer poppins-semi mt-8`}
                        onClick={handleGenerateOTP}

                    >
                        {loading ? (
                            <div className='flex gap-1 items-center justify-center'>
                                <h3>Sending OTP</h3>
                                <span className="flex gap-1 ml-1">
                                    <span className='text-3xl rounded-full animate-bounce delay-0'>.</span>
                                    <span className='text-3xl rounded-full animate-bounce [animation-delay:0.15s]'>.</span>
                                    <span className='text-3xl rounded-full animate-bounce [animation-delay:0.3s]'>.</span>
                                </span>
                            </div>
                        ) : "Proceed For Recovery"}
                    </button>
                    <span className='text-sm text-gray-500 absolute bottom-8 right-2'>
                        Trimify Account Recovery Portal
                    </span>
                </div>
            )}

            {/* OTP Verification */}
            {otpVerificationBox && (
                <div className='min-h-[70vh] w-[60vh] bg-gray-50 mx-auto rounded-2xl flex flex-col p-4 gap-12 border-2 relative z-10'>
                    <div>
                        <h1 className='bree-bold text-[28px] text-center mt-4'>OTP Verification</h1>
                        <h2 className='pt-2 text-xl roboto-bold text-center px-2'>
                            We have sent you an OTP on your email id {userEmail}. Please put it in the field given below
                        </h2>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='mt-[-20px]'> <b>Account Username:</b> {userName}</h2>
                        <h2 className='inter-semi'>Put the OTP Sent to the Email:</h2>
                        <input
                            type="text"
                            value={userOTP}
                            onChange={(e) => setuserOTP(e.target.value)}
                            className='p-2 border-b-2 border-green-400 bg-white outline-none'
                            placeholder='Input the OTP'
                        />
                    </div>
                    <div className='mt-[-38px] text-end'>
                        {cooldown > 0 ? (
                            <p className='text-red-700 inter-bold underline'>
                                Resend in {cooldown}s
                            </p>
                        ) : (
                            <p
                                className='text-blue-600 inter-bold underline cursor-pointer hover:text-blue-400'
                                onClick={handleGenerateOTP}
                                disabled={emailBtnDisabled || loading}
                            >
                                Resend OTP
                            </p>
                        )}
                    </div>

                    {showSuccess && <p className='text-green-700 inter-bold mt-[-38px]'>OTP Verified Successfully</p>}
                    {showOTPError && <p className='text-red-700 inter-bold mt-[-38px]'>{OTPError}</p>}
                    <button
                        disabled={otpBtnDisabled || loading}
                        className={`p-2 text-lg ${loading ? "bg-green-300" : "bg-green-400"} hover:bg-green-300 transition-all ease-in-out duration-300 rounded-md shadow-sm cursor-pointer poppins-semi mt-2`}
                        onClick={handleOTPVerification}
                    >
                        {loading ? (
                            <div className='flex gap-1 items-center justify-center'>
                                <h3>Verifying OTP</h3>
                                <span className="flex gap-1 ml-1">
                                    <span className='text-3xl rounded-full animate-bounce delay-0'>.</span>
                                    <span className='text-3xl rounded-full animate-bounce [animation-delay:0.15s]'>.</span>
                                    <span className='text-3xl rounded-full animate-bounce [animation-delay:0.3s]'>.</span>
                                </span>
                            </div>
                        ) : "Verify the OTP"}
                    </button>
                    <span className='text-sm text-gray-500 absolute bottom-4 right-2'>
                        Trimify Account Recovery Portal
                    </span>
                </div>
            )}
            {passChangeBox && (
                <div className='min-h-[70vh] w-[60vh] bg-gray-50 mx-auto rounded-2xl flex flex-col p-4 gap-12 border-2 relative z-10'>
                    <div>
                        <h1 className='bree-bold text-[28px] text-center mt-4'>Change Your Password 😃</h1>
                        <h2 className='pt-4 text-xl roboto-bold text-center px-2'>
                            As OTP Verified, so you can finally change your account password whose email is <b>{userEmail}</b>
                        </h2>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='inter-semi'>Enter your New Password:</h2>
                        <input
                            type="text"
                            value={newPass}
                            onChange={(e) => setnewPass(e.target.value)}
                            className='p-2 border-b-2 border-green-400 bg-white outline-none'
                            placeholder='Enter new Password'
                        />
                        <h2 className='inter-semi'>Confirm your Password:</h2>
                        <input
                            type="text"
                            value={confirmPass}
                            onChange={(e) => setconfirmPass(e.target.value)}
                            className='p-2 border-b-2 border-green-400 bg-white outline-none'
                            placeholder='Re-enter the Password'
                        />
                    </div>

                    {showPassError && <p className='text-red-800 inter-bold mt-[-38px]'>{passMsg}</p>}

                    <button
                        disabled={passBtnDisabled || loading}
                        className={`p-2 mt-[-10px] text-lg ${loading ? "bg-green-300" : "bg-green-400"} hover:bg-green-300 transition-all ease-in-out duration-300 rounded-md shadow-sm cursor-pointer poppins-semi mt-8`}
                        onClick={handlepassChange}
                    >
                        {loading ? (
                            <div className='flex gap-1 items-center justify-center'>
                                <h3>Changing Password</h3>
                                <span className="flex gap-1 ml-1">
                                    <span className='text-3xl rounded-full animate-bounce delay-0'>.</span>
                                    <span className='text-3xl rounded-full animate-bounce [animation-delay:0.15s]'>.</span>
                                    <span className='text-3xl rounded-full animate-bounce [animation-delay:0.3s]'>.</span>
                                </span>
                            </div>
                        ) : "Change Password"}
                    </button>
                    <span className={`text-sm text-gray-500 absolute ${showPassError ? "bottom-4" : "bottom-8"} right-2`}>
                        Trimify Account Recovery Portal
                    </span>
                </div>
            )}
            {showSuccessBox && (
                <div className='my-auto h-[44vh] w-[60vh] bg-gray-50 mx-auto rounded-2xl flex flex-col p-4 gap-12 items-center border-2 relative z-10'>
                    <div>
                        <h1 className='bree-bold text-[28px] text-center mt-4 text-teal-800'>Your Password has been Changed Successfully 🍦</h1>
                        <h2 className='pt-4 text-xl roboto-bold text-center px-2 poppins-semi'>
                            Now you can easily re-login your account through your new password <b>{userEmail}</b>
                        </h2>
                    </div>
                    <button className='bg-green-500 w-[160px] p-2 rounded-lg text-xl inter-bold mt-[-15px]'><Link href={"/login"}>
                        Login Now
                    </Link></button>

                    <span className={`text-sm text-gray-500 absolute   bottom-4 right-2`}>
                        Trimify Account Recovery Portal
                    </span>
                </div>
            )}
        </div>
    )
}

export default ResetPassword  
