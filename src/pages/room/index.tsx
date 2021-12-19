import Layout from '../../components/layout';
import Counter from '../../components/counter';
import { RoomContext, IChatMessage } from '../../contexts/roomContext';
import { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import classNames from 'classnames';
import styles from './Room.module.scss';
import Chat from '../../components/Chat';

interface IRoom {
  name: string;
  videoUrl: string;
  messages: IChatMessage[];
}

const Room = (roomInfos: IRoom) => {
  const { name, videoUrl, setRoomName, setRoomVideoUrl, setRoomMessages } =
    useContext(RoomContext);

  useEffect(() => {
    console.log(roomInfos);
    setRoomVideoUrl(roomInfos.videoUrl);
    setRoomName(roomInfos.name);
    setRoomMessages(roomInfos.messages);
  }, []);

  useEffect(() => {
    console.log(videoUrl);
  }, [videoUrl]);

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
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      name: "Gamer's room",
      videoUrl: 'https://www.youtube.com/watch?v=lrE5CC1up3s',
      messages: [
        {
          author: 'Alisson',
          content: 'Hello everyone',
        },
        {
          author: 'Iguzinho',
          content: "It's cabulozo big cruzeiro hahahaah games",
        },
        { author: 'GLucaXD', content: "Let's go Bahia" },
      ],
    },
  };
};

export default Room;
