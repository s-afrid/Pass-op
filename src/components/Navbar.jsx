import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-purple-200 flex justify-around items-center px-4 h-14'>
        <div className="logo font-bold">Pass-Op</div>
      <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href='/'>Home</a>
            <a className='hover:font-bold' href='/about'>About</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
