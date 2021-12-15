import classNames from 'classnames';
import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.scss';
import { RoomContext } from "../../contexts/roomContext";

const VideoPlayer = () => {
  const { videoUrl } = useContext(RoomContext);

  return (
    <div className={styles['player-style']}>
      <ReactPlayer url={videoUrl} controls={true} style={{ aspectRatio: "16/9" }} width={ "100%" } height={"auto"} />
    </div>
  );
};

export default VideoPlayer;
