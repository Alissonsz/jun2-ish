import { useState } from 'react';
import styles from './MainPage.module.scss';
import classNames from 'classnames';
import api from '../../services/api';
import Router from 'next/router';

const Index = () => {
  const [roomName, setRoomName] = useState('');
  const [roomVideo, setroomVideo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleroomVideoChange = (e) => {
    setroomVideo(e.target.value);
  };

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const submitCreateRoom = () => {
    setLoading(true);
    api
      .post('/room', {
        name: roomName,
        videoUrl: roomVideo,
      })
      .then((data) => {
        console.log('created');
        Router.push(`/room/${data.data.room.id}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className={classNames('section', styles['main-container'])}>
      <h1 className="title">Jun2-ish</h1>
      <div className="container">
        <h1 className="title">Create a new room</h1>

        <div className="control">
          <div className="field">
            <label className="label">Room name(optional)</label>
            <input
              type="text"
              className="input"
              value={roomName}
              onChange={handleRoomNameChange}
            />
          </div>
          <div className="field">
            <label className="label">Video URL(optional)</label>
            <input
              type="text"
              className="input"
              value={roomVideo}
              onChange={handleroomVideoChange}
            />
          </div>
        </div>
        <button
          className={classNames(
            'button is-primary',
            loading ? 'is-loading' : ''
          )}
          onClick={submitCreateRoom}
        >
          Create room
        </button>
      </div>
    </section>
  );
};

export default Index;
