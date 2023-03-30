import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import remove from "../../images/close.svg";
import { api } from '../../utils/MainApi';
import { formatDuration, successDeleteMsg, successEditMsg } from "../../utils/utils";
import "./MovieCard.css";

const MovieCard = ({ data, saveStatus }) => {
  const { savedMovies, setSavedMovies, setInfoTooltipPopupOpen, setTooltipSettings } = useContext(CurrentUserContext);
  const [isSaved, setIsSaved] = useState(false);
  const [mainApiId, setMainApiId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsSaved(saveStatus.isSaved);
    setMainApiId(saveStatus.id);
  }, []);

  const handleSaveMovie = () => {
    setIsLoading(true);
    api.setSavedMovie(data)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
        setIsSaved(true);
        setMainApiId(res._id)
        setTooltipSettings({
          message: successEditMsg,
          isSuccess: true,
        })
        setInfoTooltipPopupOpen(true);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleDeleteMovie = () => {
    setIsLoading(true);
    api.deleteSavedMovie(mainApiId)
      .then(() => {
        const moviesWithoutDeleted = savedMovies.filter((data) => {
          return !(data._id === mainApiId);
        })
        setSavedMovies(moviesWithoutDeleted);
        setIsSaved(false);
        setTooltipSettings({
          message: successDeleteMsg,
          isSuccess: true,
        })
        setInfoTooltipPopupOpen(true);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <li className="card">
      <a className='card__link' href={data.trailerLink} target='_blank' rel='noreferrer'>
        <img className="card__image" src={data.image} alt={data.nameRU} />
      </a>
      <div className="card__wrapper">
        {data.nameRU}
        {isSaved ? (
          <button type="button" className="card__btn" disabled={isLoading} onClick={handleDeleteMovie}>
            <img className="card__remove-icon" src={remove} alt="remove saved movie" />
          </button>
        ) : (
          <>
            <input id={data.movieId} className="card__save-btn" type="checkbox" onChange={handleSaveMovie}/>
            <label htmlFor={data.movieId} className="card__save-icon" />
          </>
        )}
      </div>
      <div className="card__text">
        {formatDuration(data.duration)}
      </div>
    </li>
  );
};

export default MovieCard;
