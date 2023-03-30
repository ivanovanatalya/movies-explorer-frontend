import './Promo.css';
import image from "../../images/landing-logo.svg"

const Promo = () => {
  return (
    <section className="landing">
      <div className="landing__text">
        Учебный проект студента факультета Веб-разработки.
      </div>
      <img className="landing__image" src={image} alt=""/>
    </section>
  );
};

export default Promo;
