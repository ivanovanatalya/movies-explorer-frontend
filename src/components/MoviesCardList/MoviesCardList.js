import MovieCard from "../MovieCard/MovieCard";
import "./MoviesCardList.css";

const MoviesCardList = () => {
  const movies = [1,2,3];
  return (
    <section className="card-list">
      {movies.map(() => <MovieCard />)}
    </section>
  );
};

export default MoviesCardList;