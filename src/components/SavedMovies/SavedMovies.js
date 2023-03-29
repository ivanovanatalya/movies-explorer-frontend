import { useEffect, useState } from "react";
import { filterMovies } from "../../utils/utils";
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

  useEffect(() => {
    onInit();
  }, []);

  const searchSaved = (keyWord, isShort) => {
    const filteredMovies = filterMovies(savedMovies, keyWord, isShort);
    filteredMovies.length === 0 ? setErrorMessage(SearchMessage.NOT_FOUND) : setErrorMessage('');
    !savedMovies.length ? setErrorMessage(SearchMessage.NOT_SAVED) : setErrorMessage('');
  
    setSavedMovies(filteredMovies);
  }

  return (
    <main className="saved-movies">
      <SearchForm onSearch={searchSaved} />
      {errorMessage.length ? (
        <p className='profile__error'>{errorMessage}</p>
      ) : (
        <MoviesCardList renderedMovies={savedMovies} isSaved />
      )}
    </main>
  );
};

export default SavedMovies;