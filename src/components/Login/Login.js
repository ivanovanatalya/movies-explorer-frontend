import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import "./Login.css";

const Login = () => {
  return (
    <main className="login">
      <img src={logo} className="login__logo" alt="Movies explorer logo" />
      <div className="login__title">
        Рады видеть!
      </div>
      <form className="login__form" method="" action="">
        <div>
          <label className="login__label" htmlFor="#email">
          E-mail
          </label>
          <input id="email" className="login__input" value="pochta@yandex.ru|" type="email" />
        {/* </div>
        <div> */}
          <label className="login__label" htmlFor="#password">
          Пароль
          </label>
          <input id="password" className="login__input login__input" value="" type="password" />
        </div>
        <nav className="login__navigation">
          <Link to="/signin" className="login__btn">
          Войти
          </Link>
          <div className="login__block">
            <span className="login__text">
              Ещё не зарегистрированы?
            </span>
            <Link to="/signup" className="login__link ">
              Регистрация
            </Link>
          </div>
        </nav>
      </form>
    </main>
  );
};

export default Login;