import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const Posts = () => {
  const { posts } = useSelector((store) => store.post);
  return (
    <div className="flex flex-col gap-4 pb-20 py-2 md:py-16 items-center justify-start overflow-y-auto  w-full">
      {posts?.map((post,index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

export default Posts;
