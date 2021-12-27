import React, { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.scss';
import { useRoom } from '../../contexts/roomContext';
import { MdPlayArrow, MdPause, MdFullscreen } from 'react-icons/md';
import { useVideo } from '../../contexts/videoContext';

let screenfull = null;
import('screenfull').then((screenfullModule) => {
  screenfull = screenfullModule.default;
});

const VideoPlayer = () => {
  const playerRef = useRef<ReactPlayer>(null);
  const ref = useRef(null);
  const { videoUrl } = useRoom();
  const {
    lastSeek,
    isPlaying,
    playedFraction,
    togglePlaying,
    setPlayedFraction,
    seekVideo,
  } = useVideo();

  const onSliderChange = (e) => {
    seekVideo(e.target.value / 100);
  };

  const handleFullScreen = () => {
    if (typeof window !== 'undefined') {
      if (screenfull.isEnabled) {
        screenfull.toggle(ref.current);
      }
    }
  };

  useEffect(() => {
    playerRef.current.seekTo(lastSeek, 'fraction');
  }, [lastSeek]);

  useEffect(() => {
    setPlayedFraction(0);
  }, [videoUrl]);

  return (
    <div className={styles['player-wrapper']} ref={ref}>
      <ReactPlayer
        ref={playerRef}
        className={styles['react-player']}
        url={videoUrl}
        width={'100%'}
        height={'100%'}
        playing={isPlaying}
        progressInterval={100}
        onEnded={() => togglePlaying()}
        onProgress={(state) => {
          console.log(state);
          setPlayedFraction(state.played * 100);
        }}
        onDuration={(duration) => {
          console.log(duration);
          playerRef.current.seekTo(lastSeek, 'fraction');
        }}
      />
      <div className="player-controls">
        <div className="play-pause button-container">
          {isPlaying ? (
            <MdPause width={40} height={40} onClick={togglePlaying} />
          ) : (
            <MdPlayArrow width={40} height={40} onClick={togglePlaying} />
          )}
        </div>
        <input
          className="slider is-fullwidth is-success is-circle"
          min="0"
          max="100"
          step="any"
          value={playedFraction}
          type="range"
          onInput={onSliderChange}
        />
        <div className="button-container">
          <MdFullscreen width={40} height={40} onClick={handleFullScreen} />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
