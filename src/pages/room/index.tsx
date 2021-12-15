import Layout from '../../components/layout';
import Counter from '../../components/counter';
import { RoomContext } from '../../contexts/roomContext';
import { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import classNames from 'classnames';
import styles from './Room.module.scss';
import Chat from '../../components/Chat';

interface IRoom {
  name: string;
  videoUrl: string;
}

const Room = (roomInfos: IRoom) => {
  const { name, videoUrl, setRoomName, setRoomVideoUrl } =
    useContext(RoomContext);

  useEffect(() => {
    console.log(roomInfos);
    setRoomVideoUrl(roomInfos.videoUrl);
    setRoomName(roomInfos.name);
  }, []);

  useEffect(() => {
    console.log(videoUrl);
  }, [videoUrl]);

  return (
    <Layout home>
      <section className={classNames('section columns is-fullwidth')}>
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
    },
  };
};

export default Room;
