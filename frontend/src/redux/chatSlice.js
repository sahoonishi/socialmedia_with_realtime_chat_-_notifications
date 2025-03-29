import { createSlice } from "@reduxjs/toolkit";
const chatSlice = createSlice({
  name:'chat',
  initialState:{
    onlineUsers:[]
  },
  reducer:{
    setOnlineUsers:(state,action)=>{
      state.onlineUsers = action.payload;
    }
  }
})
export const {setOnlineUsers} = chatSlice.actions;
export default chatSlice.reducer;