import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading , setLoading]=useState(false);
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setInput({
          username: "",
          email: "",
          password: "",
        })
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form
        onSubmit={formSubmitHandler}
        action=""
        className="shadow-md min-w-sm px-6 py-6 flex flex-col gap-2 rounded-2xl"
      >
        <div className="my-4">Logo</div>
        <div>
          <span className="font-medium">Username</span>
          <Input
            type="text"
            name="username"
            className="focus-visible:ring-transparent my-2"
            value={input.username}
            onChange={changeHandler}
          />
        </div>
        <div>
          <span className="font-medium">Email</span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div>
          <span className="font-medium">Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        {loading ? (
          <Button> <Loader2 className="mr-2 animate-spin size-4 cursor-not-allowed"/>Please wait...</Button>
        ) : (
          <Button type="submit" className="cursor-pointer">Sign up</Button>
        )}
        <div className="text-center">Already have an account ? <Link to="/login" className="text-blue-600">login</Link></div>
      </form>
    </div>
  );
};

export default Signup;
