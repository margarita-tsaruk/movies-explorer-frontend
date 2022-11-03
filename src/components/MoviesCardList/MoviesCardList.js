import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList( { movieCards, saveMovies } ) {
  const [ addedMovies, setAddedMovies ] = useState([]);
  const [ isButtonMoreOn, setIsButtonMoreOn ] = useState(false);
  const [ countMovies, setCountMovies ] = useState(0);
  const [ renderedMovies, setRenderedMovies ] = useState(0);
  const [ windowWidth, setWindowWidth ] = useState('');
  const [ savedMovies, setSavedMovies ] = useState([]);
  const { pathname } = useLocation();
  
  const cardsElements = addedMovies.map((card) => (
    <MoviesCard key={ card.id }  movieCard={ card } savedMovies={ savedMovies } saveMovies={ saveMovies }/>
  ));

  function handleResizeMovies() {
    if(windowWidth >= 1200) {
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
    setAddedMovies(movieCards.slice(0, addedMovies.length + countMovies))
    
    if(addedMovies.length >= movieCards.length) {
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
      setAddedMovies(movieCards.slice(0, renderedMovies));
      
      if (movieCards.length <= renderedMovies) {
        setIsButtonMoreOn(false);
      } else {
        setIsButtonMoreOn(true);
      }
    }
  }, [movieCards, renderedMovies]);

  useEffect(() => {
    if (pathname === '/saved-movies') {
      console.log('hey')
      setAddedMovies(savedMovies);
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
