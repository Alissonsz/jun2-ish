import Layout from '../../components/layout';

import { IChatMessage, useRoom } from '../../contexts/roomContext';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import classNames from 'classnames';
import styles from './Room.module.scss';
import Chat from '../../components/Chat';
import api from '../../services/api';

interface IRoom {
  id: string;
  name: string;
  videoUrl: string;
  messages: IChatMessage[];
}

const Room = (roomInfos: IRoom) => {
  const {
    setRoomId,
    setRoomName,
    setRoomUserNickname,
    setRoomVideoUrl,
    setRoomMessages,
  } = useRoom();

  const [nameInput, setNameInput] = useState('');
  const [modalActive, setModalActive] = useState(true);

  useEffect(() => {
    setRoomId(roomInfos.id);
    setRoomVideoUrl(roomInfos.videoUrl);
    setRoomName(roomInfos.name);
    setRoomMessages(roomInfos.messages);
  }, []);

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleSetUserNicknameButton = (e) => {
    const nickname = nameInput;

    if (!!nickname) {
      setRoomUserNickname(nickname);
      setModalActive(false);
    }
  };

  return (
    <Layout home>
      <section
        className={classNames(
          'section columns is-fullwidth',
          styles['columns-container']
        )}
      >
        <div className="column is-9">
          <VideoPlayer />
        </div>
        <div className="column is-3">
          <Chat />
        </div>
      </section>
      <div
        className={classNames(
          'modal',
          styles['nickname-modal'],
          modalActive ? 'is-active' : ''
        )}
      >
        <div className="modal-background"></div>
        <div className="modal-content">
          <h2 className="title has-text-black has-text-weight-semibold has-text-centered">
            Please, enter a nickname
          </h2>
          <div className="control">
            <label className="label">Nickname</label>
            <input
              type="text"
              className="input"
              value={nameInput}
              onChange={handleNameChange}
            />
          </div>
          <button
            className="button is-primary"
            onClick={handleSetUserNicknameButton}
          >
            Confirm
          </button>
        </div>
        <button className="modal-close is-large" aria-label="close"></button>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const room = await api.get(`/room/${id}`).then((data) => data.data.room);

  return {
    props: {
      ...room,
    },
  };
};

export default Room;
