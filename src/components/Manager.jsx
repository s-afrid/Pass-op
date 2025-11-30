import React from 'react'

const Manager = () => {
  return (
    <div>

      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

        <div className="bg-slate-50 mycontainer">

            <h1 className='text-4xl font-bold text-center'>
              <span className='text-green-700'>&lt; </span>
        <span>Pass</span>
        <span className='text-green-500'> Op</span>
        <span className='text-green-700'> /&gt;</span>
            </h1>
            <p className='text-green-900 text-lg text-center'>Your own password manager</p>

            <div className="flex flex-col p-4 gap-5">
            <input className='bg-white rounded-full border border-green-500 w-full px-4 py-1' type="text" name="" id="" />
            <div className="flex w-full justify-between gap-4">
                <input className='bg-white rounded-full border border-green-500 w-full px-4 py-1' type="text" />
                <input className='bg-white rounded-full border border-green-500 w-full px-4 py-1' type="text" />
            </div>
            <button>Add Password</button>
        </div>

        </div>

    </div>
  )
}

export default Manager
