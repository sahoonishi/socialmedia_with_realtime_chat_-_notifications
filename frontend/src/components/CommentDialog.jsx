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
const CommentDialog = ({ open, setOpen }) => {
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="flex max-w-5xl p-0"
      >
        <div className="border relative rounded-lg h-[300px] w-1/2 ">
          <img
            src="https://images.unsplash.com/photo-1611199340099-91a595a86812?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGF1dGhvcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="postimage"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div className="w-1/2 flex border h-[300px] border-black items-start flex-col">
          <div className="flex">
            <div>
              {" "}
              <img
                src="htps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXskeEul9fxfJ7zZiixluTO65k-oJpr6Hw7e2OOj08DNxoN-oRnzqbd0b4QnAZVI8aLcg&usqp=CAU"
                alt=""
                className="h-8 rounded-full w-8"
              />
            </div>
            <div>username</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
