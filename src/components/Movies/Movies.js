import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";

const Movies = ({ onSearch, renderedMovies }) => {
  return (
    <main className="movies">
      <SearchForm onSearch={onSearch} />
      {renderedMovies.length ? (
        <>
      <MoviesCardList renderedMovies={renderedMovies} />
        <div className="movies__btn">
        Ещё
        </div>
        </>
        ) : (<Preloader />)}
    </main>
  );
};

export default Movies;
