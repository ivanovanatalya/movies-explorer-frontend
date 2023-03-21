import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import user from '../../images/user_account.svg';
import openMenu from '../../images/burger.svg';
import closeMenu from '../../images/close.svg';
import { useState } from 'react';

const Header = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerClass = !isLoggedIn && "header_anon";
  return (
    <header className={`header ${headerClass}`}>
      <Link to='/' className="header__logo">
        <img src={logo} className="header__logo" alt="Movies explorer logo" />
      </Link>
      <div className="header__items">
        {isLoggedIn ? (
          <>
            <img className="header__icon" src={openMenu} onClick={() => setIsMenuOpen(true)} alt="open menu button" />
            {isMenuOpen ? (
              <section className="header__side-menu-wrapper">
                <div className="header__side-menu">
                  <img className="header__icon header__icon_menu" src={closeMenu} onClick={() => setIsMenuOpen(false)} alt="close menu button" />
                  <div className="header__navigation header__navigation_main">
                    <Link to="/" className="header__title">
                      Главная
                    </Link>
                    <Link to="/movies" className="header__title">
                      Фильмы
                    </Link>
                    <Link to="/saved-movies" className="header__title">
                      Сохранённые фильмы
                    </Link>
                  </div>
                  <Link to="/profile" className="header__navigation">
                    <div className="header__text">
                      Аккаунт
                    </div>
                    <div className="header__icon-wrapper">
                      <img src={user} className="" alt="user icon" />
                    </div>
                  </Link>
                </div>
              </section>
            ) : (
              <section className="header__menu">
                <div className="header__navigation">
                  <Link to="/movies">Фильмы</Link>
                  <Link to="/saved-movies">Сохранённые фильмы</Link>
                </div>
                <div>
                  <Link to="/profile" className="header__account">
                    <div className="">
                      Аккаунт
                    </div>
                    <img src={user} className="" alt="user icon" />
                  </Link>
                </div>
              </section>
            )}
          </>
        ) : (
          <nav className="header__navigation_anon">
            <Link to="/signup" className="header__btn">
              Регистрация
            </Link>
            <Link to="/signin" className="header__btn header__btn_primary">
              Войти
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;