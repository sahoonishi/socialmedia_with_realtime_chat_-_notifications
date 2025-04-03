import { setProfile } from "../redux/authSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux";

 const useGetUserProfile=async(id)=>{
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchProfile = async()=>{
      try {
        const res = await axios.get(`https://socialmedia-with-realtime-chat.onrender.com/api/user/${id}/profile`,{withCredentials:true});
        if(res.data.success){
          console.log(res.data.user);
          dispatch(setProfile(res.data.user));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile();
  },[id]);
}
export default useGetUserProfile;