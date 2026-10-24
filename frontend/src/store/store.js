// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import comingSoonReducer from "./ComingSoonSlice";
import UserReducer from "./UserSlice";
import { UserStateReducer, UserDataStateReducer } from "./LoginStateSlice";
import messageReducer from "./MessageDisplay/MessageSlice";

const store = configureStore({
  reducer: {
    comingSoon: comingSoonReducer,
    user: UserReducer,
    login: UserStateReducer,
    userData: UserDataStateReducer,
    message: messageReducer,
  },
  // devTools: process.env.NODE_ENV !== "production",
});

export default store;
