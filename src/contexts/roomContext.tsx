import { createContext, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../stores';
import { IPlaylistItem, RoomActions } from '../stores/roomSlice';
import socket, {
  sendEntryRoom,
  sendNewMessage,
  sendPlayNext,
  sendReorderPlaylist,
  sendVideoAddedToPlaylist,
  sendVideoChange,
} from '../services/ws';

import { v4 as uuidv4 } from 'uuid';

export interface IChatMessage {
  author: string;
  content: string;
}

interface IRoomContext {
  id: string;
  name: string;
  userNickname: string;
  videoUrl: string;
  messages: IChatMessage[];
  playlist: IPlaylistItem[];
  setRoomId: (id: string) => void;
  setRoomName: (name: string) => void;
  setRoomUserNickname: (nickname: string) => void;
  setRoomVideoUrl: (url: string) => void;
  setRoomMessages: (messages: IChatMessage[]) => void;
  addMessage: (message: string) => void;
  changeVideoUrl: (url: string) => void;
  updatePlaylist: (items: IPlaylistItem[]) => void;
  reorderPlaylist: (items: IPlaylistItem[]) => void;
  addVideoToPlaylist: (name: string, url: string) => void;
  playNext: () => void;
}

const RoomContext = createContext({} as IRoomContext);

const RoomProvider = ({ children }) => {
  const { id, userNickname, name, videoUrl, messages, playlist } =
    useAppSelector((state) => state.room);

  const dispatch = useAppDispatch();

  const setRoomId = (id: string) => {
    dispatch(RoomActions.setId(id));
  };

  const setRoomName = (name: string) => {
    dispatch(RoomActions.setName(name));
  };

  const setRoomUserNickname = (nickname: string) => {
    sendEntryRoom(id, nickname);
    dispatch(RoomActions.setUserNickname(nickname));
  };

  const setRoomVideoUrl = (url: string) => {
    dispatch(RoomActions.setVideoUrl(url));
  };

  const setRoomMessages = (newMessages: IChatMessage[]) => {
    dispatch(RoomActions.setMessages(newMessages));
  };

  const addMessage = (message: string) => {
    sendNewMessage(id, { author: userNickname, content: message });
  };

  const changeVideoUrl = (url: string) => {
    sendVideoChange(id, url);
  };

  const updatePlaylist = (items: IPlaylistItem[]) => {
    dispatch(RoomActions.setPlaylist(items));
  };

  const reorderPlaylist = (items: IPlaylistItem[]) => {
    sendReorderPlaylist(id, items);
  };

  const addVideoToPlaylist = (name: string, url: string) => {
    const playlistItem: IPlaylistItem = {
      id: uuidv4(),
      name,
      url,
    };

    sendVideoAddedToPlaylist(id, playlistItem);
  };

  const playNext = () => {
    sendPlayNext(id);
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('newMessage', (data: IChatMessage) => {
      console.log('new message', data);
      dispatch(RoomActions.addMessage(data));
    });

    socket.on('videoChanged', (data: string) => {
      console.log('video changed', data);
      dispatch(RoomActions.setVideoUrl(data));
    });

    socket.on('addedToPlaylist', (data: IPlaylistItem) => {
      dispatch(RoomActions.addToPlaylist(data));
    });

    socket.on('playlistUpdated', (data: IPlaylistItem[]) => {
      dispatch(RoomActions.setPlaylist(data));
    });

    socket.on('playNext', (data: IPlaylistItem) => {
      dispatch(RoomActions.setVideoUrl(data.url));
      dispatch(RoomActions.removeFromPlaylist());
    });
  }, []);

  return (
    <RoomContext.Provider
      value={{
        id,
        name,
        userNickname,
        videoUrl,
        messages,
        playlist,
        setRoomId,
        setRoomName,
        setRoomUserNickname,
        setRoomVideoUrl,
        setRoomMessages,
        addMessage,
        changeVideoUrl,
        updatePlaylist,
        reorderPlaylist,
        addVideoToPlaylist,
        playNext,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);

export { RoomContext, RoomProvider };
