import React, { useRef, useEffect, useState } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import styles from './VideoPlayer.module.scss';
import { useRoom } from '../../contexts/roomContext';
import { MdPlayArrow, MdPause, MdFullscreen, MdVolumeUp } from 'react-icons/md';
import { useVideo } from '../../contexts/videoContext';
import classNames from 'classnames';
import Player from '../Player';

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
    setLastSeek,
    seekVideo,
  } = useVideo();

  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVolumeInput, setShowVolumeInput] = useState(false);

  const onRef = (el: ReactPlayer) => (playerRef.current = el);

  const onSliderChange = (e) => {
    seekVideo(e.target.value / 100);
  };

  const handleCoverClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value / 100);
  };

  const handleFullScreen = async () => {
    const screenfull = (await import('screenfull')).default;
    if (typeof window !== 'undefined') {
      if (screenfull.isEnabled) {
        screenfull.toggle(ref.current);
        setIsFullscreen(!isFullscreen);
      }
    }
  };

  useEffect(() => {
    playerRef?.current?.seekTo(lastSeek, 'fraction');
  }, [lastSeek]);

  useEffect(() => {
    setLastSeek(0);
  }, [videoUrl]);

  return (
    <div
      className={classNames(
        styles['player-wrapper'],
        isFullscreen ? styles['is-fullscreen'] : ''
      )}
      ref={ref}
      data-testid="videoPlayer"
    >
      <div className="cover" onClick={handleCoverClick}></div>
      <Player
        onRef={onRef}
        className={styles['react-player']}
        url={videoUrl}
        width={'100%'}
        height={'100%'}
        volume={volume}
        playing={isPlaying}
        progressInterval={100}
        controls={false}
        onEnded={() => togglePlaying()}
        onProgress={(state) => {
          setPlayedFraction(state.played * 100);
        }}
        onDuration={(duration) => {
          playerRef.current.seekTo(lastSeek, 'fraction');
        }}
      />
      <div className="player-controls">
        <div className="play-pause button-container">
          {isPlaying ? (
            <MdPause
              width={40}
              height={40}
              onClick={togglePlaying}
              data-testid="pauseButton"
            />
          ) : (
            <MdPlayArrow
              width={40}
              height={40}
              onClick={togglePlaying}
              data-testid="playButton"
            />
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
          data-testid="videoDurationSlider"
        />
        <div
          className="button-container volume"
          onMouseEnter={() => setShowVolumeInput(true)}
          onMouseLeave={() => setShowVolumeInput(false)}
        >
          <input
            className={classNames(
              'slider is-fullwidth is-success is-circle',
              showVolumeInput ? '' : 'is-hidden'
            )}
            //@ts-ignore
            orient="vertical"
            min="0"
            max="100"
            step="any"
            type="range"
            value={volume * 100}
            onInput={handleVolumeChange}
            data-testid="volumeSlider"
          />
          <MdVolumeUp
            width={40}
            height={40}
            data-testid="toggleVolumeVisible"
          />
        </div>
        <div className="button-container">
          <MdFullscreen
            width={40}
            height={40}
            onClick={handleFullScreen}
            data-testid="toggleFullscreenButton"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
