import { createContext, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../stores';
import { RoomActions } from '../stores/roomSlice';
import socket, {
  sendEntryRoom,
  sendNewMessage,
  sendVideoChange,
} from '../services/ws';

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
  setRoomId: (id: string) => void;
  setRoomName: (name: string) => void;
  setRoomUserNickname: (nickname: string) => void;
  setRoomVideoUrl: (url: string) => void;
  setRoomMessages: (messages: IChatMessage[]) => void;
  addMessage: (message: string) => void;
  changeVideoUrl: (url: string) => void;
}

const RoomContext = createContext({} as IRoomContext);

const RoomProvider = ({ children }) => {
  const { id, userNickname, name, videoUrl, messages } = useAppSelector(
    (state) => state.room
  );

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
  }, []);

  return (
    <RoomContext.Provider
      value={{
        id,
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
        changeVideoUrl,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);

export { RoomContext, RoomProvider };
