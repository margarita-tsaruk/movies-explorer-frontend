import { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies( { savedMovies, onSaveMovies }) {
  const [ searchedSavedMovies, setSearchedSavedMovies ] = useState([]);
  const [ error, setError ] = useState('');
  const [ isChecked, setIsChecked ] = useState(false);

  useEffect(() => {
    isChecked ? handleCheckboxOn(searchedSavedMovies) : setSearchedSavedMovies(savedMovies);
  }, [isChecked]);

  useEffect(() => {
    setSearchedSavedMovies(savedMovies);
  }, [savedMovies]);

  function handleCheck() {
    setIsChecked(!isChecked);
  }

  function handleCheckboxOn(foundMovies, isChecked) {
    const shortMovies = foundMovies.filter(data => {
      return data.duration <= 40
    });

    if (foundMovies.length) {
      setSearchedSavedMovies(shortMovies);
      localStorage.setItem('checkbox', isChecked);
    } else {
      setError('Ничего не найдено');
      setSearchedSavedMovies(null);
    }
  }

  function handleCheckboxOff(foundMovies, isChecked) {
    if (foundMovies.length) {
      setSearchedSavedMovies(foundMovies);
      localStorage.setItem('checkbox', isChecked);
    } else {
      setError('Ничего не найдено');
      setSearchedSavedMovies(null);
    }
  }

  function handleSearchMovies(inputValueSearch, isChecked) {
    const foundMovies = searchedSavedMovies.filter(data => {
      return data.nameRU.toLowerCase().includes(inputValueSearch.toLowerCase());
    });

    if(!isChecked) {
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
      { searchedSavedMovies 
      ? (
            <MoviesCardList 
            savedMovies={ searchedSavedMovies }
            onSaveMovies={ onSaveMovies }  />
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