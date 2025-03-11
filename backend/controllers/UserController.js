import { User } from "../models/user.model.js";
import bcrypt from "bcrypt.js";
import jwt from "jsonwebtoken";
import { logout } from "./UserController";
import getDataUri from './../utils/dataURI';
// REGISTER
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Fill all details",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Email already exists , please login",
        success: false,
      });
    }
    const hasPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      username,
      email,
      password: hasPassword,
    });
    return res.status(201).json({
      message: "Account created succcessfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Fill all details",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome ${user.username}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
  }
};
// LOGOUT
export const logout = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "logout succcessfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// GET PROFILE
export const getProfile=async(req,res)=>{
  try {
    const userid=req.params.id;
    let user = await User.findById(userid);
    return res.status(200).json({
      user,
      success:true
    })
  } catch (error) {
        console.log(error);    
  }
}
// EDIT PROFILE
export const updateProfile=async(req,res)=>{
  try {
    const userId = req.id;
    const {bio,gender}=req.body;
    const profilepic = req.file;
    let cloudResponse;
    if(profilepic){
      const fileUri = getDataUri(profilepic);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }
  } catch (error) {
    console.log(error);
  }
}