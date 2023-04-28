import PropTypes from 'prop-types';

import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ onOpenModal, src, alt, srcModal }) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => onOpenModal(srcModal, alt)}
    >
      <img src={src} alt={alt} className={css.ImageGalleryItem__image} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  srcModal: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
