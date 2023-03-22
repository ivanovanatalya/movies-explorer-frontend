import MovieCard from "../MovieCard/MovieCard";
import "./MoviesCardList.css";

const MoviesCardList = ({ isSaved }) => {
  const movies = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  return (
    <section className="card-list">
      {movies.map(() => <MovieCard isSaved />)}
    </section>
  );
};

export default MoviesCardList;