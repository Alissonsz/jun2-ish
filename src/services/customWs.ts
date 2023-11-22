import { useEffect, useState } from 'react';
import { IChatMessage, IPlaylistItem } from '../stores/roomSlice';

const url =
  process.env.NODE_ENV === 'production'
    ? 'wss://jun2-ish.fun/ws'
    : 'ws://localhost:8080/ws';

const socket = {
  conn: new WebSocket(url),
  emit: (type: string, data: any) => {
    if (socket.conn.readyState !== WebSocket.OPEN) return;

    socket.conn.send(JSON.stringify({ type, data }));
  },
  on: (type: string, callback: (data: any) => void) => {
    socket.conn.addEventListener('message', (event) => {
      const { type: eventType, data } = JSON.parse(event.data);
      console.log({ type, data });

      if (type === eventType) {
        callback(data);
      }
    });
  },
};

socket.conn.onopen = () => {
  console.log('connected!');
};

socket.conn.onmessage = (message) => {
  console.log(message);
};

socket.conn.onerror = (error) => {
  console.log(error);
};

export const sendNewMessage = (roomId: string, message: IChatMessage) => {
  socket.emit('newMessage', message);
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

export const sendVideoPlayingChange = (
  roomId: string,
  progress: number,
  playing: boolean
) => {
  const payload = { progress, playing };

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

export const sendVideoAddedToPlaylist = (
  roomId: string,
  video: IPlaylistItem
) => {
  const payload = { ...video };
  socket.emit('addVideoToPlaylist', payload);
};

export const sendReorderPlaylist = (roomId: string, list: IPlaylistItem[]) => {
  const payload = { roomId, list };
  socket.emit('updatePlaylist', payload);
};

export const sendPlayNext = (roomId: string) => {
  socket.emit('playNext', { roomId });
};

export default socket;
