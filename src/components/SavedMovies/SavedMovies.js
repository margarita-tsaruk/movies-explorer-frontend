import { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';


function SavedMovies( ) {
  const [ savedMovies, setSavedMovies ] = useState([]);
  const [ searchedSavedMovies, setSearchedSavedMovies ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState('');
  const [ isChecked, setIsChecked ] = useState(false);



  function handleCheck() {
    setIsChecked(!isChecked);
  }

  function handleCheckboxOn(foundMovies) {
    const shortMovies = foundMovies.filter(data => {
      return data.duration <= 40
    });
   
    if(foundMovies[0].duration < 40) {
      setSearchedSavedMovies(shortMovies);
    } else {
      setError('Ничего не найдено');
      setSearchedSavedMovies([]);
    }
  }

  function handleCheckboxOff(foundMovies) {
    if(foundMovies[0].duration > 40) {
      setSearchedSavedMovies(foundMovies);
    } else {
      setError('Ничего не найдено');
      setSearchedSavedMovies([]);
    }
  }

  function handleSearchMovies(inputValueSearch, isChecked) {
    setIsLoading(true);
    
    const foundMovies = searchedSavedMovies.filter(data => {
      return data.nameRU.toLowerCase().includes(inputValueSearch.toLowerCase());
    });

    if(!isChecked) {
      handleCheckboxOn(foundMovies);
    } else {
      handleCheckboxOff(foundMovies);
    }
     
    setIsLoading(false);
  }

  useEffect(() => {
    isChecked ? handleCheckboxOn(searchedSavedMovies) : setSearchedSavedMovies(savedMovies);
  }, [isChecked]);

  return (
    <main className="movies">
      <SearchForm 
        onSearchMovies={ handleSearchMovies }
        onCheckbox={ handleCheck }
        isChecked={ isChecked }
      />
      { searchedSavedMovies ? (
        isLoading 
        ? ( 
          <Preloader />
        ) : (
          <MoviesCardList movieCards={ searchedSavedMovies }  />
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

export default SavedMovies;