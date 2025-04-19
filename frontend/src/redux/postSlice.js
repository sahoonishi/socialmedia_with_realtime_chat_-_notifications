import { createSlice } from "@reduxjs/toolkit";
const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    selectedPost: null,
    loading: true,
  },
  reducers: {
    // actions
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { setPosts, setSelectedPost, setLoading } = postSlice.actions;
export default postSlice.reducer;
