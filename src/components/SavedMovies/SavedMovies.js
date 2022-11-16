import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { ShortMovieDuration } from '../../utils/config'

function SavedMovies( { savedMovies, onSaveMovies, onMovieDelete } ) {
  const [ searchedSavedMovies, setSearchedSavedMovies ] = useState([]);
  const [ error, setError ] = useState('');
  const [ isChecked, setIsChecked ] = useState(false);

  useEffect(() => {
    setIsChecked(false);
    setSearchedSavedMovies(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    isChecked ? handleCheckboxOn(searchedSavedMovies) :setSearchedSavedMovies(savedMovies);
  }, [isChecked]);

  function handleCheck() {
    setIsChecked(!isChecked);
  }

  function handleCheckboxOn(foundMovies) {
    const shortMovies = foundMovies.filter(data => {
      return data.duration <= ShortMovieDuration
    });

    if (foundMovies.length) {
      setSearchedSavedMovies(shortMovies);
    } else {
      setError('Ничего не найдено');
      setSearchedSavedMovies([]);
    }
  }

  function handleCheckboxOff(foundMovies) {
    if (foundMovies.length) {
      setSearchedSavedMovies(foundMovies);
    } else {
      setSearchedSavedMovies([]);
      setError('Ничего не найдено');
    }
  }
  
  function handleSearchMovies(inputValueSearch) {
    const foundMovies = savedMovies.filter(data => {
      return data.nameRU.toLowerCase().includes(inputValueSearch.toLowerCase());
    });
 
    if (isChecked) {
      handleCheckboxOn(foundMovies);
    } else {
      handleCheckboxOff(foundMovies);
    }
  }

  return (
    <main className="movies">
      <SearchForm 
        onSearchMovies={ handleSearchMovies }
        onCheckbox={ handleCheck }
        isChecked={ isChecked }
      />
      { searchedSavedMovies.length 
      ? (
          <MoviesCardList 
            savedMovies={ searchedSavedMovies }
            onSaveMovies={ onSaveMovies } 
            onMovieDelete={ onMovieDelete } 
          />
        ) : (
          <div className="movies__error__container">
            <h3 className="movies__error__text">{ error }</h3>
          </div>
        )
      }
    </main>
  );
}

export default SavedMovies;
