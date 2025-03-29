import { createContext, useContext } from "react";

export const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext); // ✅ Properly returning the context value
};

console.log(SocketContext); // This will only show that the context is created, not its actual value.
