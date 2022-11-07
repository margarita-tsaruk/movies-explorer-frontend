import { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies( { movieCards, isLoading, setIsLoading, savedMovies, onSaveMovies } ) {
  const [ isChecked, setIsChecked ] = useState(false);
  const [ filteredMovies, setFilteredMovies ] = useState(null);
  const [ searchedMovies, setSearchedMovies ] = useState([]);
  const [ input, setInput ] = useState('');
  const [ error, setError ] = useState('Enter');
  
  useEffect(() => {  
    const searchedMovies = localStorage.getItem('searchedMovies');
    if (searchedMovies) {
      const parsedSearchedMovies = JSON.parse(searchedMovies);
      setSearchedMovies(parsedSearchedMovies);
    }

    const checkbox = localStorage.getItem('checkbox');
    if (checkbox) {
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

  function handleCheckboxOn(foundMovies, isChecked) {
    const shortMovies = foundMovies.filter(data => {
      return data.duration <= 40
    });

    if (foundMovies.length) {
      setFilteredMovies(shortMovies);
      console.log(shortMovies)
      localStorage.setItem('checkbox', isChecked);
    } else {
      setError('Ничего не найдено');
      setFilteredMovies(null);
    }
  }

  function handleCheckboxOff(foundMovies, isChecked) {
    if (foundMovies.length) {
      setFilteredMovies(foundMovies);
      localStorage.setItem('checkbox', isChecked);
      console.log(foundMovies)
    } else {
      setError('Ничего не найдено');
      setFilteredMovies(null);
    }
  }

  function handleSearchMovies(inputValueSearch, isChecked) {
    setIsLoading(true)
    
    try {
      const foundMovies = movieCards.filter(data => {
        return data.nameRU.toLowerCase().includes(inputValueSearch.toLowerCase());
      });

        console.log(foundMovies) // найденные фильмы в поиске

      if (foundMovies.length) {
        localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
        setSearchedMovies(foundMovies);
        localStorage.setItem('inputSearch', inputValueSearch);
      } 

      if (!isChecked) {
        handleCheckboxOn(foundMovies, inputValueSearch, isChecked); 
      } else {
        handleCheckboxOff(foundMovies, inputValueSearch, isChecked);
      }
    } catch (err) {
      setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    } finally {
      setTimeout(()=> setIsLoading(false), 500)
    }
  }

  function handleFilterShortMovies(searchedMovies, isChecked) {
    if (!isChecked) {
      const shortMovies = searchedMovies.filter(data => {
        return data.duration <= 40
      });
      setFilteredMovies(shortMovies);
      localStorage.setItem('checkbox', isChecked);
    } else {
      const longMovies = searchedMovies.filter(data => {
        return data.duration > 40
      });
      setFilteredMovies(longMovies);
      localStorage.setItem('checkbox', isChecked);
    }
  }

  useEffect(() => {
    handleFilterShortMovies(searchedMovies, isChecked)
  }, [isChecked, searchedMovies])

  return (
    <main className="movies">
      <SearchForm 
        onSearchMovies={ handleSearchMovies }
        onCheckbox={ handleCheck }
        isChecked={ isChecked }
        input={ input }
        errоr={ setError }
      />
      { filteredMovies ? (
        isLoading 
          ? ( 
            <Preloader />
          ) : (
            <MoviesCardList 
              filteredMovies={ filteredMovies } 
              savedMovies={ savedMovies }
              onSaveMovies={ onSaveMovies }
            />
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