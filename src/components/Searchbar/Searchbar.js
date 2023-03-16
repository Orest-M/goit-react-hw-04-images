import { useState } from 'react';
import PropTypes from 'prop-types';

import css from './searchbar.module.css';

const Searchbar = ({ onUpdateSearch }) => {
  const [input, setInput] = useState('');

  const onChangeInput = e => {
    setInput(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!input) {
      alert('Напишіть запит у поле вводу');
      return;
    }

    onUpdateSearch(input);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangeInput}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onUpdateSearch: PropTypes.func,
};

export default Searchbar;
