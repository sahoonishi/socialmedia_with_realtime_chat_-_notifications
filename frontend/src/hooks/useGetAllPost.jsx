import { setPosts , setLoading } from "../redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const useGetAllPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPost = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(`https://socialmedia-with-realtime-chat.onrender.com/api/post/getallposts`, {
            withCredentials: true,
          }
        );
        // console.log(res.data);
        if (res.data.success) {
          dispatch(
            setPosts(
              res.data.posts.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              )
            )
          );
        }
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    };
    fetchAllPost();
  }, []);
};
export default useGetAllPost;
