import "./Portfolio.css";

const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="portfolio__title">
        Портфолио
      </div>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a href="https://github.com/ivanovanatalya/how-to-learn.git" target="_blank" rel="noreferrer" className="portfolio__link">
            <div className="portfolio__link-wrapper">
              Статичный сайт
            </div>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://ivanovanatalya.github.io/russian-travel/index.html" target="_blank" rel="noreferrer" className="portfolio__link">
            <div className="portfolio__link-wrapper">
              Адаптивный сайт
            </div>
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/ivanovanatalya/react-mesto-api-full.git" target="_blank" rel="noreferrer" className="portfolio__link">
            <div className="portfolio__link-wrapper">
              Одностраничное приложение
            </div>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
