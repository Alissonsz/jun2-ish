import { useState, createContext } from 'react';

interface IChatMessage {
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
  const [messages, setMessages] = useState<IChatMessage[]>();

  const setRoomName = (name) => {
    setName(name);
  };

  const setRoomVideoUrl = (url) => {
    setVideoUrl(url);
  };

  const setRoomMessages = (messages: IChatMessage[]) => {
    setMessages([...messages]);
  };

  const addMessage = (message: IChatMessage) => {
    setMessages((prevMessages) => {
      return [message, ...prevMessages];
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

export { RoomContext, RoomProvider };
