import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
import useGetAllMessage from "../hooks/useGetAllMessage";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../context/SocketContext";

const Messages = () => {
  useGetRealTimeMessage();
  useGetAllMessage();
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  
  // Create a ref for the messages container
  const messagesContainerRef = useRef(null);
  
  // Scroll to bottom on initial load
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    };
    
    // Scroll immediately
    scrollToBottom();
    
    // Also try scrolling after a short delay to ensure content is fully rendered
    const timeoutId = setTimeout(scrollToBottom, 100);
    
    return () => clearTimeout(timeoutId);
  }, [messages]); // Depend on messages so it scrolls when they change

  return (
    <div 
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto border px-6 py-4 border-yellow-200"
    >
      <div className="flex flex-col gap-2">
        {messages?.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.sender === user._id ? "justify-end" : "justify-start"
            }`}
          >
            <div className="bg-gradient-to-l from-gray-900 to-emerald-900 text-white px-4 py-2 rounded-xl max-w-sm break-words shadow-lg">
              {msg?.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;