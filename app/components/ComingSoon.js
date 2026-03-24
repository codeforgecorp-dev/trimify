import React from 'react'
import { X } from 'lucide-react'
import Link from 'next/link'
const ComingSoon = ({setshowComingSoon}) => {
  return (
    <div className='w-full  backdrop-blur-xs  fixed inset-0 mx-auto my-auto text-center flex items-center justify-center md:p-0 p-2'>
    <div className='bg-gray-300 md:w-[35%] md:h-[35%] p-4 text-xl rounded-xl  z-10'>
        <div className='hover:bg-gray-50 transition-all duration-200 ease-in-out w-[35px] h-[35px] flex items-center justify-center rounded-full p-2 cursor-pointer' onClick={(prev)=>
        setshowComingSoon(!prev)
        }>
       <X  size={24}/>
       </div>
       <div className='flex flex-col gap-2 items-center'>
       <h2 className='text-2xl bree-bold'>Coming Soon . . .</h2>
       
       <p className='poppins-semi mt-1'>Till then you can enjoy all premium features in Basic Package .</p>
       <button className='bg-green-700 text-white p-2 rounded-2xl cursor-pointer mt-3 hover:bg-green-500 transition-all duration-200 ease-in-out'><Link href={"/sign-up-to-trimify"}>Proceed With Basic</Link></button>
       </div>
       </div>
    </div>
  )
}

export default ComingSoon
