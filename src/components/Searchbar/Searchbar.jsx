import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';

export const Searchbar = ({onSubmit}) => {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.target.value.trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search === '') {
      return toast.error(`Please enter your request `);
    }
    onSubmit(search);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm}>
        <button
          type="submit"
          className={css.SearchForm__button}
          onClick={handleSubmit}
        >
          <AiOutlineSearch className={css.icon} />
        </button>

        <input
          className={css.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={search}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
