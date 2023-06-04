"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessageState {
  messageText: string;
  id: string;
}

const initialState: MessageState = {
  messageText: "",
  id: "",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessageState: (
      state: MessageState,
      action: PayloadAction<MessageState>
    ) => {
      (state.id = action.payload.id), (state.messageText = action.payload.messageText);

      // add these values to localStorage

      if (typeof window !== "undefined") {
        localStorage.setItem("messageId", action.payload.id);
        localStorage.setItem("messageText", action.payload.messageText);
      }
    },
  },
});

export const { setMessageState } = messageSlice.actions;

export default messageSlice.reducer;
