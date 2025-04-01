import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Link to={"/"} className='font-sans flex justify-center py-3 text-2xl sticky top-0 md:text-2xl w-full md:hidden md:pr-8 bg-white dark:bg-gray-900 z-50'>
      {/* 丅ᕼᖇᗴᗩᗪᒪƳ */}
      <div className='relative'>TᕼᖇEAᗪᒪY 
      <div className='size-12 overflow-hidden absolute -top-2 px-3 bg-gray-300 dark:bg-gray-700 -z-10 rounded-full'></div>
      </div>
      
    </Link>
  )
}

export default Header