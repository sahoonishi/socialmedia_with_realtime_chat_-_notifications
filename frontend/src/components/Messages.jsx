import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
import useGetAllMessage from "../hooks/useGetAllMessage";
import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const Messages = () => {
  useGetRealTimeMessage();
  useGetAllMessage();
  const { messages } = useSelector((store) => store.chat);
  const { user } = useSelector((store) => store.auth);
  const messagesEndRef = useRef(null);

  // This will keep the latest message visible
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'end',
      inline: 'nearest'
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      <div className="flex flex-col gap-2">
        {messages?.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.sender === user._id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-40 md:max-w-md break-words shadow-lg ${
                msg.sender === user._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg?.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Messages;