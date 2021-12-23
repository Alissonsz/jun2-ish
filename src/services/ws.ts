import { io } from 'socket.io-client';
import { IChatMessage } from '../stores/roomSlice';

const socket = io('localhost:8080');

socket.on('connect', () => {
  console.log('connected');
});

export const sendNewMessage = (roomId: number, message: IChatMessage) => {
  const payload = {
    roomId,
    message,
  };

  socket.emit('newMessage', payload);
};

export const sendEntryRoom = (roomId: number, nickname: string) => {
  const payload = {
    roomId,
    nickname,
  };

  socket.emit('joinRoom', payload);
};

export default socket;
