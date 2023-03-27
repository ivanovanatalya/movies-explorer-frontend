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

function App() {
  const navigate = useNavigate();
  const successMsg = 'Вы успешно зарегистрировались!';
  const failMsg = 'Что-то пошло не так! Попробуйте ещё раз.';
  const initTooltipData = { isOpen: false, type: '', text: '' };
  const [tooltipData, setTooltipData] = useState(initTooltipData);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userMail, setUserMail] = useState('');
  const [currentUser, setCurrentUser] = useState ('name');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      authApi.checkToken(jwt)
        .then(res => {
          if (res) {
            console.log('check')
            api.setToken(jwt);
            setIsLoggedIn(true);
            setUserMail(res.email);
            // history.replace('/');
            // navigate('/', { replace: true })
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
          console.log('isLog')
          setCurrentUser(res);
        })
        .catch(err => console.log(err));
    }
  }, [isLoggedIn]);

  function handleLogin({ email, password }) {
    authApi.signIn(email, password)
      .then(res => {
        if (res) {
          const jwt = localStorage.getItem('token');
          api.setToken(jwt);
          setIsLoggedIn(true);
          setUserMail(email);
          // history.replace('/');
          navigate('/', { replace: true })
        }
      })
      .catch(err => {
        console.log(err);
        setTooltipData({ isOpen: true, type: 'fail', text: failMsg });
      });
  }

  function handleRegister({ name, email, password }) {
    authApi.signUp(name, email, password)
      .then(res => {
        if (res) {
          setTooltipData({ isOpen: true, type: 'success', text: successMsg });
          // history.replace('/sign-in');
          navigate('/sign-in', { replace: true })
        }
      })
      .catch(err => {
        console.log(err);
        setTooltipData({ isOpen: true, type: 'fail', text: failMsg });
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

  function handleSignOut() {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserMail('');
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
                <Header isLoggedIn={isLoggedIn} />
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
                <Header isLoggedIn={isLoggedIn} />
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
                <Header isLoggedIn={isLoggedIn} />
                <SavedMovies />
                <Footer />
              </ProtectedRoute>
            } />
          <Route
            exact path='/profile'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} >
                <Header isLoggedIn={isLoggedIn} />
                <Profile onSignOut={handleSignOut} />
              </ProtectedRoute>
            }
          />
          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
