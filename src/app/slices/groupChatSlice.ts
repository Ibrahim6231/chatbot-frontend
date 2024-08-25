import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialStateInterface = {
  allUsers: Array<{ name: any, _id: string }>;
  chatList: Array<any>;


};

const initState: InitialStateInterface = {
  allUsers: [],
  chatList: []
};

const groupChatSlice = createSlice({
  name: "groupChat",
  initialState: initState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<any[]>) => {
      state.allUsers = action.payload;
    },
    setChatList: (state, action: PayloadAction<any[]>) => {
      state.chatList = action.payload;
    },
  },
});

export default groupChatSlice.reducer;
export const { setAllUsers, setChatList } = groupChatSlice.actions;