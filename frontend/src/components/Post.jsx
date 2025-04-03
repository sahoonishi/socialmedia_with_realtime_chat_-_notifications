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
import { setPosts, setSelectedPost } from "../redux/postSlice";
import { formatDistanceToNow } from "date-fns";
import { setAuthUser } from "../redux/authSlice";
import { fetchUserData } from "../lib/fetchUserData";
import { Link, useNavigate } from "react-router-dom";
const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false); // Only for CommentDialog
  const [dialogOpen, setDialogOpen] = useState(false); // For controlling the dialog
  const { user, userprofile } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const handleNavigation = (e) => {
    if (!user) {
      e.preventDefault(); // Prevent default <Link> behavior
      navigate("/login"); // Redirect to login
    }
  };
  const [mark, setMark] = useState(
    userprofile?.bookmarks?.some((a) => a._id === post._id)
  ); // Only for Bookmark
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(post?.likes?.includes(user?._id) || false);
  const [totalLikes, setTotalLikes] = useState(post?.likes.length);
  const [comment, setComment] = useState(post?.comments);
  const postTextHandler = (e) => {
    const text = e.target.value;
    setText(text);
  };
  const postComment = () => {
    setPostText("");
  };
  const likeHandler = async () => {
    if (!user) return toast.error(" Please Login");
    try {
      const action = liked ? "dislikes" : "likes";
      const res = await axios.get(
        `https://socialmedia-with-realtime-chat.onrender.com/api/post/${post._id}/${action}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedLikes = liked ? totalLikes - 1 : totalLikes + 1;
        setTotalLikes(updatedLikes);
        setLiked(!liked);
        const updatedPostData = posts?.map((item) =>
          item._id === post._id
            ? {
                ...item,
                likes: liked
                  ? item?.likes?.filter((id) => id !== user?._id)
                  : [...item?.likes, user._id],
              }
            : item
        );
        dispatch(setPosts(updatedPostData));
        const updatedUser = user?.posts?.map((item) =>
          item._id === post._id
            ? {
                ...item,
                likes: liked
                  ? item.likes.filter((id) => id !== user._id)
                  : [...item.likes, user._id],
              }
            : item
        );
        dispatch(
          setAuthUser({
            ...user, // Keep other user properties
            posts: updatedUser, // Update only posts
          })
        );
        // dispatch( setAuthUser(await fetchUserData(user._id)));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `https://socialmedia-with-realtime-chat.onrender.com/api/post/${post._id}/addcomment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedComments = [...comment, res.data.comment];
        setComment(updatedComments);
        const updatedPostData = posts.map((item) =>
          item?._id === post?._id
            ? { ...item, comments: updatedComments }
            : item
        );
        dispatch(setPosts(updatedPostData));
        const updatedUser = user?.posts?.map((item) =>
          item._id === post._id
            ? {
                ...item,
                comments: [...item.comments, user._id],
              }
            : item
        );
        dispatch(
          setAuthUser({
            ...user, // Keep other user properties
            posts: updatedUser, // Update only posts
          })
        );
        // dispatch(setAuthUser(await fetchUserData(user._id)));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };
  const deletePost = async () => {
    try {
      const res = await axios.delete(
        `https://socialmedia-with-realtime-chat.onrender.com/api/post/delete/${post._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        const updatedPosts = posts.filter((item) => item?._id !== post?._id);
        dispatch(setPosts(updatedPosts));
        dispatch(
          setAuthUser({
            ...user,
            posts: [...user.posts].filter((item) => item._id !== post._id),
          })
        );
        setDialogOpen(false); // Close the dialog
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };
  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(
        `https://socialmedia-with-realtime-chat.onrender.com/api/post/${post._id}/bookmark`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setMark((prev) => !prev);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };
  return (
    <div className=" flex flex-col w-[90vw] md:w-72 lg:w-96 max-h-sm">
      <div className="flex justify-between items-center">
        <Link
          to={`/profile/${post?.author?.username}`}
          className="flex items-center gap-1"
          onClick={handleNavigation}
        >
          <Avatar>
            <AvatarImage
              src={post?.author?.profilepic}
              alt="Profile_Image"
              className="object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm">{post?.author?.username}</div>
          <div className="text-xs">Time</div>
        </Link>
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
      <div className=" rounded-lg h-[400px] max-h-[500px] w-full">
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
          <MessageCircle
            size={25}
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
          />
          <Send size={25} />
        </div>
        <Bookmark
          onClick={bookmarkHandler}
          className={`${mark ? "fill-black dark:fill-white" : ""}`}
          size={25}
        />
      </div>
      <div>
        <span className="block font-semibold ">{totalLikes} likes</span>
        <p>
          <span className="font-semibold">{post?.author?.username} </span>
          {post?.caption}
        </p>
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
        >
          View all {comment?.length ?? 0} comments
        </span>
        <CommentDialog open={open} setOpen={setOpen} />
        <div className="flex px-1 justify-between items-center">
          <input
            type="text"
            value={text}
            onChange={postTextHandler}
            placeholder="Add a comment..."
            className="focus:outline-none w-full text-sm"
          />
          {text && (
            <div
              onClick={commentHandler}
              className="text-blue-400 cursor-pointer"
            >
              send
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
