import classNames from 'classnames';
import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import styles from './Chat.module.scss';
import { RoomContext } from '../../contexts/roomContext';

const Chat = () => {
  const { videoUrl } = useContext(RoomContext);

  return (
    <div className={styles['chat-container']}>
      <div className={classNames(styles['input-container'], 'px-2')}>
        <input type="text" className="input" placeholder="Type a message" />
      </div>
    </div>
  );
};

export default Chat;
