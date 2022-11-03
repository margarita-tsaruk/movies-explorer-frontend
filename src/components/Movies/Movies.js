import { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies( { movieCards, handleGetMovies } ) {
  const [ isChecked, setIsChecked ] = useState(false);
  const [ filteredMovies, setFilteredMovies ] = useState(null);
  const [ searchedMovies, setSearchedMovies ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ input, setInput ] = useState('');
  const [ error, setError ] = useState('');
  
  useEffect(() => {
    console.log(movieCards)
    const movies = localStorage.getItem('movies');
    if (movies) {
      handleGetMovies();
    }
  
    console.log(filteredMovies)
    console.log(JSON.parse(localStorage.getItem('movies')))

    const searchedMovies = localStorage.getItem('searchedMovies');
    if (searchedMovies) {
      const getSearchedMovies = JSON.parse(searchedMovies);
      setFilteredMovies(getSearchedMovies);
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
      setFilteredMovies(shortMovies);
      localStorage.setItem('checkbox', isChecked);
    } else {
      setError('Ничего не найдено');
      setFilteredMovies(null);
    }
  }

  function handleCheckboxOff(foundMovies, inputValueSearch, isChecked) {
    if(foundMovies[0].duration > 40) {
      setFilteredMovies(foundMovies);
      localStorage.setItem('checkbox', isChecked);
    } else {
      setError('Ничего не найдено');
      setFilteredMovies(null);
    }
  }

  function handleSearchMovies(inputValueSearch, isChecked) {
    setIsLoading(true);
    const movies = JSON.parse(localStorage.getItem('movies'));
      console.log(movies)
      const foundMovies = movies.filter(data => {
      return data.nameRU.toLowerCase().includes(inputValueSearch.toLowerCase());
      });
      
      if (foundMovies.length) {
        setSearchedMovies(foundMovies);
        localStorage.setItem('searchedMovies', JSON.stringify(foundMovies));
        localStorage.setItem('inputSearch', inputValueSearch);
      }
          
      if (!isChecked) {
        handleCheckboxOn(foundMovies, inputValueSearch, isChecked);
      } else {
        handleCheckboxOff(foundMovies, inputValueSearch, isChecked);
      }

     
      //setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    
      setIsLoading(false);
    
  }

  return (
    <main className="movies">
      <SearchForm 
        onSearchMovies={ handleSearchMovies }
        onCheckbox={ handleCheck }
        isChecked={ isChecked }
        input={ input }
      />
      { filteredMovies ? (
        isLoading 
        ? ( 
          <Preloader />
        ) : (
          <MoviesCardList filteredMovies={ filteredMovies } />
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