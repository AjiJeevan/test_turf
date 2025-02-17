import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserAuth: false,
    role : "user",
    userData : {}
    
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
      setUser: (state, action) => { 
          state.isUserAuth = true;
          state.role = (action.payload?.role || "user")
          state.userData = action.payload
          console.log("action payload ====== ", state.role);
      },
      clearUser: (state) => {
          state.isUserAuth = false
          state.role = "user"
          state.userData = {}
      }
  },
});


export const { setUser, clearUser} = userSlice.actions;

export default userSlice.reducer;
