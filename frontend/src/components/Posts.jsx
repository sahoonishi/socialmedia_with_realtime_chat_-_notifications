import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Posts = () => {
  const { posts, loading } = useSelector((store) => store.post);
  return (
    <div className="flex flex-col gap-4 pb-20 py-2 md:py-16 items-center justify-start overflow-y-auto  w-full">
      {loading
        ? [...Array(5)].map((_, index) => (
          <div key={index} className="w-[95%] md:w-full max-w-md p-3 border rounded-lg shadow-md dark:bg-gray-900">
              {/* Profile Image & Username */}
              <div className="flex items-center gap-3 mb-3">
                <Skeleton circle width={40} height={40} />
                <Skeleton width={100} height={16} />
              </div>

              {/* Post Content (Image or Text) */}
              <Skeleton width="100%" height={250} className="rounded-lg" />

              {/* Post Caption */}
              <div className="mt-2">
                <Skeleton width="80%" height={16} />
                <Skeleton width="60%" height={16} />
              </div>

              {/* Like, Comment, Share Buttons */}
              <div className="flex gap-4 mt-3">
                <Skeleton width={30} height={20} />
                <Skeleton width={30} height={20} />
                <Skeleton width={30} height={20} />
              </div>
            </div>
          ))
        : posts?.map((post, index) => <Post key={index} post={post} />)}
    </div>
  );
};

export default Posts;
