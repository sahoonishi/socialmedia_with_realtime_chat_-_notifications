import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const userSocketMap = {}; //! This object stores the userId & the corresponding socketid
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(
      `user connected with userid: ${userId} and socketid ${socket.id}`
    );
  }
  io.emit('getOnlineUsers',Object.keys(userSocketMap));

  socket.on('disconnection',()=>{
    if(userId){
      console.log(
        `user connected with userid: ${userId} and socketid ${socket.id}`
      );
      delete userSocketMap[userId];
    }
    io.emit('getOnlineUsers',Object.keys(userSocketMap));
  })
});

export {io,server,app};
