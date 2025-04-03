import axios from "axios";

export const fetchUserData = async (id) => {
  try {
    const res = await axios.get(
      `https://socialmedia-with-realtime-chat.onrender.com/api/user/${id}/profile`,
      {
        withCredentials: true,
      }
    );
    if (res.data.success) {
      return res.data.user;
    }
  } catch (error) {
    console.log(error);
    // toast.error(error.response.data.message);
  }
};
