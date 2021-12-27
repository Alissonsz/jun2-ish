import React from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

export interface PlayerProps extends ReactPlayerProps {
  onRef?: (ref: ReactPlayer) => void;
}

const Player: React.FC<PlayerProps> = (props) => {
  return (
    <ReactPlayer
      ref={props.onRef}
      width={'100%'}
      height={'100%'}
      progressInterval={100}
      controls={false}
      {...props}
    />
  );
};

export default Player;
