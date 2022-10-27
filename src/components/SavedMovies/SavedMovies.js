import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies( { movieCards } ) {

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movieCards={ movieCards } />
    </main>
  );
}

export default Movies;