import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'

const Posts = () => {
  const {posts}=useSelector(store=>store.post);
  return (
    <div className='flex flex-col gap-4 py-16 items-center justify-start overflow-y-auto border w-full'>
      
        
          {/* <Post/>
          <Post/>
          <Post/>
          <Post/>
          <Post/> */}
          {
            posts.map((post)=><Post key={post._id} post={post} />)
          }
          
      
      
    </div>
  )
}

export default Posts