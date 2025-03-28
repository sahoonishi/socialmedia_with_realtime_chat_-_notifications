import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
dotenv.config(); // write this on the top otherwise someties it wont work

const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// -----------------ROUTES-----------------
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/message", messageRouter);

server.listen(port, () => {
  connectDB();
  // console.log(`server running at ${port}`);
});
app.get("/", (_, res) => {
  return res.status(200).json({
    message: "I am backend , Express",
    success: true,
  });
});
