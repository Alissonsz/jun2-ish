import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IChatMessage {
  author: string;
  content: string;
}

export interface RoomState {
  id: number;
  name: string;
  videoUrl: string;
  userNickname: string;
  messages: IChatMessage[];
}

const initialState: RoomState = {
  id: undefined,
  name: '',
  videoUrl: '',
  userNickname: undefined,
  messages: [],
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUserNickname: (state, action: PayloadAction<string>) => {
      state.userNickname = action.payload;
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
