import { Routes, Route } from 'react-router-dom';

import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';

import './App.css';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route
          path='/signin'
          element={<Login />}
        />
        <Route
          path='/signup'
          element={<Register />}
        />
        <Route
          exact path='/'
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          exact path='/movies'
          element={
            <>
              <Header />
              <Movies /> 
              <Footer />
            </>
          }
        />
        <Route
          exact path='/saved-movies'
          element={
            <>
              <Header />
              <SavedMovies />
              <Footer />
            </>
          }
        />
        <Route
          exact path='/profile'
          element={
            <>
              <Header />
              profile
              {/* <Profile /> */}
            </>
          }
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
}

export default App;
