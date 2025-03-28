import React from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { setSelectedUser } from "../redux/authSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Messages from "./Messages";
const Chat = () => {
  const { user, selectedUser, suggested } = useSelector((store) => store.auth);
  const status = true;
  const dispatch = useDispatch();

  return (
    <Layout>
      <section className="border border-white h-full w-full flex">
        <div className="w-1/4 relative border border-white h-full overflow-y-auto">
          <h1 className="border top-0 bg-white z-50 dark:bg-black  sticky border-white text-xl font-bold underline p-2">
            {user.username}
          </h1>
          <div className="border mt-2 border-white">
            {suggested?.map((user) => {
              return (
                <div
                  onClick={() => dispatch(setSelectedUser(user))}
                  key={user._id}
                  className="border cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center gap-1 text-sm px-1 py-2 border-white transition-colors"
                >
                  <Avatar className="size-10">
                    <AvatarImage
                      src={user.profilepic}
                      alt="Profile_Image"
                      className="object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{user.username}</div>
                    {status ? (
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
        <div className="w-3/4 overflow-y-auto h-full border border-white">
          {selectedUser ? (
            <div className="relative flex flex-col h-full">
              <div className=" sticky top-0 bg-white dark:bg-gray-800 px-1 py-2 flex gap-1 items-center">
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
              <Messages selectedUser={selectedUser}/>
              <div className="flex sticky bottom-0 items-center p-2">
                <Input type="text" placeholder="Type Message..." className="focus-visible:ring-transparent flex-1 mr-1" />
                <Button>Send</Button>
              </div>
            </div>
          ) : (
            <div className="flex h-full justify-center items-center">
              No message
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Chat;
