import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

const Movies = () => {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
      <div className="movies__btn">
        Ещё
      </div>
    </main>
  );
};

export default Movies;