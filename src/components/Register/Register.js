import { useRef } from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import "./Register.css";


const Register = ({ onRegister }) => {
  const inputName = useRef(null);
  const inputEmail = useRef(null);
  const inputPass = useRef(null);

  function handleSubmit(event) {
    event.preventDefault()
    const data = {
      name: inputName.current.value,
      email: inputEmail.current.value,
      password: inputPass.current.value
    };
    onRegister(data);
  }

  return (
    <main className="register">
      <img src={logo} className="register__logo" alt="Movies explorer logo" />
      <div className="register__title">
        Добро пожаловать!
      </div>
      <form className="register__form" method="" action="" onSubmit={handleSubmit}>
        <div>
          <label className="register__label" htmlFor="#name">
            Имя
          </label>
          <input ref={inputName} id="name" className="register__input" placeholder="Name" type="text" required />
          <label className="register__label" htmlFor="#email">
            E-mail
          </label>
          <input ref={inputEmail} id="email" className="register__input" placeholder="E-mail" type="email" required />
          <label className="register__label" htmlFor="#password">
            Пароль
          </label>
          <input ref={inputPass} id="password" className="register__input register__input_error" placeholder="Password" type="password" required />
          <p className="register__label register__input_error">Что-то пошло не так...</p>
        </div>
        <nav className="register__navigation">
          <button className="register__btn" >
            {/* <Link to="/sign-up"> */}
            Зарегистрироваться
            {/* </Link> */}
          </button>
          <div className="register__block">
            <span className="register__text">
              Уже зарегистрированы?
            </span>
            <Link to="/sign-in" className="register__link ">
              Войти
            </Link>
          </div>
        </nav>
      </form>
    </main>
  );
};

export default Register;
