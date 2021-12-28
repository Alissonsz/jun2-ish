import { io } from 'socket.io-client';
import { IChatMessage } from '../stores/roomSlice';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'localhost:8080';

const socket = io(SERVER_URL);

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

export const sendVideoPlayingChange = (roomId: string, playing: boolean) => {
  const payload = { roomId, playing };

  socket.emit('videoPlayingChanged', payload);
};

export const sendVideoSeek = (roomId: string, seekTo: number) => {
  const payload = { roomId, seekTo };
  socket.emit('videoSeeked', payload);
};

export const sendPlayingProgress = (roomId: string, progress) => {
  const payload = { roomId, progress };
  socket.emit('playingProgress', payload);
};

export default socket;
