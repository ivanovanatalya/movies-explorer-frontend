import { useEffect, useState } from "react";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { SearchMessage } from "../SavedMovies/SavedMovies";
import "./Movies.css";
import { moviesApi } from "../../utils/MoviesApi";
import { filterMovies, normalizeMovies } from "../../utils/utils";

const Movies = ({ renderedMovies, savedMovies }) => {
  const [searchedMovies, setSearchedMovies] = useState(renderedMovies);
  const [keyWord, setKeyWord] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const storageAllMovies = JSON.parse(localStorage.getItem('storageAllMovies')) || [];
  
  useEffect(() => {
    const storageSearchResult = JSON.parse(localStorage.getItem('storageSearchResult')) || [];
    const storageKeyWord = localStorage.getItem('storageKeyWord') || '';
    const storageIsShort = JSON.parse(localStorage.getItem('storageIsShort')) || false;

    storageSearchResult.length ? setSearchedMovies(storageSearchResult) : 
    moviesApi.getMoviesList()
      .then((movies) => {
        const normalizedMovies = normalizeMovies(movies);
        setSearchedMovies(normalizedMovies)
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
    storageKeyWord && setKeyWord(storageKeyWord);
    storageIsShort && setIsShortMovies(storageIsShort);
  }, []);

  const getFilteredMovies = (keyWord, isShortMovies) => {
    if (!storageAllMovies.length) {
      setIsLoading(true);
      moviesApi.getMoviesList()
        .then((allMovies) => {
          const normalizedMovies = normalizeMovies(allMovies);
          localStorage.setItem('storageAllMovies', JSON.stringify(normalizedMovies));
          const filteredMovies = keyWord || isShortMovies
            ? filterMovies(normalizedMovies, keyWord, isShortMovies)
            : normalizedMovies;
          handleFilterResult(filteredMovies);
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(SearchMessage.SEARCH_ERROR);
        })
        .finally(() => setIsLoading(false));
    } else {
      const filteredMovies = keyWord || isShortMovies
        ? filterMovies(storageAllMovies, keyWord, isShortMovies)
        : storageAllMovies;
      handleFilterResult(filteredMovies);
    }
  };

  const handleFilterResult = (movies) => {
    setSearchedMovies(movies);
    localStorage.setItem('storageSearchResult', JSON.stringify(movies));
    movies.length === 0
      ? setErrorMessage(SearchMessage.NOT_FOUND)
      : setErrorMessage('');
  }

  const handleSubmitSearch = (keyWord) => {
    setKeyWord(keyWord);
    localStorage.setItem('storageKeyWord', keyWord);
    getFilteredMovies(keyWord, isShortMovies);
  };

  const handleChangeCheckbox = (e) => {
    const isChecked = e.target.checked;
    setIsShortMovies(isChecked);
    localStorage.setItem('storageIsShort', isChecked);
    getFilteredMovies(keyWord, isChecked);
  };

  return (
    <main className="movies">
      <SearchForm
        onSearch={handleSubmitSearch}
        isChecked={isShortMovies}
        onCheckboxChange={handleChangeCheckbox}
        showError={setErrorMessage}
        isLoading={isLoading}
        keyWord={keyWord}
        setKeyWord={setKeyWord}
      />
      {isLoading ? <Preloader /> :
        errorMessage.length ? (
          <p className='cards__search-message'>{errorMessage}</p>
        ) : (
          <>
            <MoviesCardList
            renderedMovies={searchedMovies}
            savedMovies={savedMovies} />
          </>
        )
      }
    </main>
  );
};

export default Movies;
