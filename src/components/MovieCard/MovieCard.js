import "./MovieCard.css";
import card from "../../images/card.png";
import remove from "../../images/close.svg";
import { formatDuration } from "../../utils/utils";

const MovieCard = ({ isSaved, data }) => {
  console.log(data)
  return (
    <div className="card">
      <img className="card__image" src={data.image} alt={data.nameRU} />
      <div className="card__wrapper">
        {data.nameRU}
        {isSaved ? (
          <button type="button" className="card__btn">
            <img className="card__remove-icon" src={remove} alt="remove saved movie" />
          </button>
        ) : (
          <>
            <input id="card" className="card__save-btn" type="checkbox" />
            <label htmlFor="card" className="card__save-icon" />
          </>
        )}
      </div>
      <div className="card__text">
        {formatDuration(data.duration)}
      </div>
    </div>
  );
};

export default MovieCard;
