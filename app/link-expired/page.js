import React from 'react'

const page = () => {
  return (
    <div className="relative bg-black min-h-[78vh]">
      {/* Centered modal */}
      <div className='fixed inset-0 flex justify-center items-center backdrop-blur-md'>
        <div className='bg-white rounded-xl w-[60vh] h-auto px-6 py-8 flex flex-col gap-2 relative'>
          <h1 className='inter-semi text-2xl text-center'>Sorry</h1>
          <span className='text-center poppins-bold text-2xl mt-[-2px]'>The Link has expired 😢</span>

          <main className=''>
            <h2 className='text-xl roboto-bold mt-2'>Why this happened:</h2>
            <ul className='list-disc ml-5 space-y-1 text-gray-700'>
              <li>The link reached the maximum number of clicks set by the creator.</li>
              <li>The link expired because the creator set an expiration date.</li>
              <li>The link was deleted or disabled by the creator.</li>
            </ul>

            <h2 className='text-xl roboto-bold mt-2 mb-2'>What you can do:</h2>
            <ul className='list-disc ml-5  text-gray-700'>
              <li>Contact the creator to get a new or active link.</li>
              <li>Create your own short link on <span className='font-bold'>Trimify</span> if you have an account.</li>
              <li>Check if there’s an alternative link from the source.</li>
            </ul>
          </main>

          {/* Footer / credit */}
          <span className='absolute bottom-1 right-3 mb-2 mt-4 text-sm text-gray-500'>
            Created by Trimify | Thanks for choosing Trimify
          </span>
        </div>
      </div>
    </div>
  )
}

export default page
