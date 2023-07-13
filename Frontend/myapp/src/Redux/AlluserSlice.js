import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allusers: [],
  copyuser: [],
  receiveruser: {},
};

export const allusersSlice = createSlice({
  name: "allusers",
  initialState,

  reducers: {
    setallusers: (state, action) => {
      state.allusers = action.payload;
      state.copyuser = action.payload;
    },
    userSerch: (state, action) => {
      state.allusers = state.allusers.filter((user) =>
        user.username
          .toLowerCase()
          .includes(action.payload && action.payload.toLowerCase())
      );
    },
    clearuserSerch: (state) => {
      state.allusers = state.copyuser;
    },
    offlineupdate: (state, action) => {
      const finduser = state.allusers.find(
        (user) => user._id === action.payload
      );
      if (finduser) {
        finduser.is_online = true;
      }
      state.copyuser = state.allusers 
    },
    onlineupdate: (state, action) => {
      const finduser = state.allusers.find(
        (user) => user._id === action.payload
      );
      if (finduser) {
        finduser.is_online = false;
      }
            state.copyuser = state.allusers; 

    },
    setreceiveruser:(state,action)=>{
      state.receiveruser = action.payload;
    }
  },
});

export const {
  setallusers,
  offlineupdate,
  onlineupdate,
  userSerch,
  clearuserSerch,
  setreceiveruser,
} = allusersSlice.actions;
export default allusersSlice.reducer;
