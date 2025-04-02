import { setSuggested } from "../redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useSuggested = () => {
  const dispatch = useDispatch();
  const {posts} = useSelector(store=>store.post);
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/suggested`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(
            setSuggested(
              res.data.users.sort((a, b) => a.createdAt - b.createdAt)
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuggestedUsers();
  }, [posts]);
};
export default useSuggested;
