import React, { useState } from "react";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Profile = () => {
  const { name } = useParams();
  const [show , setShow] = useState("Posts");
  console.log(show);
  // console.log(name);
  const { user } = useSelector((store) => store.auth);
  const { suggested } = useSelector((store) => store.auth);
  let otherUser;
  if (name === user?.username) {
    otherUser = [user];
  } else if (suggested.filter((user) => user.username === name)) {
    otherUser = suggested.filter((user) => user.username === name);
  } else {
    console.log("No user");
  }
  // console.log(otherUser);
  return (
    <Layout>
      {otherUser && (
        <div className="border border-gray-400 mx-auto px-6 py-12">
          <div className="header border w-full h-60 flex gap-4 border-white">
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
            <div className="border border-white w-2/3 flex flex-col gap-3">
                <div className="flex gap-6 items-center">
                  <div className="text-xl">{otherUser[0]?.username}</div>
                  <div className="bg-gray-700 px-4 py-1 rounded-md text-md">Edit profile</div>
                  <div>{otherUser?.username}</div>
                </div>
                <div className="flex gap-6 items-center"> 
                  <div>{otherUser[0]?.posts.length} <span className="text-gray-400">Posts</span></div>
                  <div>{otherUser[0]?.follower.length} <span className="text-gray-400">Followers</span></div>
                  <div>{otherUser[0]?.following.length} <span className="text-gray-400">Following</span></div>
                </div>
                <div>
                  {`${otherUser[0].bio.length === 0 ? "User Information not added yet" : otherUser[0].bio}`}
                </div>
            </div>
          </div>
          {/* Footer */}
          <div className="footer">
            <div className="flex border group group-hover:cursor-pointer gap-16 justify-center">
              <div onClick={()=>{setShow("Posts")}} className="bg-gray-800 px-3 py-1">Posts</div>
              <div onClick={()=>{setShow("Saved")}} className="bg-gray-800 px-3 py-1">Saved</div>
            </div>
            <div>
              {
                show === "Posts" ? (
                  <div>Pots</div>
                ) : (
                  <div>sved</div>
                )
              }
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
