import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList( { movieCards } ) {
  const [ addedMovies, setAddedMovies ] = useState([]);
  const [ isButtonMoreOn, setIsButtonMoreOn ] = useState(false);
  const [ countedMovies, setCountedMovies ] = useState(1);
  const [ windowWidth, setWindowWidth ] = useState('');
  
  
  const cardsElements = addedMovies.map((card) => (
    <MoviesCard key={card.id}  movieCard={card} />
  ));

  useEffect(() => {
    console.log('works')
    setAddedMovies(movieCards.slice(0, movieCards.length + countedMovies))
    setIsButtonMoreOn(true);
  }, [countedMovies, movieCards])

  console.log(addedMovies);

  console.log(movieCards);

 

  function handleRenderMovies() {
    if(windowWidth >= 1200) {
      setAddedMovies(12)
      setCountedMovies(4);
    } else if (windowWidth < 1200 && windowWidth >= 1024) {
      setAddedMovies(9)
      setCountedMovies(3);
    } else if (windowWidth < 900 && windowWidth >= 720) {
      setAddedMovies(8)
      setCountedMovies(2);
    } else if (windowWidth < 719 && windowWidth >= 280) {
      setAddedMovies(5)
      setCountedMovies(1);
    }
  } 
  
  useEffect(() => {
    handleRenderMovies();
  }, [windowWidth]);
  
  return (
    <section className="movies-cards">
      <ul className="movies-cards__container">
        { cardsElements }
      </ul>
      <div className="movies-cards__containter__button">
        <button className={ isButtonMoreOn ? "movies-cards__button" : "movies-cards__button_not-visible" } type="button" >
          Ещё
        </button>
      </div>
    </section>
  )
}

export default MoviesCardList;
