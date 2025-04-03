import React from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
const RightSidebar = () => {
  const { user, suggested } = useSelector((store) => store.auth);
  // console.log(user);
  // console.log(suggested);
  const navigate = useNavigate();
  const handleNavigation = (e) => {
    if (!user) {
      e.preventDefault(); // Prevent default <Link> behavior !IMPORTANT
      navigate("/login"); // Redirect to login
    }
  };
  return (
    <div className="hidden md:block border-l border-gray-600 px-4 py-8 w-full max-w-[300px]">
      <Link onClick={handleNavigation} to={`/profile/${user?.username}`} className=" flex gap-2 items-center">
        <Avatar>
          <AvatarImage
            src={user?.profilepic}
            alt="Profile_Image"
            className="object-cover "
            
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-sm font-normal">
          <div className="font-medium">{user?.username}</div>
          <div className="text-xs max-w-52">
            {user?.bio?.length == 0 ? "Bio here...." : user?.bio}
          </div>
        </div>
      </Link>
      {/* SuggestedUser */}
      <div className=" py-6">
        <div className="text-sm flex items-center justify-between pr-6">
          <div className=" text-gray-800 dark:text-gray-200">
            Suggested Users
          </div>
          <div className="font-medium">See All</div>
        </div>
        <div className="mt-6 overflow-y-auto h-60 max-h-96">
          {suggested?.length > 0 &&
            suggested?.map((user) => {
              return (
                <div key={user._id} className="flex space-y-2 justify-between pr-6 items-center">
                  <Link onClick={handleNavigation} to={`/profile/${user.username}`} className="flex gap-2 items-center">
                    <Avatar>
                      <AvatarImage
                        src={user?.profilepic}
                        alt="Profile_Image"
                        className="object-cover"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-normal">
                      <div className="font-medium truncate">{user?.username.slice(0,20)}</div>
                    </div>
                  </Link>

                  <div className="text-sky-600 cursor-pointer">follow</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
