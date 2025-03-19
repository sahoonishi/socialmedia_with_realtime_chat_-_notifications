import { Post } from "../models/Post.model.js";
import sharp from "sharp";
import cloudinary from "./../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
// ADD NEW POST
export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;

    if (!image) {
      return res.status(400).json({
        message: "Image is required",
        success: false,
      });
    }

    // UPLOAD IMAGE
    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;
    const cloudResponse = await cloudinary.uploader.upload(fileUri);
    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });
    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }
    await post.populate({ path: "author", select: "-password" });
    return res.status(201).json({
      message: "Post created succcessfully",
      post,
      successs: true,
    });
  } catch (error) {
    console.error("Error in addNewPost:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
  
};
// GET ALL POST
export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username ,profilepic" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username,profilepic",
        },
      });
    return res.status(200).json({
      message: "All posts found",
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};
// GET YOUR POSTS
export const getYourPosts = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "username , profilepic",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username,profilepic",
        },
      });
    return res.status(200).json({
      message: "Your posts got",
      suucess: true,
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};
// LIKE POST
export const likePost = async (req, res) => {
  try {
    const whoLikes_id = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    await post.updateOne({ $addToSet: { likes: whoLikes_id } });
    await post.save();

    // IMPLEMENT REALTIME NOTIFICATION WITH SOCKET.IO  ..........................
    return res.status(200).json({ message: "Post Liked", success: true });
  } catch (error) {
    console.log(error);
  }
};
// DISLIKE POST
export const disLikePost = async (req, res) => {
  try {
    const whoDisLikes_id = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    await post.updateOne({ $addToSet: { likes: whoDisLikes_id } });
    await post.save();

    // IMPLEMENT REALTIME NOTIFICATION WITH SOCKET.IO  ..........................
    return res.status(200).json({ message: "Post Disliked", success: true });
  } catch (error) {
    console.log(error);
  }
};
// ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const whoCommentsId = req.id;
    const post = await Post.findById(postId);
    if (!text)
      return res
        .status(400)
        .json({ message: "Add comment first", success: false });
    const comment = await Comment.create({
      text,
      author: whoCommentsId,
      post: postId,
    }).populate({ path: "author", select: "username , profilepic" });
    post.comments.push(comment._id);
    await post.save();
    return res.status(201).json({
      message: "Comment added",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// GET COMMENTS OF A POST
export const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username,profilepic"
    );
    if (!comments)
      return res
        .status(404)
        .json({ message: "No comments found", success: false });
    return res.status(200).json({
      message: "All comments of this post got",
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
  }
};
// DELETE POST
export const deletePost = async (req, res) => {
  try {
    const authorId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "post not found", success: false });
    if (post.author.toString() !== authorId)
      return res.status(403).json({ message: "Unauthorized", success: false });
    await Post.findByIdAndDelete(postId);
    let user = await User.findById(authorId);
    user.posts = user.posts.filter((item) => item.toString() !== postId);
    await user.save();
    await Comment.deleteMany({ post: postId });
    return res
      .status(200)
      .json({ message: "Post deleted succcessfully", success: true });
  } catch (error) {
    console.log(error);
  }
};
// BOOKMARK POST
export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "post not found", success: false });
    const user = await User.findById(authorId);
    if (user.bookmarks.includes(post._id)) {
      // remove logic
      await user.updateOne({ $pull: { bookmarks: post._id } });
      await user.save();
      return res
        .status(200)
        .json({
          type: "unsaved",
          message: "Post removed from bookmark",
          success: true,
        });
    } else {
      // Add logic
      await user.updateOne({ $addToSet: { bookmarks: post._id } });
      await user.save();
      return res
        .status(200)
        .json({ type: "saved", message: "Post bookmarked", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};
