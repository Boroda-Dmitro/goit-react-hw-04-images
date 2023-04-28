import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onCloseModal, modalImage, tags }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      console.log('unmount');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        <img src={modalImage} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  modalImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
