import React, { useRef, useState } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "../redux/authSlice";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const Editprofile = () => {
  const imageRef = useRef();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    profilepic: user?.profilepic,
    bio: user?.bio,
    gender: user?.gender,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput({ ...input, profilepic: file });
  };
  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };
  const editProfileHandler = async () => {
    console.log(input);
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("gender", input.gender);
    if (input.profilepic) {
      formData.append("profilepic", input.profilepic);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/profile/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedUserData = {
          ...user,
          bio: res.data.user?.bio,
          profilepic: res.data.user?.profilepic,
          gender: res.data.user.gender,
        };
        dispatch(setAuthUser(updatedUserData));
        navigate(`/profile/${user?.username}`);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.messasge);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className=" h-[calc(100vh-4rem)] md:h-screen overflow-y-auto flex flex-col gap-6 md:gap-10 mx-auto max-w-7xl md:px-6 md:py-16 px-3 py-8">
        <h1 className="font-bold text-xl lg:text-2xl">Edit Profile</h1>
        <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-800  md:px-6 md:py-4 px-3 py-2 md:rounded-lg rounded-xl">
          <div className="flex gap-2 md:gap-4 items-center">
            <Avatar className="size-15">
              <AvatarImage
                src={user?.profilepic}
                alt="Profile_Image"
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold text-md md:text-lg">{user?.username}</h1>
          </div>
          <input
            ref={imageRef}
            onChange={fileChangeHandler}
            type="file"
            className="hidden"
          />
          <Button
            onClick={() => imageRef?.current.click()}
            className="cursor-pointer px-2 md:px-3 rounded-xl text-sm md:text-lg "
          >
            Change Photo
          </Button>
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Bio</h1>
          <Textarea
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            name="bio"
            className="border text-md md:text-lg"
            id=""
            placeholder="Change Bio"
          />
        </div>
        <div className="w-fit ">
          <h1 className="text-lg md:text-xl font-bold mb-2 md:mb-4">Gender</h1>
          <Select
            defaultValue={input.gender}
            onValueChange={selectChangeHandler}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="text-center">
          {loading ? (
            <Button className="w-fit px-8">
              {" "}
              <Loader2 className="size-4 animate-spin" /> Sumbit
            </Button>
          ) : (
            <Button
              onClick={editProfileHandler}
              className="w-fit px-8"
            >
              Sumbit
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Editprofile;
