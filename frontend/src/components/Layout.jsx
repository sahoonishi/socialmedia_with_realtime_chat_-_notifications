import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({children}) => {
  return (
    <div className='flex h-screen'>
    <Sidebar/>
    <div className='w-full'>{children}</div>
    </div>
  )
}

export default Layout