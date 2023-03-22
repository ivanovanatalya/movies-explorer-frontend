import "./SearchForm.css";
import searchIconFilled from "../../images/search-filled.svg";
import searchIcon from "../../images/search.svg";

const SearchForm = () => {
  return (
    <section className="search">
      <div className="search__input-container">
      <img className="search__button search__button_left" src={searchIcon} alt="search button" />
      <input className="search__input" type="text" placeholder="Фильм" required />
      <img className="search__button" src={searchIconFilled} alt="search button" />
      </div>
      <div className="search__checkbox-container">
        <input id="filter" className="search__checkbox" type="checkbox" />
        <label htmlFor="filter" className="search__checkbox-label"></label>
        <span className="search__text">Короткометражки</span>
      </div>
    </section>
  );
};

export default SearchForm;
