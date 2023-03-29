import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { authApi } from '../../utils/authApi';
import { api } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

import './App.css';
import { filterMovies, normalizeMovies } from '../../utils/utils';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

export const successMsg = 'Вы успешно зарегистрировались!';
export const failMsg = 'Что-то пошло не так! Попробуйте ещё раз.';

function App() {
  const navigate = useNavigate();
  const initTooltipData = { message: '', isSuccess: false, };
  const [tooltipData, setTooltipData] = useState(initTooltipData);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    userName: "name",
    userMail: "email"
  });
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      authApi.checkToken(jwt)
        .then(res => {
          if (res) {
            api.setToken(jwt);
            setIsLoggedIn(true);
            setCurrentUser({
              userName: res.name,
              userMail: res.email
            });
          }
        })
        .catch(err => console.log(err));
    } else {
      console.log('fail')
      // history.replace('/sign-in');
      navigate('/sign-in', { replace: true })
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo()
        .then(res => {
          setCurrentUser({
            userName: res.name,
            userMail: res.email
          })
        })
        .catch(err => console.log(err));
    }
  }, [isLoggedIn]);

  const closeAllPopups = () => {
    setInfoTooltipPopupOpen(false);
    // setIsMenuOpen(false);
  }

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  function handleLogin({ email, password }) {
    authApi.signIn(email, password)
      .then(res => {
        if (res) {
          const jwt = localStorage.getItem('token');
          api.setToken(jwt);
          setIsLoggedIn(true);
          setCurrentUser({
            userName: res.name,
            userMail: res.email,
          })
          // history.replace('/');
          navigate('/', { replace: true })
        }
      })
      .catch(err => {
        console.log(err);
        setTooltipData({ isSuccess: false, message: failMsg });
        setInfoTooltipPopupOpen(true);
      });
  }

  function handleRegister({ name, email, password }) {
    authApi.signUp(name, email, password)
      .then(res => {
        if (res) {
          setTooltipData({ isSuccess: true, message: successMsg });
          setInfoTooltipPopupOpen(true)
          // history.replace('/sign-in');
          navigate('/sign-in', { replace: true })
        }
      })
      .catch(err => {
        console.log(err);
        setTooltipData({ isSuccess: false, message: failMsg });
        setInfoTooltipPopupOpen(true);
      });
  }

  function handleSaveMovie(movie) {
    // movie = { saved: true/false };
    const isMovieSaved = movie.saved;

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeSavedMovieStatus(movie._id, isMovieSaved)
      .then((newMovie) => {
        setMovies ((state) => state.map((item) => item._id === movie._id ? newMovie : item));
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleGetMovies(searchInput, isShort) {
    moviesApi.getMoviesList()
      .then((movies) => {
        console.log('fond')

        const normalizedMovies = normalizeMovies(movies)
        const filteredMovies = searchInput
        ? filterMovies(normalizedMovies, searchInput, isShort)
        : [];

        const search = {
          movies: filterMovies,
          isShort,
          searchInput,
        }
        localStorage.setItem('searchData', search);

        const renderedMovies = filteredMovies.splice(0, 5);
        setMovies(renderedMovies);
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleGetSavedMovies(searchInput, isShort) {
    api.getSavedMovies()
      .then((movies) => {
        console.log('fond')

        // const normalizedMovies = normalizeMovies(movies)
        
        setSavedMovies(movies);
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateUser(name, email) {
    return api.setUserInfo(name, email)
      .then(res => {
        console.log(res)
        setCurrentUser({
          userName: res.name,
          userMail: res.email,
        });
        // closeAllPopups();
      })
  }

  function handleSignOut() {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({
      userName: 'none',
      userMail: 'none',
    })
    navigate('/', { replace: true })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route
            path='/sign-in'
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path='/sign-up'
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            exact path='/'
            element={
              <>
                <Header isLoggedIn={isLoggedIn}
                handleOverlayClick={handleOverlayClick}/>
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            exact path='/movies'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} >
              <>
                <Header isLoggedIn={isLoggedIn}
                handleOverlayClick={handleOverlayClick}/>
                <Movies onSearch={handleGetMovies} renderedMovies={movies}/>
                <Footer />
              </>
              </ProtectedRoute>
            }
          />
          <Route
            exact path='/saved-movies'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} >
                <Header isLoggedIn={isLoggedIn}
                handleOverlayClick={handleOverlayClick}/>
                <SavedMovies onInit={handleGetSavedMovies} savedMovies={savedMovies} setSavedMovies={setSavedMovies} />
                <Footer />
              </ProtectedRoute>
            } />
          <Route
            exact path='/profile'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} >
                <Header
                  isLoggedIn={isLoggedIn}
                  handleOverlayClick={handleOverlayClick}
                />
                <Profile
                  onSignOut={handleSignOut}
                  onProfileEdit={handleUpdateUser}
                  setTooltipSettings={setTooltipData}
                  setInfoTooltipPopupOpen={setInfoTooltipPopupOpen}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          tooltipSettings={tooltipData}
          onOverlayClick={handleOverlayClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
