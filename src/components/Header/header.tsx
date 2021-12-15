import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import styles from './Header.module.scss';
import SearchIcon from '../../../public/icons/search.svg';
import { RoomContext } from '../../contexts/roomContext';

const Header = () => {
  const { setRoomVideoUrl } = useContext(RoomContext);

  const [videoUrlInput, setVideoUrlInput] = useState<string>();

  return (
    <div
      className={classNames('px-6 pt-2 columns is-fullwidth', styles.header)}
    >
      <div className="column is-2 has-text-black has-text-weight-bold is-size-4">
        Jun2-ish
      </div>
      <div
        className={classNames(
          'column is-8 is-flex is-justify-content-center',
          styles['search-input-container']
        )}
      >
        <div className={classNames(styles['input-container'], 'mr-6')}>
          <input
            type="text"
            className="input"
            placeholder="Video url"
            value={videoUrlInput}
            onChange={(e) => setVideoUrlInput(e.target.value)}
          />
          <a onClick={(e) => setRoomVideoUrl(videoUrlInput)}>
            <SearchIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
