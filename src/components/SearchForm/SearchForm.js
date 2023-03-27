import { useRef } from "react";
import searchIconFilled from "../../images/search-filled.svg";
import searchIcon from "../../images/search.svg";
import "./SearchForm.css";

const SearchForm = ({ onSearch }) => {
  const searchRef = useRef(null);
  const toggleRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(searchRef.current.value, toggleRef.current.value)
  }

  return (
    <section className="search">
      <form method="" action="" className="search__input-container" onSubmit={handleSubmit} >
        <img className="search__button search__button_left" src={searchIcon} alt="search button" />
        <input className="search__input" ref={searchRef} type="text" placeholder="Фильм" required />
        <button type="submit"  className="search__button">
          <img src={searchIconFilled} alt="search button" />
        </button>
      </form>
      <div className="search__checkbox-container">
        <input id="filter" className="search__checkbox" ref={toggleRef} type="checkbox" />
        <label htmlFor="filter" className="search__checkbox-label"></label>
        <span className="search__text">Короткометражки</span>
      </div>
    </section>
  );
};

export default SearchForm;
