import { addMessage } from "../redux/chatSlice"; // Assume you have this action
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSocket } from "../context/SocketContext";

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  
  useEffect(() => {
    if (!socket) return;
    
    console.log("Setting up socket listener for newMessage");
    
    const handleNewMessage = (newMsg) => {
      console.log("New message received:", newMsg);
      dispatch(addMessage(newMsg)); // Use an action that adds a single message
    };
    
    socket.on("newMessage", handleNewMessage);
    
    return () => {
      console.log("Cleaning up socket listener");
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch]); // Only depend on socket and dispatch, not messages
};

export default useGetRealTimeMessage;