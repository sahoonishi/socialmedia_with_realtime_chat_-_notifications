import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name:"auth",
  initialState:{
    user:null,
    suggested:[],
  },
  reducers:{
    setAuthUser:(state,action)=>{
        state.user = action.payload;
    },
    setSuggested:(state,action)=>{
      state.suggested = action.payload;
    },
  }
});
export const {setAuthUser,setSuggested} = authSlice.actions; 
export default authSlice.reducer;