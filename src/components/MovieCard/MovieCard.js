import "./MovieCard.css";
import card from "../../images/card.png";

const MovieCard = () => {
  return (
    <div className="card">
      <img className="card__image" src={card} alt="card image" />
      <div className="card__wrapper">
        33 слова о дизайне
        <input id="card" className="card__save-btn" type="checkbox" />
        <label for="card" className="card__save-icon" />
      </div>
      <div className="card__text">
        1ч 42м
      </div>
    </div>
  );
};

export default MovieCard;