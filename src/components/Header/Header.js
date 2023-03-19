import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import user from '../../images/user_account.svg';
import openMenu from '../../images/burger.svg';
import closeMenu from '../../images/close.svg';

const Header = () => {
  const isLoggedIn = false;
  const isMenuHidden = false;
  return (
    <header className="header">
      {/* <img className="header__icon" src={openMenu} alt="open menu button" />
      <img className="header__icon" src={closeMenu} alt="close menu button" /> */}
      <Link to='/' className="header__logo">
        <img src={logo} className="header__logo" alt="Movies explorer logo" />
      </Link>
      <div className="header__account">
        {isLoggedIn ? (
            <>
              <div className="header__navigation">
                <Link to="/movies">Films</Link>
                <Link to="/saved-movies">Saved</Link>
              </div>
              <div className="">
                <Link to="/profile" className="header">
                  <div className="">
                    Account
                  </div>
                  <img src={user} className="" alt="user icon" />
                </Link>
              </div>
            </>
          ) : (
            <nav className="header__navigation">
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