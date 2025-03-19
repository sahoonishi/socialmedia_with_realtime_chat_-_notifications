import React from "react";
import Layout from "./Layout";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { TbMessageCircle } from "react-icons/tb";
import { FiSend } from "react-icons/fi";
import { LiaBookmarkSolid } from "react-icons/lia";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Bookmark, MessageCircle, Send } from "lucide-react";
import CommentDialog from "./CommentDialog";
import { useState } from "react";

const Post = () => {
  const [postText,setPostText]=useState("");
  const [open,setOpen]=useState(false);
  const postTextHandler=(e)=>{
      const text = e.target.value;
      setPostText(text.trim());
      // console.log(postText,"====");
  }
  const postComment=()=>{
    console.log(postText);
    setPostText("");
  }
  return (
    <div className="border flex flex-col  min-w-lg min-h-sm">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <img
            src="htps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXskeEul9fxfJ7zZiixluTO65k-oJpr6Hw7e2OOj08DNxoN-oRnzqbd0b4QnAZVI8aLcg&usqp=CAU"
            alt="dp"
            className="h-8 rounded-full w-8"
          />
          <div>username</div>
          <div>13h</div>
        </div>
        <Dialog>
          <DialogTrigger asChild className="cursor-pointer">
            <BsThreeDotsVertical />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center">
            <Button variant="ghost" className="w-fit cursor-pointer">
              Unfollow
            </Button>
            <Button variant="ghost">Save post</Button>
            <Button variant="ghost">Share</Button>
          </DialogContent>
        </Dialog>
      </div>
      {/*PHOTO*/}
      <div className="border rounded-lg h-[400px] max-h-[500px] w-full ">
        <img
          src="https://images.unsplash.com/photo-1611199340099-91a595a86812?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGF1dGhvcnxlbnwwfHwwfHx8MA%3D%3D"
          alt="postimage"
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
      {/* FOOTER */}
      <div className="flex justify-between p-2">
        <div className="flex gap-4 justify-center items-center">
          <FaHeart size={25} className="fill-red-600"/>
          <MessageCircle size={25} onClick={()=>setOpen(true)}/>
          <Send size={25} />
        </div>
        <Bookmark size={25}/>
      </div>
      {/* Comment likes */}
      <div>
        <span className="block font-semibold border">1232 likes</span>
        <p><span>user</span>caption</p>
        <span onClick={()=>setOpen(true)}>View all 12 comments</span>
        <CommentDialog open={open} setOpen={setOpen}   />
        <div className="flex px-1 justify-between items-center ">
          <input type="text" value={postText} onChange={postTextHandler} placeholder="Add a comment..." className="focus:outline-none w-full text-sm" />
          {
            postText && <div onClick={postComment} className="text-blue-500">post</div>
          }
          
        </div>
      </div>
    </div>
  );
};

export default Post;
