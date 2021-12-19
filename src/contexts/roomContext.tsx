import { useState, createContext, useContext } from 'react';

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
  const [name, setName] = useState<string>();
  const [videoUrl, setVideoUrl] = useState<string>();
  const [messages, setMessages] = useState<IChatMessage[]>([]);

  const setRoomName = (name) => {
    setName(name);
  };

  const setRoomVideoUrl = (url) => {
    setVideoUrl(url);
  };

  const setRoomMessages = (newMessages: IChatMessage[]) => {
    console.log(newMessages);
    setMessages(newMessages);
  };

  const addMessage = (message: IChatMessage) => {
    setMessages((prevMessages) => {
      return [...prevMessages, message];
    });
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
