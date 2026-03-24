"use client"
import Link from "next/link";
import {useEffect,useState} from "react"
import { initializePaddle } from "@paddle/paddle-js";
const Pricing = () => {
 const [Paddle, setPaddle] = useState();
 useEffect(()=>{

  initializePaddle({
   environment:"production",
   token:"live_a815729aae0584b88a5f9767dad",
  }).then((paddleData)=>{
   setPaddle(paddleData)})
 },[])
 async function handleCheckout(){
  if(!Paddle)console.log("Paddle Not Initialized")
  Paddle.Checkout.open({
   items:[
    {price_id: "pri_01kd65j8qqb4zjtaj9ebzsgqdw",quantity:1}
   ],
   settings:{
     displayMode:"overlay",
     theme:"dark",
     successUrl:"https://trimify.xyz/sign-up-to-trimify",
     closeCallback(){
      console.log("Checkout Clsose")
     }
   }
    
  })
 }

return (

<>
 
    <section className="min-h-screen bg-[#FFFDF8] py-16 px-4">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl bree-bold text-gray-900">
                Trim Your Links, Boost Your Brand
            </h1>
            <p className="mt-4 text-lg text-gray-600 poppins">
                Choose the plan that fits your growth. Simple, powerful, and flexible.
            </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-10 ">
            {/* BASIC PLAN */}
            <div className="w-[340px] bg-white border border-gray-300 rounded-3xl shadow-lg p-8 flex flex-col">
                <h2 className="text-2xl inter-bold text-center text-gray-800">
                    Basic Plan
                </h2>
                <p className="text-center text-gray-500 mt-2">For casual users</p>

                <div className="text-center mt-6">
                    <span className="text-5xl inter-bold">$0</span>
                    <p className="text-gray-500 mt-1">Forever free</p>
                </div>

                <ul className="mt-8 space-y-3 text-gray-700 poppins">
                    <li>✅ Dashboard access</li>
                    <li>✅ Non-expiry links</li>
                    <li>✅ Ad-free links</li>
                    <li>✅ QR code generation</li>
                    <li>✅ Click counter</li>
                </ul>

                <Link
                    href="sign-up-to-trimify"
                    className="mt-4 text-center border-2 border-black rounded-xl py-3 text-lg inter-bold hover:bg-gray-800 hover:text-white transition-all ease-in-out duration-300 cursor-pointer"
                >
                    Continue Free →
                </Link>
            </div>

    {/* PREMIUM PLAN */}
<div className="w-[360px] bg-gray-900 text-white rounded-3xl shadow-2xl p-8 flex flex-col relative scale-105">

    {/* Animated Badge */}
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm inter-bold animate-pulse">
        🔥 50% OFF – Limited Time
    </div>

    <h2 className="text-2xl inter-bold text-center">Premium Plan</h2>
    <p className="text-center text-gray-300 mt-2">
        Best for businesses & power users
    </p>

    <div className="text-center mt-6">
        <div className="flex items-center justify-center gap-3">
            <span className="text-2xl text-gray-400 line-through">$30</span>
            <span className="text-5xl inter-bold text-yellow-400">$15</span>
        </div>
        <p className="text-gray-400 mt-1">
            Lifetime access (only for first 3 months)
        </p>
    </div>

    <ul className="mt-8 space-y-3 text-gray-200 poppins">
        <li>✅ Everything in Basic</li>
        <li>✅ UTM tracking</li>
        <li>✅ Link expiry (by date or max clicks)</li>
        <li>✅ Password protection (coming soon)</li>
        <li>✅ Custom short aliases</li>
        <li>✅ QR code customization</li>
        <li>✅ Real-time analytics</li>
    </ul>

    <button
        onClick={handleCheckout}
        className="mt-6 bg-yellow-400 text-black rounded-xl py-3 text-lg inter-bold hover:bg-yellow-300 transition-all ease-in-out duration-300 cursor-pointer"
    >
        Get Premium →
    </button>
</div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 mt-14 text-sm poppins">
            Secure & easy to use • No credit card required for Basic • Lifetime updates
        </p>
    </section>
    </>
  )
}

export default Pricing;


















