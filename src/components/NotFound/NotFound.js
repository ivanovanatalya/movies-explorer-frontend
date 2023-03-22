import { Link } from "react-router-dom";

import "./NotFound.css";

const NotFound = () => {
  return (
    <main className="page">
      <div className="page__title">
        404
      </div>
      <div className="page__text">
        Страница не найдена
      </div>
      <Link to="/"
        className="page__link"
      >
        Назад
      </Link>
    </main>
  );
};

export default NotFound;