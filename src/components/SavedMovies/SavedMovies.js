import { useEffect, useState } from "react";
import { api } from "../../utils/MainApi";
import { filterMovies, normalizeMovies } from "../../utils/utils";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

export const SearchMessage = {
  EMPTY: 'Нужно ввести ключевое слово',
  NOT_FOUND: 'Ничего не найдено',
  NOT_SAVED: 'У вас нет сохранённых фильмов',
  SEARCH_ERROR: 'Во время загрузки сохранённых фильмов произошла ошибка. Подождите немного и попробуйте обновить страницу.',
}

const SavedMovies = ({ onInit, savedMovies, setSavedMovies }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [keyWord, setKeyWord] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [renderedMovies, setRenderedMovies] = useState(savedMovies);

  useEffect(() => {
    // onInit();

      api.getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
          setRenderedMovies(movies);
        })
        .catch(err => {
          console.log(err); // выведем ошибку в консоль
        });
    
  }, []);

  const searchSaved = (keyWord, isShort) => {
    const filteredMovies = filterMovies(savedMovies, keyWord, isShort);
    filteredMovies.length === 0 ? setErrorMessage(SearchMessage.NOT_FOUND) : setErrorMessage('');
    !savedMovies.length ? setErrorMessage(SearchMessage.NOT_SAVED) : setErrorMessage('');
    
    setRenderedMovies(filteredMovies);
  }

  const handleChangeCheckbox = (e) => {
    const isChecked = e.target.checked;
    setIsShortMovies(isChecked);
    localStorage.setItem('storageIsShort', isChecked);
    searchSaved(keyWord, isChecked);
  };

  return (
    <main className="saved-movies">
      <SearchForm
        onSearch={searchSaved}
        onCheckboxChange={handleChangeCheckbox}
        showError={setErrorMessage}
        keyWord={keyWord}
        setKeyWord={setKeyWord}
      />
      {errorMessage ? (
        <p className='profile__error'>{errorMessage}</p>
      ) : (
        <MoviesCardList
          renderedMovies={renderedMovies}
          setSavedMovies={setSavedMovies}
        />
      )}
    </main>
  );
};

export default SavedMovies;