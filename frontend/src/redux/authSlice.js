import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggested: [],
    selectedUser: null,
    userprofile: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSuggested: (state, action) => {
      state.suggested = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setProfile: (state, action) => {
      state.userprofile = action.payload;
    },
  },
});
export const { setAuthUser, setSuggested, setSelectedUser, setProfile } =
  authSlice.actions;
export default authSlice.reducer;
