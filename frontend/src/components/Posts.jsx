import React from 'react'
import Post from './Post'

const Posts = () => {
  return (
    <div className='flex flex-col gap-4 py-16 items-center justify-start overflow-y-auto border w-full'>
      
        
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>
          
      
      
    </div>
  )
}

export default Posts