import { io } from 'socket.io-client';
import { IChatMessage } from '../stores/roomSlice';

const socket = io('localhost:8080');

export const sendNewMessage = (roomId: string, message: IChatMessage) => {
  const payload = {
    roomId,
    message,
  };

  socket.emit('newMessage', payload);
};

export const sendEntryRoom = (roomId: string, nickname: string) => {
  const payload = {
    roomId,
    nickname,
  };

  socket.emit('joinRoom', payload);
};

export const sendVideoChange = (roomId: string, videoUrl: string) => {
  const payload = {
    roomId,
    videoUrl,
  };

  socket.emit('changeVideo', payload);
};

export default socket;
