import "./MovieCard.css";
import card from "../../images/card.png";
import remove from "../../images/close.svg";

const MovieCard = ({ isSaved }) => {
  return (
    <div className="card">
      <img className="card__image" src={card} alt="card image" />
      <div className="card__wrapper">
        33 слова о дизайне
        {isSaved ? (
          <img className="card__remove-icon" src={remove} alt="remove saved movie" />
        ) : (
          <>
            <input id="card" className="card__save-btn" type="checkbox" />
            <label htmlFor="card" className="card__save-icon" />
          </>
        )}
      </div>
      <div className="card__text">
        1ч 42м
      </div>
    </div>
  );
};

export default MovieCard;