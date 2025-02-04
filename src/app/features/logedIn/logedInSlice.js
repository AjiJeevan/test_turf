import { createSlice } from "@reduxjs/toolkit";

export const logedInSlice = createSlice({
  name: "isLogedIn",
  initialState: {
    value: "false"
  },
  reducers: {
    setIsLogedIn: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsLogedIn } = logedInSlice.actions;

export default logedInSlice.reducer;
