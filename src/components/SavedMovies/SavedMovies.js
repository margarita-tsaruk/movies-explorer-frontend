import { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import mainApi from '../../utils/MoviesApi';

function SavedMovies( { movieCards } ) {
  const [ savedMovies, setSavedMovies ] = useState([]);

  function handleSaveMovies() {
    mainApi.saveMovies()
    .then((savedMovies) => {
      setSavedMovies(savedMovies);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movieCards={ movieCards }/>
    </main>
  );
}

export default SavedMovies;