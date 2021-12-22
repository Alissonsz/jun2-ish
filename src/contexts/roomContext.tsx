import { createContext, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../stores';
import { RoomActions } from '../stores/roomSlice';
import { sendNewMessage } from '../services/ws';

export interface IChatMessage {
  author: string;
  content: string;
}

interface IRoomContext {
  name: string;
  videoUrl: string;
  messages: IChatMessage[];
  setRoomName: (name: string) => void;
  setRoomVideoUrl: (url: string) => void;
  setRoomMessages: (messages: IChatMessage[]) => void;
  addMessage: (message: IChatMessage) => void;
}

const RoomContext = createContext({} as IRoomContext);

const RoomProvider = ({ children }) => {
  const { name, videoUrl, messages } = useAppSelector((state) => state.room);
  const dispatch = useAppDispatch();

  const setRoomName = (name: string) => {
    dispatch(RoomActions.setName(name));
  };

  const setRoomVideoUrl = (url: string) => {
    dispatch(RoomActions.setVideoUrl(url));
  };

  const setRoomMessages = (newMessages: IChatMessage[]) => {
    dispatch(RoomActions.setMessages(newMessages));
  };

  const addMessage = (message: IChatMessage) => {
    sendNewMessage(message);
    dispatch(RoomActions.addMessage(message));
  };

  return (
    <RoomContext.Provider
      value={{
        name,
        videoUrl,
        messages,
        setRoomName,
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
