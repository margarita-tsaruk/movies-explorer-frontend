import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard( { movieCard, savedMovies, onSaveMovies, onMovieDelete } ) {
  const { pathname } = useLocation();
 
  const isSaved = savedMovies.some(i => i.movieId === movieCard.id );
  
  const saveButtonClassName = (
    `movie-card__button ${ isSaved ? "movie-card__button_active" : "movie-card__button_inactive" }`
  );
  
  function handleMovieChangeStatus() {
    onSaveMovies(movieCard) 
  };

  function handleGetMovieDuration(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return `${ hours }ч ${ minutes }м`;
  };

  function handleDeleteMovie() {
    onMovieDelete(movieCard)
  };

  return (
    <li className="movie-card">
      <div className="movie-card__info-container">
        <div className="movie-card__info">
          <h3 className="movie-card__title">{ `${ movieCard.nameRU }` }</h3>
          <p className="movie-card__subtitle">{ handleGetMovieDuration(movieCard.duration) }</p>
        </div>
        { pathname === "/saved-movies"
          ? (
            <button
              type="button"
              className="movie-card__button movie-card__button_delete"
              onClick= { handleDeleteMovie }
             />
          ) : (
            <button
              type="button"
              className={ saveButtonClassName }
              onClick= { handleMovieChangeStatus }
            /> 
          )
        }
      </div>
      <a className="movie-card__link" href={ movieCard.trailerLink } target="_blank" rel="noreferrer">
        <img
          className="movie-card__image"
          src={ pathname === "/saved-movies"
            ?  movieCard.image
            : `https://api.nomoreparties.co${ movieCard.image.url }` 
          }
          alt={ movieCard.nameRU }
        />
      </a>
    </li>
  )
}

export default MoviesCard;
