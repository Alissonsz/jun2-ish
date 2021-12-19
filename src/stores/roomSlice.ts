import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IChatMessage {
  author: string;
  content: string;
}

export interface RoomState {
  name: string;
  videoUrl: string;
  messages: IChatMessage[];
}

const initialState: RoomState = {
  name: '',
  videoUrl: '',
  messages: [],
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setVideoUrl: (state, action: PayloadAction<string>) => {
      state.videoUrl = action.payload;
    },
    setMessages: (state, action: PayloadAction<IChatMessage[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<IChatMessage>) => {
      state.messages.push(action.payload);
    },
  },
});

export const RoomActions = roomSlice.actions;

export default roomSlice.reducer;
