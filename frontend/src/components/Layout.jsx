import React from 'react'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Logo from './Logo'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div className='flex w-screen relative flex-col md:flex-row h-screen'>
    <Sidebar/>
    <Header/>
    <div className='w-full'>{children}</div>
    <div className="fixed bottom-0 w-full">
    <Footer/>
    </div>
    
    </div>
  )
}

export default Layout