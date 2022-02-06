import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface IChatMessage {
  author: string;
  content: string;
}

export interface IPlaylistItem {
  id: number;
  name: string;
  url: string;
}

export interface RoomState {
  id: string;
  name: string;
  videoUrl: string;
  userNickname: string;
  messages: IChatMessage[];
  playlist: IPlaylistItem[];
}

const initialState: RoomState = {
  id: undefined,
  name: '',
  videoUrl: '',
  userNickname: undefined,
  messages: [],
  playlist: [],
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
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
    setPlaylist: (state, action: PayloadAction<IPlaylistItem[]>) => {
      state.playlist = action.payload;
    },
    addToPlaylist: (state, action: PayloadAction<IPlaylistItem>) => {
      state.playlist.push(action.payload);
    },
    removeFromPlaylist: (state) => {
      state.playlist.shift();
    },
    clearState: () => {
      return initialState;
    },
  },
});

export const RoomActions = roomSlice.actions;

export default roomSlice.reducer;
