import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import "./Register.css";


const Register = () => {
  return (
    <main className="register">
      <img src={logo} className="register__logo" alt="Movies explorer logo" />
      <div className="register__title">
        Добро пожаловать!
      </div>
      <form className="register__form" method="" action="">
        <div>
          <label className="register__label" htmlFor="#name">
          Имя
          </label>
          <input id="name" className="register__input" placeholder="Name" value="Виталий" type="text" required />
          <label className="register__label" htmlFor="#email">
          E-mail
          </label>
          <input id="email" className="register__input" placeholder="E-mail" value="pochta@yandex.ru|" type="email" required />
          <label className="register__label" htmlFor="#password">
          Пароль
          </label>
          <input id="password" className="register__input register__input_error" placeholder="Password" value="12345678912345" type="password" required />
          <p className="register__label register__input_error">Что-то пошло не так...</p>
        </div>
        <nav className="register__navigation">
          <Link to="/signup" className="register__btn">
          Зарегистрироваться
          </Link>
          <div className="register__block">
            <span className="register__text">
              Уже зарегистрированы?
            </span>
            <Link to="/signin" className="register__link ">
              Войти
            </Link>
          </div>
        </nav>
      </form>
    </main>
  );
};

export default Register;
