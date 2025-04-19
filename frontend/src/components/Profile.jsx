import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { toast } from "sonner";
// import default from './../../eslint.config';
import { FaRegHeart } from "react-icons/fa6";
import { MessageCircle } from "lucide-react";
import axios from "axios";
import useGetUserProfile from "../hooks/useGetUserProfile";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { setLoading } from "../redux/postSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  const { posts, loading } = useSelector((store) => store.post);
  const { name } = useParams();
  const [show, setShow] = useState("Posts");
  const [allPosts, setAllPosts] = useState();
  useGetUserProfile(user?._id);
  const { suggested } = useSelector((store) => store.auth);
  const { userprofile } = useSelector((store) => store.auth);
  useEffect(() => {
    const fetchAllPosts = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(
          `https://socialmedia-with-realtime-chat.onrender.com/api/post/getyourposts`,
          {
            withCredentials: true,
          }
        );

        if (res.data.suucess) {
          setAllPosts(res?.data?.posts);
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
        // toast.error(error.response.data.message);
      }
    };
    fetchAllPosts();
  }, []);
  let otherUser;
  if (name === user?.username) {
    otherUser = [user];
  } else if (suggested.filter((user) => user.username === name)) {
    otherUser = suggested.filter((user) => user.username === name);
  } else {
    toast.error("User not found");
  }
  return (
    <Layout>
      {otherUser && (
        <div className="overflow-y-auto h-[calc(100vh-4rem)] md:h-full mx-auto px-3 md:px-8 py-8 md:py-12">
          <div className="w-full h-60 flex gap-4">
            <div className="w-1/3 flex justify-center items-center h-full">
              <Avatar className="size-20 md:size-28 lg:size-40">
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
                <div className="text-lg md:text-xl">
                  {otherUser[0]?.username}
                </div>
                {otherUser[0]?._id === user._id ? (
                  <Link
                    to={`/editprofile/${otherUser[0]?.username}`}
                    className="px-2 py-1 md:px-4 md:py-2 rounded-sm md:rounded-md text-xs md:text-sm bg-gray-200 dark:bg-gray-800"
                  >
                    Edit profile
                  </Link>
                ) : (
                  <Button variant="secondary">Follow</Button>
                )}

                <div className="uppercase">{otherUser?.username}</div>
              </div>
              <div className="flex gap-4 md:gap-6 items-center">
                <div className="text-sm font-semibold md:text-lg">
                  {otherUser[0]?.posts?.length}{" "}
                  <span className="dark:text-gray-400 font-normal text-gray-900">
                    Posts
                  </span>
                </div>
                <div className="text-sm font-semibold md:text-lg">
                  {otherUser[0]?.follower.length}{" "}
                  <span className="dark:text-gray-400 font-normal text-gray-900">
                    Followers
                  </span>
                </div>
                <div className="text-sm font-semibold md:text-lg">
                  {otherUser[0]?.following.length}{" "}
                  <span className="dark:text-gray-400 font-normal text-gray-900">
                    Following
                  </span>
                </div>
              </div>
              <div className="text-sm md:text-lg">
                {`${
                  otherUser[0]?.bio.length === 0
                    ? "User Information not added yet"
                    : otherUser[0]?.bio
                }`}
              </div>
              <div className="capitalize text-sm md:text-lg">
                Gender-{otherUser[0]?.gender ?? ""}
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
                className={`px-2 py-1 md:px-3 text-md md:text-lg md:py-2 flex-1 rounded-l-md ${
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
                className={` px-2 py-1 md:px-3 md:py-2 text-md md:text-lg flex-1 rounded-r-md ${
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
                <div className="my-2 grid grid-cols-2 md:grid-cols-3 overflow-y-auto gap-2">
                  {name !== user.username
                    ? otherUser[0]?.posts?.map((post) => {
                        return (
                          <div
                            key={post._id}
                            className="border relative rounded-lg"
                          >
                            <img
                              src={post?.image}
                              alt="post"
                              className="object-cover h-full rounded-lg"
                            />
                            <div className="absolute flex gap-4 justify-center items-center bg-black/90 opacity-0 hover:opacity-75 transition-all duration-200 inset-0 rounded-lg text-white">
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
                      })
                    : loading
                    ? [...Array(5)].map((_, index) => (
                        <div
                          key={index}
                          className="w-[95%] md:w-full max-w-md p-3 border rounded-lg shadow-md"
                        >
                          {/* Profile Image & Username */}
                          <div className="flex items-center gap-3 mb-3">
                            <Skeleton circle width={40} height={40} />
                            <Skeleton width={100} height={16} />
                          </div>

                          {/* Post Content (Image or Text) */}
                          <Skeleton
                            width="100%"
                            height={250}
                            className="rounded-lg"
                          />

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
                    : allPosts?.map((post) => {
                        return (
                          <div
                            key={post._id}
                            className="border relative rounded-lg"
                          >
                            <img
                              src={post?.image}
                              alt="post"
                              className="object-cover h-full rounded-lg"
                            />
                            <div className="absolute flex gap-4 justify-center items-center bg-black/90 opacity-0 hover:opacity-75 transition-all duration-200 inset-0 rounded-lg text-white">
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
                      })}
                </div>
              ) : (
                <>
                  {name === user.username &&
                  userprofile?.bookmarks &&
                  userprofile?.bookmarks.length > 0 ? (
                    <div className="my-2 grid grid-cols-2 md:grid-cols-3 overflow-y-auto gap-2">
                      {userprofile?.bookmarks?.map((post) => {
                        return (
                          <div
                            key={post._id}
                            className="border relative rounded-lg"
                          >
                            <img
                              src={post?.image}
                              alt="post"
                              className="object-cover h-full rounded-lg"
                            />
                            <div className="absolute flex gap-4 justify-center items-center bg-black/90 opacity-0 hover:opacity-75 transition-all duration-200 inset-0 rounded-lg text-white">
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
                      })}
                    </div>
                  ) : (
                    <div className="md:py-16 py-6 flex items-center justify-center">
                      No saved posts
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
