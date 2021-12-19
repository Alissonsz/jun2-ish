import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import styles from './Chat.module.scss';
import { RoomContext } from '../../contexts/roomContext';

const Chat = () => {
  const { messages, addMessage } = useContext(RoomContext);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const handleNewMsg = (e) => {
    setNewMsg(e.target.value);
  };

  const handleMsgSubmit = (e) => {
    if (e.key === 'Enter' && newMsg.length) {
      addMessage({ author: 'John Doe', content: newMsg });
      setNewMsg('');
    }
  };

  return (
    <div className={styles['chat-container']}>
      <div className={styles['messages-container']}>
        {messages.map((message, i) => (
          <div key={i} className={styles['message']}>
            <span className={styles.author}>{message.author}</span>
            <span className={styles.content}>{message.content}</span>
          </div>
        ))}
      </div>
      <div className={classNames(styles['input-container'], 'px-2')}>
        <input
          type="text"
          className="input"
          placeholder="Type a message"
          value={newMsg}
          onChange={handleNewMsg}
          onKeyPress={handleMsgSubmit}
        />
      </div>
    </div>
  );
};

export default Chat;
