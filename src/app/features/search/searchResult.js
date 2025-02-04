import { createSlice } from "@reduxjs/toolkit";

export const searchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    value: [],
  },
  reducers: {
    setSearchResult: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchResult } = searchResultSlice.actions;

export default searchResultSlice.reducer;
