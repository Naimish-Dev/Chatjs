import { createSlice } from "@reduxjs/toolkit";


const initialState={
    chatdata:[],
}

export const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    storeChat: (state, action) => {
      state.chatdata = action.payload;
    },
    pushnewChat: (state, action) => {
      state.chatdata.push(action.payload);
    },
    deletechat: (state, action) => {
      state.chatdata = state.chatdata.filter(
        (obj) => obj._id !== action.payload
      );
    },
    clearchat: (state, action) => {
      state.chatdata = action.payload;
    },
  },
});
export const { storeChat, pushnewChat, deletechat, clearchat } = ChatSlice.actions;
export default ChatSlice.reducer;