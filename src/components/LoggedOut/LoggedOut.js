import { Link } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const LoggedOut = () => {
  return (
    <main className="page">
      <Preloader />
      <Link to="/"
        className="page__link"
      >
        На главную
      </Link>
    </main>
  );
};

export default LoggedOut;