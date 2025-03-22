import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const CommentDialog = ({ open, setOpen }) => {
  const {selectedPost} = useSelector(store=>store.post);
  
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="flex max-w-3xl p-0"
      >
        <div className=" rounded-lg h-[300px] w-1/2 ">
          <img
            src={selectedPost?.image}
            alt="postimage"
            className="w-full h-full object-cover rounded-l-md"
          />
        </div>
        <div className="w-1/2 flex h-[300px] flex-col">
          <div className="flex items-center gap-2">
            <div>
              {" "}
              <Avatar>
            <AvatarImage
              src={selectedPost?.author?.profilepic}
              alt="Profile_Image"
              className="object-cover w-2"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
            </div>
            <div className="text-sm font-semibold">{selectedPost?.author?.username}.</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
