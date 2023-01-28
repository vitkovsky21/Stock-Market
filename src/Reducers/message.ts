import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  clientMessage: [],
};

const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.clientMessage.push(action.payload);
    },
    updateMessage(state, action) {
      state.clientMessage[
        Math.floor(Math.random() * (state.clientMessage.length - 1 - 1) + 1)
      ].status = action.payload;
    },
  },
});

export const { addMessage, updateMessage } = MessageSlice.actions;

export default MessageSlice.reducer;
