import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/authSlice";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "../redux/postSlice";
import ThemeToggle from "./dark";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import Logo from "./Logo";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { likenotification } = useSelector((store) => store.notification);

  //LOGOUT FUNCTION
  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `https://socialmedia-with-realtime-chat.onrender.com/api/user/logout`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  //WHOLE SIDEBAR FUNCTION
  const sidebarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      if (user) {
        setOpen(true);
      } else {
        navigate(`/login`);
      }
    } else if (textType === "Profile") {
      if (user) {
        navigate(`/profile/${user?.username}`);
      } else {
        navigate(`/login`);
      }
    } else if (textType === "Home") {
      navigate(`/`);
    } else if (textType === "Messages") {
      if (user) {
        navigate(`/chat`);
      } else {
        navigate(`/login`);
      }
    } else if (textType === "") {
      navigate(`/`);
    } else if (textType === "Login") {
      navigate(`/login`);
    }
  };
  const items = [
    { icons: <Logo />, text: "" },
    { icons: <Home />, text: "Home" },
    { icons: <Search />, text: "Search" },
    { icons: <TrendingUp />, text: "Explore" },
    { icons: <MessageCircle />, text: "Messages" },
    { icons: <Heart />, text: "Notifications" },
    { icons: <PlusSquare />, text: "Create" },
    {
      icons: (
        <Avatar>
          <AvatarImage src={`${user?.profilepic}`} className="object-cover" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icons: user ? <LogOut /> : <LogOut />, text: user ? "Logout" : "Login" },
  ];
  return (
    <div className="hidden py-4 border-r border-gray-800 dark:border-gray-600 px-2 md:flex flex-col justify-around w-[25%]">
      {items.map((item, _) => {
        return (
          <div
            key={item.text}
            onClick={() => sidebarHandler(item.text)}
            className="relative rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 flex gap-2 items-center"
          >
            <div>{item.icons}</div>
            <div>{item.text}</div>
            {item.text === "Notifications" && likenotification?.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="icon"
                    className="size-5 bg-red-600 hover:bg-red-600 rounded-full absolute bottom-6  left-7"
                  >
                    {likenotification?.length}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-1 justify-center px-4 py-2 overflow-y-auto max-h-16">
                    {likenotification?.length === 0 ? (
                      <p>No new Notification</p>
                    ) : (
                      likenotification?.map((notif) => {
                        return (
                          <div
                            key={notif.userId}
                            className="flex items-center gap-3"
                          >
                            <Avatar className="size-10">
                              <AvatarImage
                                src={notif?.userdetails?.profilepic}
                                alt="Profile_Image"
                                className="object-cover"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-md">
                              <span className="font-semibold mr-1">
                                {notif?.userdetails.username}
                              </span>
                              liked your post
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        );
      })}
      <CreatePost open={open} setOpen={setOpen} />
      <div className="flex justify-start px-4">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
