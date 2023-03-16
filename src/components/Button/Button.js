import PropTypes from 'prop-types';

import css from './button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className={css.Button} onClick={onLoadMore}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func,
};

export default Button;
