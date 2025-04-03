import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setSelectedUser } from "../redux/authSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Messages from "./Messages";
import axios from "axios";
import { setMessages } from "../redux/chatSlice";
const Chat = () => {
  const [message, setMsg] = useState("");
  const { user, selectedUser, suggested } = useSelector((store) => store.auth);
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const dispatch = useDispatch();

  const messageHandler = async (recieverId) => {
    try {
      const res = await axios.post(
        `https://socialmedia-with-realtime-chat.onrender.com/api/message/send/${recieverId}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setMsg("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default to avoid newline
      messageHandler(selectedUser._id);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

  return (
    <Layout>
      <section className=" h-[calc(100vh-4rem)] md:h-full lg:h-full w-full flex">
        <div
          className={`w-full lg:w-1/4 ${
            selectedUser ? "hidden" : ""
          } relative h-full overflow-y-auto`}
        >
          <h1 className="top-0 bg-white z-50 dark:bg-black  sticky  text-xl font-bold underline p-2">
            {user.username}
          </h1>
          <div className="mt-2 overflow-y-auto h-20 md:h-40">
            {suggested?.map((userr) => {
              const isOnline = onlineUsers?.includes(userr._id);
              return (
                <div
                  onClick={() => dispatch(setSelectedUser(userr))}
                  key={userr._id}
                  className={`border cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center gap-1 text-sm px-1 py-2 transition-colors ${
                    user._id === userr._id ? "hidden" : ""
                  }`}
                >
                  <Avatar className="size-10">
                    <AvatarImage
                      src={userr.profilepic}
                      alt="Profile_Image"
                      className="object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{userr.username}</div>
                    {isOnline ? (
                      <div className="text-green-500 text-xs font-semibold">
                        online
                      </div>
                    ) : (
                      <div className="text-pink-700 text-xs font-semibold">
                        offline
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-3/4 flex-1 flex flex-col h-full">
          {selectedUser ? (
            <>
              <div className="border-t border-gray-300 dark:border-gray-800 sticky top-0 z-10 bg-gray-100 dark:bg-gray-800 px-1 py-2 flex gap-1 items-center">
                <Avatar className="size-10">
                  <AvatarImage
                    src={selectedUser.profilepic}
                    alt="Profile_Image"
                    className="object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>{selectedUser.username}</div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <Messages selectedUser={selectedUser} />
              </div>

              <div className="sticky bottom-0 z-10 bg-white dark:bg-gray-800 ">
                <div className="flex items-center p-2">
                  <Input
                    value={message}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setMsg(e.target.value)}
                    type="text"
                    placeholder="Type Message..."
                    className="focus-visible:ring-transparent flex-1 mr-1"
                  />
                  <Button onClick={() => messageHandler(selectedUser._id)}>
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="hidden md:flex h-full justify-center items-center">
              Click User to send{" "}
              <div className="bg-sky-400 px-2 py-1 ml-2 rounded-md">
                Message
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Chat;
