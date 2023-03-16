import PropTypes from 'prop-types';

import css from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ id, url, openModal }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={url}
        alt="pixabay img"
        className={css['ImageGalleryItem-image']}
        data-id={id}
        onClick={() => openModal(id)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  url: PropTypes.string,
  openModal: PropTypes.func,
};

export default ImageGalleryItem;
