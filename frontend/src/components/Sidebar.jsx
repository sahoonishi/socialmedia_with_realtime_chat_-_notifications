import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const items = [
  // { icons: <Logo/>, text: "" },
  { icons: <Home />, text: "Home" },
  { icons: <Search />, text: "Search" },
  { icons: <TrendingUp />, text: "Explore" },
  { icons: <MessageCircle />, text: "Messages" },
  { icons: <Heart />, text: "Notifications" },
  { icons: <PlusSquare />, text: "Create post" },
  {
    icons: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  { icons: <LogOut />, text: "Logout" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  //                                        LOGOUT FUNCTION
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  //                                    WHOLE SIDEBAR FUNCTION
  const sidebarHandler = (textType) => {
    if (textType === "Logout") logoutHandler();
  };
  return (
    <div className=" py-4 border-r border-gray-800 px-2 flex flex-col justify-around w-[15%]">
      {items.map((item, _) => {
        return (
          <div
            key={item.text}
            onClick={() => sidebarHandler(item.text)}
            className="relative rounded-lg p-3 cursor-pointer hover:bg-gray-100 flex gap-2 items-center"
          >
            <div>{item.icons}</div>
            <div>{item.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
