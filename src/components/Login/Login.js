import { useRef } from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import "./Login.css";

const Login = ({onLogin}) => {
  const inputEmail = useRef(null);
  const inputPass = useRef(null);

  function handleSubmit(event) {
    event.preventDefault()
    const data = {
      email: inputEmail.current.value,
      password: inputPass.current.value
    };
    onLogin(data);
  }
  return (
    <main className="login">
      <img src={logo} className="login__logo" alt="Movies explorer logo" />
      <div className="login__title">
        Рады видеть!
      </div>
      <form className="login__form" method="" action="" onSubmit={handleSubmit}>
        <div>
          <label className="login__label" htmlFor="#email">
          E-mail
          </label>
          <input ref={inputEmail} id="email" className="login__input" placeholder="E-mail" type="email" required />
          <label className="login__label" htmlFor="#password">
          Пароль
          </label>
          <input ref={inputPass} id="password" className="login__input login__input" placeholder="Password" type="password" required />
        </div>
        <nav className="login__navigation">
          <button className="login__btn">
              Войти
          </button>
          <div className="login__block">
            <span className="login__text">
              Ещё не зарегистрированы?
            </span>
            <Link to="/sign-up" className="login__link ">
              Регистрация
            </Link>
          </div>
        </nav>
      </form>
    </main>
  );
};

export default Login;
