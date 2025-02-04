import { createSlice } from "@reduxjs/toolkit";

export const turfSlice = createSlice({
  name: "turf",
  initialState: {
    value: [],
  },
  reducers: {
    setTurfLists: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTurfLists} = turfSlice.actions;

export default turfSlice.reducer;
