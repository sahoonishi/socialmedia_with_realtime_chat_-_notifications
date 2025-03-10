import express,{urlencoded} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config({}); // write this on the top otherwise someties it wont work

const app = express();
const port = process.env.PORT || 8000;

// middlewares 
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsOptions = {
  origin:"http://localhost:3000",
  credentials:true
}
app.use(cors(corsOptions));

app.listen(port , ()=>{
  connectDB();
  // console.log(`server running at ${port}`);
})
app.get("/",(_,res)=>{
  return res.status(200).json({
    message:"I am backend , Express",
    success:true
  })
})