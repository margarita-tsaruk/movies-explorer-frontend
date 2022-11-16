import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import { AmountOfMoviesToRender_Big,
         AmountOfMoviesToRender_Medium,
         AmountOfMoviesToRender_Mid,
         AmountOfMoviesToRender_Small,
         NumberOfMoviesToAdd_Big,
         NumberOfMoviesToAdd_Medium,
         NumberOfMoviesToAdd_Small,
         ScreenDimensions_Large,
         ScreenDimensions_Big,
         ScreenDimensions_Medium,
         ScreenDimensions_Small
 } from '../../utils/config'

function MoviesCardList( { filteredMovies, onSaveMovies, savedMovies, onMovieDelete } ) {
  const { pathname } = useLocation();
  const [ addedMovies, setAddedMovies ] = useState([]);
  const [ isButtonMoreOn, setIsButtonMoreOn ] = useState(false);
  const [ countMovies, setCountMovies ] = useState(0);
  const [ renderedMovies, setRenderedMovies ] = useState(1);
  const [ windowWidth, setWindowWidth ] = useState('');
 
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
    if (windowWidth >= ScreenDimensions_Large) {
      setRenderedMovies(AmountOfMoviesToRender_Big)
      setCountMovies(NumberOfMoviesToAdd_Big);
    } else if (windowWidth < ScreenDimensions_Large && windowWidth >= ScreenDimensions_Big) {
      setRenderedMovies(AmountOfMoviesToRender_Medium)
      setCountMovies(NumberOfMoviesToAdd_Medium);
    } else if (windowWidth < ScreenDimensions_Big && windowWidth >= ScreenDimensions_Medium) {
      setRenderedMovies(AmountOfMoviesToRender_Mid)
      setCountMovies(NumberOfMoviesToAdd_Small);
    } else if (windowWidth < ScreenDimensions_Medium && windowWidth >= ScreenDimensions_Small) {
      setRenderedMovies(AmountOfMoviesToRender_Small)
      setCountMovies(NumberOfMoviesToAdd_Small);
    }
  } 

  function handleClickMoreMovies() {
    setAddedMovies(filteredMovies.slice(0, addedMovies.length + countMovies))
    if (addedMovies.length >= filteredMovies.length - countMovies) {
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
      setIsButtonMoreOn(false);
    }
  }, [savedMovies]);
 
  return (
    <section className="movies-cards">
      { cardsElements.length 
        ? ( <ul className="movies-cards__container">
            { cardsElements }
          </ul> ) 
        : ( <div className="movies__error__container">
              <h3 className="movies__error__text">Введите название фильма в поиск</h3>
          </div> )
      }
      <div className="movies-cards__containter__button">
        <button className={ isButtonMoreOn ? "movies-cards__button" : "movies-cards__button_not-visible" } type="button" onClick={ handleClickMoreMovies }>
          Ещё
        </button>
      </div>
    </section>
  )
}

export default MoviesCardList;
