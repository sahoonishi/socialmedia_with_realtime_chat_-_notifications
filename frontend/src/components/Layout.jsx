import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({children}) => {
  return (
    <div className='flex h-screen'>
    <Sidebar/>
    <div>{children}</div>
    </div>
  )
}

export default Layout