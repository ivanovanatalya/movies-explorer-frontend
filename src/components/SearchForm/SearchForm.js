import { useRef } from "react";
import searchIconFilled from "../../images/search-filled.svg";
import searchIcon from "../../images/search.svg";
import { SearchMessage } from "../SavedMovies/SavedMovies";
import "./SearchForm.css";

const SearchForm = ({
  onSearch,
  isChecked,
  onCheckboxChange,
  showError,
  isLoading,
  keyWord,
  setKeyWord,
}) => {
  const searchRef = useRef(null);
  const toggleRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault()
    const isFormValid = event.target.closest('form').checkValidity();
    isFormValid ? onSearch(searchRef.current.value, toggleRef.current.checked) : showError(SearchMessage.EMPTY);
  }

  return (
    <section className="search">
      <form method="" action="" className="search__input-container" onSubmit={handleSubmit} >
        <img className="search__button search__button_left" src={searchIcon} alt="search button" />
        <input
          className="search__input"
          disabled={isLoading}
          ref={searchRef}
          value={keyWord || ''}
          onChange={(e) => setKeyWord(e.target.value)}
          type="text"
          name='keyWord'
          id='keyWord'
          placeholder="Фильм"
          minLength="1"
          maxLength="30"
          // required
        />
        <button
          className="search__button"
          disabled={isLoading}
        >
          <img src={searchIconFilled} alt="search button" />
        </button>
      </form>
      <div className="search__checkbox-container">
        <input
          id="filter"
          onChange={onCheckboxChange}
          className="search__checkbox"
          ref={toggleRef}
          checked={isChecked}
          type="checkbox"
        />
        <label htmlFor="filter" className="search__checkbox-label"></label>
        <span className="search__text">Короткометражки</span>
      </div>
    </section>
  );
};

export default SearchForm;
