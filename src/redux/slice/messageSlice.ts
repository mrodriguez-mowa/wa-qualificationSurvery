import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessageState {
  message: string,
  id: number | null
}

const initialState: MessageState = {
  message: "",
  id: null
}

export const messageSlice = createSlice({
  
}) 