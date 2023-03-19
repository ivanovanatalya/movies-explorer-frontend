import "./SearchForm.css";
import searchIcon from "../../images/search-filled.svg";

const SearchForm = () => {
  return (
    <section className="search">
      <div className="search__input-container">
      <input className="search__input" type="text" placeholder="Фильм" required />
      <img className="search__button" src={searchIcon} alt="search button" />
      </div>
      <div className="search__checkbox-container">
        <input type="checkbox" />
        <p>Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;