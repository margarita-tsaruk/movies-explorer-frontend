import { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies( { savedMovies, onSaveMovies, onMovieDelete }) {
  const [ searchedSavedMovies, setSearchedSavedMovies ] = useState([]);
  const [ error, setError ] = useState('');
  const [ isChecked, setIsChecked ] = useState(false);

  useEffect(() => {   
    setSearchedSavedMovies(savedMovies);
  }, [savedMovies]);

  function handleCheck() {
    setIsChecked(!isChecked);
  }

  function handleSearchMovies(inputValueSearch) {
    console.log(savedMovies)
    const foundMovies = savedMovies.filter(data => {
      return data.nameRU.toLowerCase().includes(inputValueSearch.toLowerCase());
    });

    setSearchedSavedMovies(foundMovies)
  }

  function handleFilterShortMovies(savedMovies, isChecked) {
    if (!isChecked) {
      const shortMovies = savedMovies.filter(data => {
        return data.duration <= 40
      });
      if (shortMovies) {
        setSearchedSavedMovies(shortMovies);
        
        console.log('works')
      } else {
        setError('Ничего не найдено');
        setSearchedSavedMovies(null);
      }
    } else {
      const longMovies = savedMovies.filter(data => {
        return data.duration > 40
      });
      if (longMovies) {
        setSearchedSavedMovies(longMovies);
       
      } else {
        setError('Ничего не найдено');
        setSearchedSavedMovies(null);
      };
    }
  }

  useEffect(() => {
    handleFilterShortMovies(savedMovies, isChecked)
  }, [isChecked])

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