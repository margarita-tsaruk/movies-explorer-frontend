import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.js';

function MoviesCardList( { movieCards } ) {
  const cardsElements = movieCards.map((card) => (
    <MoviesCard key={card.id}  movieCard={card} />
  ));
  
  return (
    <section className="movies-cards">
      <ul className="movies-cards__container">
        { cardsElements }
      </ul>
      <div className="movies-cards__containter__button">
        <button className="movies-cards__button" type="button">
          Ещё
        </button>
      </div>
    </section>
  )
}

export default MoviesCardList;
