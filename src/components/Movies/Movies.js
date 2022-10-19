import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'

function Movies( { movieCards } ) {
  const [ isLoading, setIsLoading ] = React.useState(false);
  
  return (
    <div className="movies">
      <SearchForm />
      {isLoading 
      ?  <Preloader />
      : <MoviesCardList movieCards={movieCards} />
      }
    </div>
  );
}

export default Movies;