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
const Footer = () => {
    const [open,setOpen]=useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth);
    
  
    //LOGOUT FUNCTION
    const logoutHandler = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/logout`,
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
      }else if(textType === "Create"){
        setOpen(true);
      }
    };
  const items = [
    // { icons: <Logo/>, text: "" },
    { icons: <Home />, text: "Home" },
    // { icons: <Search />, text: "Search" },
    { icons: <PlusSquare />, text: "Create" },
    // { icons: <TrendingUp />, text: "Explore" },
    { icons: <MessageCircle />, text: "Messages" },
    { icons: <Heart />, text: "Notifications" },
    
    {
      icons: (
        <Avatar>
          <AvatarImage src={`${user?.profilepic}`} className="object-cover" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icons: <LogOut />, text: "Logout" },
  ];
  return (
    <div className='md:hidden sticky bottom-0 flex justify-around bg-white dark:bg-gray-800'>
            {items.map((item, _) => {
        return (
          <div
            key={item.text}
            onClick={() => sidebarHandler(item.text)}
            className="relative rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 flex gap-2 items-center"
          >
            <div>{item.icons}</div>
            {/* <div>{item.text}</div> */}
          </div>
        );
      })}
      <ThemeToggle/>
            {/* <div className="flex justify-start px-4">
            <ThemeToggle/>
            </div> */}
    </div>
  )
}

export default Footer