import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { logout } from "./UserController";
import getDataUri from "./../utils/dataURI.js";
import { Post } from "../models/Post.model.js";
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
        message: "Email already exists,please login",
        success: false,
      });
    }
    const hasPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      username,
      email,
      password: hasPassword,
    });
    const userResponse = user.toObject();
    delete userResponse.password;
    return res.status(201).json({
      message: "Account created succcessfully",
      success: true,
      user:userResponse,
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
    const populatedPosts = await Promise.all(
      user?.posts?.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post?.author.equals(user._id)) {
          return post;
        }
        return null;
      })
    );
    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilepic: user.profilepic,
      bio: user.bio,
      follower: user.follower,
      following: user.following,
      posts: populatedPosts,
    };
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
export const getProfile = async (req, res) => {
  try {
    const userid = req.params.id;
    let user = await User.findById(userid).select("-password");
    return res.status(200).json({
      message: "Profile found",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// EDIT PROFILE
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender } = req.body;
    const profilepic = req.file;
    let cloudResponse;
    if (profilepic) {
      const fileUri = getDataUri(profilepic);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (bio) user.profilepic = cloudResponse?.secure_url;
    await user.save();
    return res.status(200).json({
      message: "profle updated",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
// GET SUGGESTED USERS
export const getSuggestedUsers = async (req, res) => {
  try {
    const getSuggestedusers = await User.find({ _id: { $ne: req.id } }).populate({path:'posts',select: "image likes comments",createdAt:-1});
    if (!getSuggestedusers) {
      return res.status(400).json({
        message: "No sugested users found",
      });
    }
    return res.status(200).json({
      message: "Suggested users found",
      users: getSuggestedusers,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// FOLLOW & UNFOLLOW
export const followUnfollow = async (req, res) => {
  try {
    const sourceId = req.id;
    const targetId = req.params.id;
    if (sourceId === targetId) {
      res.status(400).json({
        message: "You can not follow or unfolloe yourself",
        success: false,
      });
    }
    const sourceuser = await User.findById(sourceId);
    const targetuser = await User.findById(targetId);
    if (!sourceuser || !targetuser) {
      res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const isFollowing = await sourceuser.following.includes(targetId);
    if (isFollowing) {
      // unfollow logic
      await Promise.all([
        User.updateOne({ _id: sourceId }, { $pull: { following: targetId } }),
        User.updateOne({ _id: targetId }, { $pull: { following: sourceId } }),
      ]);
      return res.status(200).json({
        message: `You have unfollowed ${targetuser.username}`,
        success: true,
        Unfolloweduser: targetuser,
        you: sourceuser,
      });
    } else {
      // follow logic
      await Promise.all([
        User.updateOne({ _id: sourceId }, { $push: { following: targetId } }),
        User.updateOne({ _id: targetId }, { $push: { follower: sourceId } }),
      ]);
      return res.status(200).json({
        message: `You have followed ${targetuser.username}`,
        success: true,
        followeduser: targetuser,
        you: sourceuser,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
