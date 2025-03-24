import { setSuggested } from "../redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useSuggested = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/suggested`,
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
  }, []);
};
export default useSuggested;
