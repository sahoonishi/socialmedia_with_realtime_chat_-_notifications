import React, { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { readFileAsDataUrl } from "../lib/utils";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
const CreatePost = ({ open, setOpen }) => {
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const imageRef = useRef();
  const imageHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataURL = await readFileAsDataUrl(file);
      setImagePreview(dataURL);
    }
  };
  const postHandler=async()=>{
    const formData = new FormData();
    formData.append("caption",caption);
    if(imagePreview) formData.append("image",file);
    try {
        setLoading(true);
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/post/addpost`,formData,{
          headers:{
            'Content-Type':'multipart/form-data'
          },
          withCredentials:true
        });
        if(res.data.success){
          toast.success(res.data.message);
        }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }finally{
      setLoading(false);
    }
  }
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className="text-center font-semibold">
          Create New Post
        </DialogHeader>
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src="" alt="img" />
            <AvatarFallback>USER</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xs font-semibold">username</h1>
            <div className="text-gray-400 text-xs">bio</div>
          </div>
        </div>
        <Textarea
        value={caption}
        onChange={(e)=>setCaption(e.target.value)}
          className="border focus-visible:ring-transparent"
          placeholder="caption..."
        />
        {imagePreview && (
          <div className="w-full h-64 flex justify-center items-center">
            <img
              src={imagePreview}
              alt="preview_image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
        <input
          ref={imageRef}
          type="file"
          className="hidden"
          onChange={imageHandler}
        />
        <div
          className="text-center w-fit mx-auto px-3 transition-colors cursor-pointer py-1 rounded-md bg-sky-400 text-white hover:bg-sky-400/80"
          onClick={() => imageRef.current.click()}
        >
          Select from device
        </div>
        {imagePreview &&
          (loading ? (
            <Button>
              <Loader2 className="mr-2 animate-spin size-4" />
              posting...
            </Button>
          ) : (
            <Button onClick={postHandler} type="submit" className="w-fit mx-auto">Share with friends</Button>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
