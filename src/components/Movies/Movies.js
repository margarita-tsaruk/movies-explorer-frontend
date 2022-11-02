import { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';

function Movies( ) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ movieCards, setMovieCards ] = useState(null);
  const [ filteredMovies, setFilteredMovies ] = useState([]);
  const [ error, setError ] = useState('');
  const [ isChecked, setIsChecked ] = useState(false);
  const [ input, setInput ] = useState('');
  
  
  useEffect(() => {
    const movies = localStorage.getItem('movies');
    if (movies) {
      const getMovies = JSON.parse(movies);
      setMovieCards(getMovies);
    }

    const searchedMovies = localStorage.getItem('searchedMovies');
    if (searchedMovies) {
      const getSearchedMovies = JSON.parse(searchedMovies);
      setMovieCards(getSearchedMovies);
    }

    const checkbox = localStorage.getItem('checkbox');
    if (checkbox === 'true') {
      setIsChecked(true);
    }

    const inputSearch = localStorage.getItem('inputSearch');
    if (inputSearch) {
      setInput(inputSearch);
    }
  }, [])

  function handleCheck() {
    setIsChecked(!isChecked);
  }

  function handleCheckboxOn(foundMovies, inputValueSearch, isChecked) {
    const shortMovies = foundMovies.filter(data => {
      return data.duration <= 40
    });
   
    if(foundMovies[0].duration < 40) {
      setMovieCards(shortMovies);
      localStorage.setItem('movies', JSON.stringify(shortMovies));
      localStorage.setItem('inputSearch', inputValueSearch);
      localStorage.setItem('checkbox', isChecked);
    } else {
      setError('Ничего не найдено');
      setMovieCards(null);
    }
  }

  function handleCheckboxOff(foundMovies, inputValueSearch, isChecked) {
    if(foundMovies[0].duration > 40) {
      setMovieCards(foundMovies);
      localStorage.setItem('movies', JSON.stringify(foundMovies));
      localStorage.setItem('checkbox', isChecked);
      localStorage.setItem('inputSearch', inputValueSearch);
    } else {
      setError('Ничего не найдено');
      setMovieCards(null);
    }
  }

  function handleSearchMovies(inputValueSearch, isChecked) {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((movieCards) => {
        const foundMovies = movieCards.filter(data => {
          return data.nameRU.toLowerCase().includes(inputValueSearch.toLowerCase());
        });

        if (foundMovies.length) {
          localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
          setFilteredMovies(foundMovies);
          localStorage.setItem('inputSearch', inputValueSearch);
        }
        
        if(!isChecked) {
          handleCheckboxOn(foundMovies, inputValueSearch, isChecked);
        } else {
          handleCheckboxOff(foundMovies, inputValueSearch, isChecked);
        }
      })
      .catch((err) => {
        console.log(err);
        setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        setMovieCards(null);
        localStorage.removeItem('movies');
        localStorage.removeItem('checkbox');
        localStorage.removeItem('inputSearch');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  return (
    <main className="movies">
      <SearchForm 
        onSearchMovies={ handleSearchMovies }
        onCheckbox={ handleCheck }
        isChecked={ isChecked }
        input={ input }
      />
      { movieCards ? (
        isLoading 
        ? ( 
          <Preloader />
        ) : (
          <MoviesCardList movieCards={ movieCards }  />
        )
        ) : (
          <div className="movies__error__container">
            <h3 className="movies__error__text">{ error }</h3>
          </div>
        )
      }
    </main>
  );
}

export default Movies;