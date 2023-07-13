import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./UserSlice"
import alluserreducer from "./AlluserSlice"
import chatreducer from "./ChatSlice";
export const Store = configureStore({
  reducer: {
    Users: userreducer,
    allUsers: alluserreducer,
    chatdata: chatreducer,
  },
});