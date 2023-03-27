import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import "./MoviesCardList.css";

const MoviesCardList = ({ isSaved, renderedMovies }) => {
  const {pathname} = useLocation();
  const movies = [];

  const [chunkLength, setChunkLength] = useState(0);
  const [isMoreButton, setIsMoreButton] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResizeWindow = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return (
    <section className="card-list">
      {renderedMovies.map((item, index) => <MovieCard key={index} isSaved={isSaved} />)}
    </section>
  );
};

export default MoviesCardList;