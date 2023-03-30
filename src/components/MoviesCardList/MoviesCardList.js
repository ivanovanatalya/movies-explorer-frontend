import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Breakpoint, Length } from "../../utils/utils";
import MovieCard from "../MovieCard/MovieCard";
import "./MoviesCardList.css";

const MoviesCardList = ({ renderedMovies }) => {
  const {pathname} = useLocation();
  const { savedMovies } = useContext(CurrentUserContext)
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


  useEffect(() => {
    if (windowWidth <= Breakpoint.MOBILE) {
      setChunkLength(Length.MOBILE);
    } else if (windowWidth <= Breakpoint.TABLET) {
      setChunkLength(Length.TABLET);
    } else {
      setChunkLength(Length.DESKTOP);
    }
  }, [windowWidth, renderedMovies.length]);

  useEffect(() => {
    if (pathname === '/movies' ) {
      renderedMovies.length > chunkLength ? setIsMoreButton(true) : setIsMoreButton(false);
    } else {
      setIsMoreButton(false);
    }
  }, [pathname, renderedMovies.length, chunkLength]);

  const handleMoreBtnClick = () => {
    setChunkLength((current) => {
      if (windowWidth <= Breakpoint.TABLET) {
        return current + 2;
      }
      return current + 3;
    })
  };

  const checkIsSaved = (movie) => {
    const targetMovie = savedMovies.find((film) => film.movieId === movie.movieId);
    return targetMovie
      ? { isSaved: true, id: targetMovie._id }
      : { isSaved: false, id: '' }
  };

  return (
    <section className="card-list">
      <ul className="card-list__wrapper">
        {pathname === "/movies" && renderedMovies.length ?
          renderedMovies.map(
            (item) => 
              <MovieCard
                key={item.movieId}
                data={item}
                saveStatus={checkIsSaved(item)}
              />
            ) :
          renderedMovies.map(
            (item) => {
              return <MovieCard
              key={item.movieId}
              data={item}
              saveStatus={{ isSaved: true, id: item._id }}
              />
            }
        )}
      </ul>
      {isMoreButton ?
        <button
          className="movies__btn"
          type="button"
          onClick={handleMoreBtnClick}
        >
          Ещё
        </button>
        : null}
    </section>
  );
};

export default MoviesCardList;