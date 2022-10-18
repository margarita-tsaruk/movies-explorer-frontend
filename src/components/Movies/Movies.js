import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies( { movieCards } ) {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList movieCards={movieCards} />
    </div>
  );
}

export default Movies;