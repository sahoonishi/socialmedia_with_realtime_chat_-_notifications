import { setPosts } from "../redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost =() => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await axios.get(`https://socialmedia-with-realtime-chat.onrender.com/api/post/getallposts`, {
          withCredentials: true,
        });
        // console.log(res.data);
        if(res.data.success){
          dispatch(setPosts(res.data.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))));

        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPost();
  }, []);
};
export default useGetAllPost;
