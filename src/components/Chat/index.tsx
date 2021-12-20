import classNames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Chat.module.scss';
import { useRoom } from '../../contexts/roomContext';

const Chat = () => {
  const { messages, addMessage } = useRoom();
  const [newMsg, setNewMsg] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleNewMsg = (e) => {
    setNewMsg(e.target.value);
  };

  const handleMsgSubmit = (e) => {
    if (e.key === 'Enter' && newMsg.length) {
      addMessage({ author: 'John Doe', content: newMsg });
      setNewMsg('');
    }
  };

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className={styles['chat-container']}>
      <div ref={chatContainerRef} className={styles['messages-container']}>
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
