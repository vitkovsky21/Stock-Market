import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ClientMessage } from "../Models/ClientMessages";

const initialState: any = {
  clientMessage: []
};

const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage(state, action) {
        state.clientMessage.push(action.payload)
    }
  },
});

export const { addMessage } = MessageSlice.actions;

export default MessageSlice.reducer;
