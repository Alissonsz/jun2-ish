import classNames from 'classnames';
import React from 'react';
import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = () => {
  return (
    <div className={styles['player-style']}>
      <ReactPlayer url="https://www.youtube.com/watch?v=lrE5CC1up3s" />
    </div>
  );
};

export default VideoPlayer;
