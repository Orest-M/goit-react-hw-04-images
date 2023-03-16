import { useState, useEffect } from 'react';
import axios from 'axios';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

import css from './app.module.css';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=32821640-07af0db556e394f2b39c0c0e4&image_type=photo&orientation=horizontal&per_page=12';

export const App = () => {
  const [images, setImages] = useState(null);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageId, setImageId] = useState(null);

  const changeImages = (q, page) => {
    setQ(q);
    setPage(page);
  };

  useEffect(() => {
    request('q');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  useEffect(() => {
    request('page');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const request = async parameter => {
    if (parameter !== 'q' && parameter !== 'page') return;
    if (!q) return;

    setLoading(true);

    try {
      const response = await axios.get(
        `&q=${q}&page=${parameter === 'q' ? 1 : page}`
      );

      if (response.data.hits.length < 1) {
        parameter === 'q'
          ? alert('По цьому запиту не знайдено зображень')
          : setShowButton(false);
      } else {
        if (response.data.hits.length < 20) {
          setShowButton(false);
        }

        if (parameter === 'q') {
          setImages(response.data.hits);
          setShowButton(true);
        } else {
          setImages(item => [...item, ...response.data.hits]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onUpdateSearch = q => {
    changeImages(q, 1);
  };

  const onLoadMore = () => {
    setPage(item => item + 1);
  };

  const openModal = id => {
    setImageId(id);

    document.querySelector('body').addEventListener('keydown', closeModal);
  };

  const closeModal = e => {
    if (e.target.dataset.overlay || e.key === 'Escape') {
      setImageId(null);

      document.querySelector('body').removeEventListener('keydown', closeModal);
    }
  };

  const getCurrentImage = () => {
    return images.filter(item => item.id === imageId);
  };

  return (
    <div className={css.App}>
      <Searchbar onUpdateSearch={onUpdateSearch} />
      <ImageGallery images={images} openModal={openModal} />
      {showButton && <Button onLoadMore={onLoadMore} />}
      {loading && (
        <div style={{ margin: '0 auto', width: '80px' }}>
          <Loader />
        </div>
      )}
      {imageId && (
        <Modal currentImg={getCurrentImage()} closeModal={closeModal} />
      )}
    </div>
  );
};
