import classNameNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { MdPlayArrow, MdPlaylistPlay, MdDragHandle } from 'react-icons/md';
import { useRoom } from '../../contexts/roomContext';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ReactSortable } from 'react-sortablejs';
import AddVideoModal from '../AddVideoModal';

const Header = () => {
  const { changeVideoUrl, playlist, reorderPlaylist } = useRoom();
  const { width } = useWindowSize();

  const [videoUrlInput, setVideoUrlInput] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [list, setList] = useState(playlist);

  useEffect(() => {
    setList(playlist);
  }, [playlist]);

  return (
    <>
      <div
        className={classNameNames(
          'px-6 pt-2 columns is-mobile is-fullwidth',
          styles.header
        )}
      >
        <div className="column is-2-desktop is-2-mobile has-text-black has-text-weight-bold is-size-4">
          {width < 768 ? 'J2I' : 'Jun2-ish'}
        </div>
        <div
          className={classNameNames(
            'column is-8-desktop is-8-mobile is-flex is-justify-content-center is-paddingless',
            styles['search-input-container']
          )}
        >
          <div
            className={classNameNames(
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
        <div
          className={classNameNames(
            styles['playlist-container'],
            'dropdown is-hoverable column is-2'
          )}
        >
          <div className="dropdown-trigger">
            <MdPlaylistPlay height={32} width={32} />
            <span className="is-hidden-touch">Playlist</span>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {list.length > 0 ? (
                <ReactSortable
                  className="list-container"
                  list={list.map((x) => ({ ...x, chosen: true }))}
                  setList={setList}
                  onEnd={(order, sortable, evt) => {
                    reorderPlaylist(list);
                  }}
                >
                  {list.map((a) => (
                    <div key={a.id}>
                      <span> {a.name}</span>
                      <MdDragHandle />{' '}
                    </div>
                  ))}
                </ReactSortable>
              ) : (
                <span className="ml-2">Nothing here yet</span>
              )}

              <div className="button-container">
                <button
                  className="button is-primary is-rounded"
                  onClick={() => setShowAddModal(true)}
                >
                  Add video
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddVideoModal
        isOpen={showAddModal}
        closeModal={() => setShowAddModal(false)}
      />
    </>
  );
};

export default Header;
