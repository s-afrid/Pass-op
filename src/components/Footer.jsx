import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex justify-around items-center h-17 w-full flex-col md:flex-row gap-3 md:gap-0'>
        <div className="logo font-bold text-2xl">
        <span className='text-green-500'>&lt; </span>
        <span className='text-white'>Pass</span>
        <span className='text-green-400'> Op</span>
        <span className='text-green-500'> /&gt;</span>
        </div>
        <div className='flex'> Created with &nbsp;<img className='w-5' src='icons/heart.svg' alt='love' />&nbsp; by Syed Afrid</div>
     
    </div>
  )
}

export default Footer
