import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

const SavedMovies = () => {
  return (
    <main className="movies">
      <SearchForm />
      <div>
        SavedMoviesCardList
      </div>
    </main>
  );
};

export default SavedMovies;