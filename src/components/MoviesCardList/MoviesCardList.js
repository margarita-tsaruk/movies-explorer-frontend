import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList( { filteredMovies, onSaveMovies, savedMovies, onMovieDelete } ) {
  const [ addedMovies, setAddedMovies ] = useState([]);
  const [ isButtonMoreOn, setIsButtonMoreOn ] = useState(false);
  const [ countMovies, setCountMovies ] = useState(0);
  const [ renderedMovies, setRenderedMovies ] = useState(0);
  const [ windowWidth, setWindowWidth ] = useState('');
 
  const { pathname } = useLocation();
  
  const cardsElements = addedMovies.map((card) => (
    <MoviesCard 
      key={ card.id || card._id}  
      movieCard={ card } 
      savedMovies={ savedMovies } 
      onSaveMovies={ onSaveMovies }
      onMovieDelete={ onMovieDelete }
    />
  ));

  function handleResizeMovies() {
    if (windowWidth >= 1200) {
      setRenderedMovies(12)
      setCountMovies(3);
    } else if (windowWidth < 900 && windowWidth >= 720) {
      setRenderedMovies(8)
      setCountMovies(2);
    } else if (windowWidth < 719 && windowWidth >= 280) {
      setRenderedMovies(5)
      setCountMovies(1);
    }
  } 

  function handleClickMoreMovies() {
    setAddedMovies(filteredMovies.slice(0, addedMovies.length + countMovies))
    
    if (addedMovies.length >= filteredMovies.length) {
      setIsButtonMoreOn(false);
    }
  }

  function handleGetWindowWidth() {
    const width = window.innerWidth;
    return setWindowWidth(width);
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      setTimeout(handleGetWindowWidth, 2000);
    });

    return () => {
      window.removeEventListener('resize', handleGetWindowWidth);
    };
  }, []);

  useEffect(() => {
    handleGetWindowWidth();
    handleResizeMovies();
  }, [ windowWidth ]);
  
  useEffect(() => {
    if (pathname === '/movies') {
      setAddedMovies(filteredMovies.slice(0, renderedMovies));
      
      if (filteredMovies.length <= renderedMovies) {
        setIsButtonMoreOn(false);
      } else {
        setIsButtonMoreOn(true);
      }
    }
  }, [filteredMovies, renderedMovies]);

  useEffect(() => {
    if (pathname === '/saved-movies') {
      setAddedMovies(savedMovies);
    //  console.log(savedMovies)
      setIsButtonMoreOn(false);
    }
  }, [savedMovies]);
 
  return (
    <section className="movies-cards">
      <ul className="movies-cards__container">
        { cardsElements }
      </ul>
      <div className="movies-cards__containter__button">
        <button className={ isButtonMoreOn ? "movies-cards__button" : "movies-cards__button_not-visible" } type="button" onClick={ handleClickMoreMovies }>
          Ещё
        </button>
      </div>
    </section>
  )
}

export default MoviesCardList;
