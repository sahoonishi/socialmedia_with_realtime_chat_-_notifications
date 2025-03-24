import React from 'react'
import Sidebar from './Sidebar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className='flex flex-col md:flex-row h-screen'>
    <Sidebar/>
    <div className='w-full'>{children}</div>
    <Footer/>
    </div>
  )
}

export default Layout