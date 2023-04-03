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


import './App.css';
import { failMsg, successMsg } from '../../utils/utils';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

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
  const [savedMoviesList, setSavedMovies] = useState([]);

  const ctx = {
    ...currentUser,
    setCurrentUser,
    savedMovies: savedMoviesList,
    setSavedMovies,
    setTooltipSettings: setTooltipData,
    setInfoTooltipPopupOpen,
  }

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
    }
  }, []);

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
    
  }

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  function handleLogin({ email, password }, setIsLoading) {
    setIsLoading(true);
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
          navigate('/movies', { replace: true })
        }
      })
      .catch(err => {
        console.log(err);
        setTooltipData({ isSuccess: false, message: failMsg });
        setInfoTooltipPopupOpen(true);
      })
      .finally(() => setIsLoading(false));
  }

  function handleRegister({ name, email, password }, setIsLoading) {
    setIsLoading(true)
    authApi.signUp(name, email, password)
      .then(res => {
        if (res) {
          const jwt = localStorage.getItem('token');
          api.setToken(jwt);
          setIsLoggedIn(true);
          setCurrentUser({
            userName: res.name,
            userMail: res.email,
          })
          setTooltipData({ isSuccess: true, message: successMsg });
          setInfoTooltipPopupOpen(true)
          navigate('/movies', { replace: true })
        }
      })
      .catch(err => {
        console.log(err);
        setTooltipData({ isSuccess: false, message: failMsg });
        setInfoTooltipPopupOpen(true);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(name, email) {
    return api.setUserInfo(name, email)
      .then(res => {
        setCurrentUser({
          userName: res.name,
          userMail: res.email,
        });
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
    <CurrentUserContext.Provider value={ctx}>
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
                <Header
                  isLoggedIn={isLoggedIn}
                  handleOverlayClick={handleOverlayClick}
                />
                <Movies />
                <Footer />
              </>
              </ProtectedRoute>
            }
          />
          <Route
            exact path='/saved-movies'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} >
                <Header
                  isLoggedIn={isLoggedIn}
                  handleOverlayClick={handleOverlayClick}
                />
                <SavedMovies />
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
