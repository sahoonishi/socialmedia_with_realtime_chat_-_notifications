import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";
import { FiSend } from "react-icons/fi";
import { LiaBookmarkSolid } from "react-icons/lia";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Bookmark, MessageCircle, Send } from "lucide-react";
import CommentDialog from "./CommentDialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts } from "../redux/postSlice";

const Post = ({ post }) => {
  const [postText, setPostText] = useState("");
  const [open, setOpen] = useState(false); // Only for CommentDialog
  const [dialogOpen, setDialogOpen] = useState(false); // For controlling the dialog
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(post?.likes?.includes(user?._id) || false);
  const [totalLikes, setTotalLikes] = useState(post?.likes.length);

  const postTextHandler = (e) => {
    const text = e.target.value;
    setPostText(text.trim());
  };

  const postComment = () => {
    console.log(postText);
    setPostText("");
  };
  const likeHandler = async () => {
    try {
      const action = liked ? "dislikes" : "likes";
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/post/${post._id}/${action}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedLikes = liked ? totalLikes - 1 : totalLikes + 1;
        setTotalLikes(updatedLikes);
        setLiked(!liked);
        const updatedPostData = posts.map((item) =>
          item._id === post._id
            ? {
                ...item,
                likes: liked
                  ? item.likes.filter((id) => id !== user._id)
                  : [...item.likes, user._id],
              }
            : item
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const deletePost = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/post/delete/${post._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        const updatedPosts = posts.filter((item) => item?._id !== post?._id);
        dispatch(setPosts(updatedPosts));
        setDialogOpen(false); // Close the dialog
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="border flex flex-col w-96 max-h-sm">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <Avatar>
            <AvatarImage
              src={post?.author?.profilepic}
              alt="Profile_Image"
              className="object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>username</div>
          <div>13h</div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <BsThreeDotsVertical className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center">
            <Button variant="ghost" className="w-fit cursor-pointer">
              Unfollow
            </Button>
            <Button variant="ghost">Save post</Button>
            <Button variant="ghost">Share</Button>
            {user && user._id === post?.author?._id && (
              <Button
                variant="ghost"
                className="text-red-600 hover:text-red-600"
                onClick={deletePost}
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-lg h-[400px] max-h-[500px] w-full">
        <img
          src={post?.image}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex justify-between p-2">
        <div className="flex gap-4 justify-center items-center">
          {liked ? (
            <FaHeart
              size={24}
              className="text-red-500 transition-all hover:scale-110 cursor-pointer"
              onClick={likeHandler}
            />
          ) : (
            <FaRegHeart
              size={24}
              className="transition-all hover:scale-110 cursor-pointer"
              onClick={likeHandler}
            />
          )}
          <MessageCircle size={25} onClick={() => setOpen(true)} />
          <Send size={25} />
        </div>
        <Bookmark size={25} />
      </div>
      <div>
        <span className="block font-semibold border">{totalLikes} likes</span>
        <p>
          <span className="font-semibold">{post?.author?.username} </span>
          {post?.caption}
        </p>
        <span onClick={() => setOpen(true)}>View all 12 comments</span>
        <CommentDialog open={open} setOpen={setOpen} />
        <div className="flex px-1 justify-between items-center">
          <input
            type="text"
            value={postText}
            onChange={postTextHandler}
            placeholder="Add a comment..."
            className="focus:outline-none w-full text-sm"
          />
          {postText && (
            <div onClick={postComment} className="text-blue-500">
              post
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
