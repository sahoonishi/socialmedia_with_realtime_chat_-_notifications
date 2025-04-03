import React, { useEffect, useState } from "react";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Post from "./components/Post";
import Editprofile from "./components/Editprofile";
import Chat from "./components/Chat";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setOnlineUsers } from "./redux/chatSlice";
import { SocketContext } from "./context/SocketContext";
import { setLikeNotification } from "./redux/notificationSlice";
const App = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null); // ✅ Use local state for socket

  useEffect(() => {
    if (user) {
      const socketio = io(
        "https://socialmedia-with-realtime-chat.onrender.com",
        {
          query: { userId: user._id },
          transports: ["websocket"],
        }
      );

      setSocket(socketio); // ✅ Store socket in React state instead of Redux

      // Listen for online users
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      socketio.on("notification", (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        setSocket(null);
      };
    }
    // else if(socket){
    //   socket?.close();
    //   setSocket(null);
    // }
  }, [user, dispatch]);

  console.log(socket);

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:name" element={<Profile />} />
          <Route path="/editprofile/:name" element={<Editprofile />} />
          <Route path="/post" element={<Post />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
};

export default App;
