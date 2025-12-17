import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>

      <div className="mycontainer flex justify-around items-center px-4 py-5 h-14">
      <div className="logo font-bold text-2xl">
        <span className='text-green-500'>&lt; </span>
        <span>Pass</span>
        <span className='text-green-400'> Op</span>
        <span className='text-green-500'> /&gt;</span>
        </div>
      
      <button className='text-white bg-green-600 flex items-center my-3 px-1 rounded-full justify-center'>
        <img className='invert py-2 px-2 w-10' src="icons/github.svg" alt="" />
        <span className='py-2 px-2'>GitHub</span>
      </button>
      </div>
        
    </nav>
  )
}

export default Navbar
