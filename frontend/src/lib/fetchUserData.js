import axios from "axios";

export const fetchUserData = async (id) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/${id}/profile`,
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
