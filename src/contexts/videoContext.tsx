import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

import socket, {
  sendPlayingProgress,
  sendVideoPlayingChange,
  sendVideoSeek,
} from '../services/ws';
import { useRoom } from './roomContext';

interface IVideoContext {
  isPlaying: boolean;
  playedFraction: number;
  lastSeek: number;
  togglePlaying: () => void;
  setPlayedFraction: (played: number) => void;
  seekVideo: (seekTo: number) => void;
  setLastSeek: (seekTo: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const VideoContext = createContext({} as IVideoContext);

const VideoProvider = ({ children }) => {
  const { id } = useRoom();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playedFraction, setPlayedFraction] = useState(0);
  const [lastSeek, setLastSeek] = useState(0);

  const togglePlaying = () => {
    sendVideoPlayingChange(id, playedFraction, !isPlaying);
  };

  const seekVideo = (seekTo: number) => {
    sendVideoSeek(id, seekTo);
  };

  useEffect(() => {
    sendPlayingProgress(id, playedFraction);
  }, [playedFraction]);

  useEffect(() => {
    setInterval(() => {
      api.get('/rooms');
    }, 5 * 60 * 1000);

    socket.on('videoState', (data) => {
      console.log('Video info: ', data);
      setIsPlaying(data.playing);
      setLastSeek(data.progress / 100);
    });

    socket.on('videoPlayingChanged', (data) => {
      console.log('videoPlayingChanged', data);
      setLastSeek(data.progress / 100);
      setIsPlaying(data.playing);
    });

    socket.on('videoSeeked', (seekTo) => {
      console.log('videoSeeked', seekTo);
      setLastSeek(seekTo);
    });
  }, []);

  return (
    <VideoContext.Provider
      value={{
        lastSeek,
        playedFraction,
        isPlaying,
        togglePlaying,
        setPlayedFraction,
        seekVideo,
        setLastSeek,
        setIsPlaying,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);

export { VideoContext, VideoProvider };
