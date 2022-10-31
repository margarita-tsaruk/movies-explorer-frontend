import { useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'

function Movies( { movieCards } ) {
  const [ isLoading, setIsLoading ] = useState(false);
  
  return (
    <main className="movies">
      <SearchForm />
      { isLoading 
      ?  <Preloader />
      : <MoviesCardList movieCards={ movieCards } />
      }
    </main>
  );
}

export default Movies;