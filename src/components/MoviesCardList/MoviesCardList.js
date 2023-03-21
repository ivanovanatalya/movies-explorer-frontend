import MovieCard from "../MovieCard/MovieCard";
import "./MoviesCardList.css";

const MoviesCardList = ({ isSaved }) => {
  const movies = [1,2,3,4,5];
  return (
    <section className="card-list">
      {movies.map(() => <MovieCard isSaved />)}
    </section>
  );
};

export default MoviesCardList;