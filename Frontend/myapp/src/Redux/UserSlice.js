import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginuser: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeloginuser: (state, action) => {
      state.loginuser = action.payload;
    },
    storelogoutuser: (state, action) => {
      state.loginuser = action.payload;
    },
   
  },
});
export const { storeloginuser, storelogoutuser } =
  UserSlice.actions;
export default UserSlice.reducer;
