import classNames from 'classnames';
import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.scss';
import { RoomContext } from '../../contexts/roomContext';

const VideoPlayer = () => {
  const { videoUrl } = useContext(RoomContext);

  return (
    <div className={styles['player-wrapper']}>
      <ReactPlayer
        className={styles['react-player']}
        url={videoUrl}
        controls={true}
        width={'100%'}
        height={'100%'}
      />
    </div>
  );
};

export default VideoPlayer;
