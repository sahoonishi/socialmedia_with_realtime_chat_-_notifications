import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { toast } from "sonner";
// import default from './../../eslint.config';
import { FaRegHeart } from "react-icons/fa6";
import { MessageCircle } from "lucide-react";
import axios from "axios";

const Profile = () => {
  const { name } = useParams();
  const [show, setShow] = useState("Posts");
  const [allPosts, setAllPosts] = useState();
  // console.log(show);
  // console.log(name);
  const { user } = useSelector((store) => store.auth);
  const { suggested } = useSelector((store) => store.auth);
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/post/getyourposts`,
          {
            withCredentials: true,
          }
        );
        if (res.data.suucess) {
            setAllPosts(res.data.posts);
        }
      } catch (error) {
        console.log(error);
        
        // toast.error(error.response.data.message);
      }
    };
    fetchAllPosts();
  },[]);
  console.log(allPosts)
  let otherUser;
  if (name === user?.username) {
    otherUser = [user];
  } else if (suggested.filter((user) => user.username === name)) {
    otherUser = suggested.filter((user) => user.username === name);
    
  } else {
    toast.error("User not found");
    console.log("No user");
  }
  console.log(otherUser);
  return (
    <Layout>
      {otherUser && (
        <div className="overflow-y-auto h-full mx-auto px-8 py-12">
          <div className="w-full h-60 flex gap-4">
            <div className="w-1/3 flex justify-center items-center h-full">
              <Avatar className="size-40">
                <AvatarImage
                  src={otherUser[0]?.profilepic}
                  alt="Profile_Image"
                  className="object-cover"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className=" w-2/3 flex flex-col gap-3">
              <div className="flex gap-6 items-center">
                <div className="text-xl">{otherUser[0]?.username}</div>

                <Link
                  to={`/editprofile/${otherUser[0]?.username}`}
                  className=" px-4 py-2 rounded-md text-sm bg-gray-200 dark:bg-gray-800"
                >
                  Edit profile
                </Link>
                <div className="uppercase">{otherUser?.username}</div>
              </div>
              <div className="flex gap-6 items-center">
                <div>
                  {otherUser[0]?.posts?.length}{" "}
                  <span className="text-gray-400">Posts</span>
                </div>
                <div>
                  {otherUser[0]?.follower.length}{" "}
                  <span className="text-gray-400">Followers</span>
                </div>
                <div>
                  {otherUser[0]?.following.length}{" "}
                  <span className="text-gray-400">Following</span>
                </div>
              </div>
              <div>
                {`${
                  otherUser[0]?.bio.length === 0
                    ? "User Information not added yet"
                    : otherUser[0]?.bio
                }`}
              </div>
              <div className="capitalize">
                Gender -{otherUser[0]?.gender ?? ""}
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="footer">
            <div className="flex group group-hover:cursor-pointer justify-center">
              <button
                variant="secondary"
                onClick={() => {
                  setShow("Posts");
                }}
                className={` px-3 py-2 flex-1 rounded-l-md ${
                  show === "Posts"
                    ? "transition-colors duration-300 bg-gray-300  dark:bg-gradient-to-r from-gray-700 to-gray-900  "
                    : ""
                }`}
              >
                Posts
              </button>
              <button
                variant="secondary"
                onClick={() => {
                  setShow("Saved");
                }}
                className={` px-3 py-2 flex-1 rounded-r-md ${
                  show === "Saved"
                    ? "transition-colors duration-300  dark:bg-gradient-to-l from-gray-700 to-gray-900 bg-gray-300"
                    : ""
                }`}
              >
                Saved
              </button>
            </div>
            <div>
              {show === "Posts" ? (
                <div className="my-2 grid grid-cols-3 overflow-y-auto gap-2">
                  {name !== user.username ? ( otherUser[0].posts?.map((post) => {
                    return (
                      <div key={post._id} className="border relative rounded-lg">
                        <img
                          src={post?.image}
                          alt="post"
                          className="object-cover h-full rounded-lg"
                        />
                        <div className="absolute flex gap-4 justify-center items-center bg-black/90 opacity-0 hover:opacity-75 transition-all duration-200 inset-0">
                          <div className="flex">
                            <FaRegHeart size="20" className="mr-1" />
                            {post?.likes?.length ?? 0}
                          </div>
                          <div className="flex gap-1">
                            <MessageCircle size="20" className="mr-1" />{" "}
                            {post?.comments?.length ?? 0}
                          </div>
                        </div>
                      </div>
                    );
                  })) : ( allPosts?.map((post) => {
                    return (
                      <div key={post._id} className="border relative rounded-lg">
                        <img
                          src={post?.image}
                          alt="post"
                          className="object-cover h-full rounded-lg"
                        />
                        <div className="absolute flex gap-4 justify-center items-center bg-black/90 opacity-0 hover:opacity-75 transition-all duration-200 inset-0">
                          <div className="flex">
                            <FaRegHeart size="20" className="mr-1" />
                            {post?.likes?.length ?? 0}
                          </div>
                          <div className="flex gap-1">
                            <MessageCircle size="20" className="mr-1" />{" "}
                            {post?.comments?.length ?? 0}
                          </div>
                        </div>
                      </div>
                    );
                  })) }
                </div>
              ) : (
                <div>
                  {otherUser[0]?.bookmarks &&
                  otherUser[0]?.bookmarks.length > 0 ? (
                    <div></div>
                  ) : (
                    <div className="py-6 flex items-center justify-center">
                      No saved posts
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
