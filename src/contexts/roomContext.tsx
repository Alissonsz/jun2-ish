import { createContext, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../stores';
import { RoomActions } from '../stores/roomSlice';
import socket, { sendEntryRoom, sendNewMessage } from '../services/ws';

export interface IChatMessage {
  author: string;
  content: string;
}

interface IRoomContext {
  name: string;
  userNickname: string;
  videoUrl: string;
  messages: IChatMessage[];
  setRoomId: (id: number) => void;
  setRoomName: (name: string) => void;
  setRoomUserNickname: (nickname: string) => void;
  setRoomVideoUrl: (url: string) => void;
  setRoomMessages: (messages: IChatMessage[]) => void;
  addMessage: (message: string) => void;
}

const RoomContext = createContext({} as IRoomContext);

const RoomProvider = ({ children }) => {
  const { id, userNickname, name, videoUrl, messages } = useAppSelector(
    (state) => state.room
  );

  const dispatch = useAppDispatch();

  const setRoomId = (id: number) => {
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

  useEffect(() => {
    socket.on('newMessage', (data: IChatMessage) => {
      console.log('new message', data);
      dispatch(RoomActions.addMessage(data));
    });
  }, []);

  return (
    <RoomContext.Provider
      value={{
        name,
        userNickname,
        videoUrl,
        messages,
        setRoomId,
        setRoomName,
        setRoomUserNickname,
        setRoomVideoUrl,
        setRoomMessages,
        addMessage,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);

export { RoomContext, RoomProvider };
