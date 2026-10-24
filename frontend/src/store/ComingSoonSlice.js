// src/redux/commingSoonSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isComingSoon: false,
};

const comingSoonSlice = createSlice({
  name: "comingSoon",
  initialState,
  reducers: {
    setComingSoon(state, action) {
      state.isComingSoon = action.payload;
    },
  },
});

export const { setComingSoon } = comingSoonSlice.actions;

export default comingSoonSlice.reducer;
