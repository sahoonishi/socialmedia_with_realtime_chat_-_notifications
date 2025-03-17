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
  return (
    <div className=" py-4 border-r border-gray-800 px-2 flex flex-col justify-around w-[15%]">
      {items.map((item, _) => {
        return (
          <div
            key={item.text}
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
