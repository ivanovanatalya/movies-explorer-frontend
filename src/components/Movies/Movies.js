import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";

const Movies = ({ onSearch, renderedMovies }) => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [keyWord, setKeyWord] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const storageAllMovies = JSON.parse(localStorage.getItem('storageAllMovies')) || [];
  
  useEffect(() => {
    const storageSearchResult = JSON.parse(localStorage.getItem('storageSearchResult')) || [];
    const storageKeyWord = localStorage.getItem('storageKeyWord') || '';
    const storageIsShort = JSON.parse(localStorage.getItem('storageIsShort')) || false;

    storageSearchResult && setSearchedMovies(storageSearchResult);
    storageKeyWord && setKeyWord(storageKeyWord);
    storageIsShort && setIsShortMovies(storageIsShort);
  }, []);

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

  const handleChangeCheckbox = (isChecked) => {
    setIsShortMovies(isChecked);
    localStorage.setItem('storageIsShort', isChecked);
    getFilteredMovies(keyWord, isChecked);
  };

  return (
    <main className="movies">
      <SearchForm
        onSearch={onSearch}
        onCheckboxChange={handleChangeCheckbox}
        showError={setErrorMessage}
        isLoading={isLoading}
      />
      {isLoading ? <Preloader /> :
        errorMessage.length ? (
          <p className='cards__search-message'>{errorMessage}</p>
        ) : (
          <>
            <MoviesCardList renderedMovies={searchedMovies} />
            <div className="movies__btn">
              Ещё
            </div>
          </>
        )
      }
    </main>
  );
};

export default Movies;
