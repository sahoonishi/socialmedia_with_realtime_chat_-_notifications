import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import messageRouter from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";
dotenv.config(); // write this on the top otherwise someties it wont work

const port = process.env.PORT || 8000;
const __dirname = path.resolve();
// console.log(__dirname , "---------");
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
// const corsOptions = {
//   // origin: "https://threadlynew.vercel.app",
//   origin: "http://localhost:5173",
//   // origin: true,
//   credentials: true,
// };
const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));                  
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
//     credentials: true, // Allow cookies and authentication headers
//   })
// );
// app.use(
//   cors({
//     origin: true,  // Allow all origins temporarily for testing
//     credentials: true,
//   })
// );

// -----------------ROUTES-----------------
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/message", messageRouter);

app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
})

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
