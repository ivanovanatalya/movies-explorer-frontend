import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import "./Profile.css";

const Profile = () => {
  return (
    <main className="profile">
      <div className="profile__title">
        Привет, Виталий!
      </div>
      <form className="profile__form" method="" action="">
        <div>
          <div className="profile__form-item">
            <div className="profile__text profile__text_bold" htmlFor="#password">
              Имя
            </div>
            <div id="password" className="profile__text" >
              Виталий
            </div>
          </div>
          <div className="profile__form-item">
            <div className="profile__text profile__text_bold">
              E-mail
            </div>
            <div id="email" className="profile__text" >
              pochta@yandex.ru
            </div>
          </div>
        </div>
        <nav className="profile__navigation">
          <button type="button" className="profile__link">
            Редактировать
          </button>
          <Link to="/signin" className="profile__link profile__link_alert">
            Выйти из аккаунта
          </Link>
        </nav>
      </form>
    </main>
  );
};

export default Profile;