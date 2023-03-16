import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import css from './imageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {images &&
        images.map(({ id, webformatURL }) => (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            openModal={openModal}
            id={id}
          />
        ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  openModal: PropTypes.func,
};

export default ImageGallery;
