import { createSlice } from "@reduxjs/toolkit";
const socketSlice = createSlice({
  name:'socket',
  initialState:{
    socket:null
  },
  reducer:{
    setSocket:(state,action)=>{
      state.socket = action.payload;
    }
  }
})
export const {setSocket} = socketSlice.actions;
export default socketSlice.reducer;