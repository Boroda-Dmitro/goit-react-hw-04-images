import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { AiOutlineSearch } from "react-icons/ai"
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = e => {
    this.setState({ search: e.target.value.trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { search } = this.state;
    const { onSubmit } = this.props;
    if (search === '') {
      return toast.error(`Please enter your request `)
    }
    onSubmit(search)
    
  };

  render() {
    const { search } = this.state;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm}>
          <button type="submit" className={css.SearchForm__button} onClick={this.handleSubmit}>
            <AiOutlineSearch className={css.icon}/>
          </button>

          <input
            className={css.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={search}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};