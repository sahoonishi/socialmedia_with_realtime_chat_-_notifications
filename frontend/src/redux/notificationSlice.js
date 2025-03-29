import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    likenotification: [],
  },
  reducers: {
    setLikeNotification: (state, action) => {
      if (action.payload.type === "like") {
        state.likenotification.push(action.payload);
      } else if (action.payload.type === "dislike") {
        state.likenotification = state.likenotification.filter(
          (item) => item.userId !== action.payload.userId
        );
      }
    },
  },
});
export const {setLikeNotification} = notificationSlice.actions;
export default notificationSlice.reducer;