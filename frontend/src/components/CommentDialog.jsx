import React from "react";
import {
  Dialog,
  DialogContent,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const CommentDialog = ({ open, setOpen }) => {
  const { selectedPost } = useSelector((store) => store.post);

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="flex max-w-3xl px-3 lg:p-0"
      >
        <div className="flex gap-2 flex-1">
          <div className="hidden md:block rounded-lg h-[300px] w-1/2 ">
            <img
              src={selectedPost?.image}
              alt="postimage"
              className="w-full h-full object-cover rounded-l-md"
            />
          </div>
          <div className="w-1/2 flex-1  flex h-[300px] flex-col pr-2">
            <div className="flex items-center gap-3 py-1">
              <div>
                {" "}
                <Avatar>
                  <AvatarImage
                    src={selectedPost?.author?.profilepic}
                    alt="Profile_Image"
                    className="object-cover "
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-xs font-semibold">
                {selectedPost?.author?.username}.
              </div>
            </div>
            <div className="my-1 overflow-y-auto space-y-4 max-h-96" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {selectedPost?.comments?.map((comment) => {
                return (
                  <div
                    key={comment._id}
                    className="pr-1 flex space-x-1"
                  >
                    <Avatar>
                      <AvatarImage
                        src={comment?.author?.profilepic}
                        alt="Profile_Image"
                        className="object-cover"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col ml-1 flex-1">
                      <div className="flex flex-wrap">
                        <span className="text-xs font-medium max-w-32 break-words">
                          {comment?.author?.username ?? "user"}
                          <span className="text-xs font-normal ml-1">
                            {comment?.text ?? ""}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
