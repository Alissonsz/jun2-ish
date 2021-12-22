import { io } from 'socket.io-client';
import { IChatMessage } from '../stores/roomSlice';

const socket = io('localhost:8080');

socket.on('connect', () => {
  console.log('connected');
});

export const sendNewMessage = (message: IChatMessage) => {
  socket.emit('newMessage', message);
};

export default socket;
