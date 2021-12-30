import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './Header.module.scss';
import { MdPlayArrow } from 'react-icons/md';
import { useRoom } from '../../contexts/roomContext';
import { useWindowSize } from '../../hooks/useWindowSize';

const Header = () => {
  const { changeVideoUrl } = useRoom();
  const { width } = useWindowSize();

  const [videoUrlInput, setVideoUrlInput] = useState<string>('');

  return (
    <div
      className={classNames(
        'px-6 pt-2 columns is-mobile is-fullwidth',
        styles.header
      )}
    >
      <div className="column is-2-desktop is-2-mobile has-text-black has-text-weight-bold is-size-4">
        {width < 768 ? 'J2I' : 'Jun2-ish'}
      </div>
      <div
        className={classNames(
          'column is-8-desktop is-10-mobile is-flex is-justify-content-center is-paddingless',
          styles['search-input-container']
        )}
      >
        <div
          className={classNames(
            styles['input-container'],
            'mr-6-desktop mr-0-mobile'
          )}
        >
          <input
            type="text"
            className="input"
            placeholder="Video url"
            value={videoUrlInput}
            onChange={(e) => setVideoUrlInput(e.target.value)}
          />
          <a
            data-testid="setRoomUrl"
            onClick={(e) => {
              if (!!videoUrlInput) {
                changeVideoUrl(videoUrlInput);
                setVideoUrlInput('');
              }
            }}
          >
            <MdPlayArrow height={32} width={32} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
