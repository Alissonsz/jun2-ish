import { useState } from 'react';
import classNames from 'classnames';

import { MdClose } from 'react-icons/md';

import styles from './AddVideoModal.module.scss';
import { useRoom } from '../../contexts/roomContext';

interface AddVideoModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const AddVideoModal: React.FC<AddVideoModalProps> = (props) => {
  const { addVideoToPlaylist } = useRoom();

  const [videoName, setVideoName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleVideoNameChange = (e) => {
    setVideoName(e.target.value);
  };

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVideoToPlaylist(videoName, videoUrl);
    setVideoName('');
    setVideoUrl('');
    props.closeModal();
  };

  return (
    <div
      className={classNames(
        styles['modal-container'],
        'modal',
        props.isOpen ? 'is-active' : ''
      )}
    >
      <div className="modal-background" onClick={props.closeModal}></div>
      <div className="modal-content">
        <div className="content-header">
          <MdClose onClick={props.closeModal} />
        </div>
        <h2 className="title has-text-black has-text-weight-semibold has-text-centered">
          Add video to playlist
        </h2>
        <div className="control">
          <label className="label">Video name</label>
          <input
            type="text"
            className="input"
            value={videoName}
            onChange={handleVideoNameChange}
          />
        </div>
        <div className="control">
          <label className="label">Video url</label>
          <input
            type="text"
            className="input"
            value={videoUrl}
            onChange={handleVideoUrlChange}
          />
        </div>
        <button className="button is-primary" onClick={handleSubmit}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AddVideoModal;
