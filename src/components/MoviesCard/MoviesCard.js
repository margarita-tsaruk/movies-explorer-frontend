import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import './MoviesCard.css';

function MoviesCard( { movieCard, savedMovies, saveMovies } ) {
  const [ isSaved, setIsSaved ] = useState(false);
  const { pathname } = useLocation();

  function getDuration(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return `${ hours }ч ${ minutes }м`;
  };

  function handleDeleteSavedMovies() {
    setIsSaved(!isSaved);
    console.log('yes') ///УБРАТЬ ПОЗЖЕ
  }

  function handleMovieSave(movie) {
    console.log(movieCard)
    setIsSaved(!isSaved);
    const isMovieSaved = savedMovies.some(i => i.movieId === movieCard.id);
    mainApi.changeMovieStatus(movieCard._id, isMovieSaved) 
      .then((newMovie) => {
        if(newMovie) {
          saveMovies();
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('Wrong')
      })
  }
  
  return (
    <li className="movie-card">
      <div className="movie-card__info-container">
        <div className="movie-card__info">
          <h3 className="movie-card__title">{ `${ movieCard.nameRU }` }</h3>
          <p className="movie-card__subtitle">{ getDuration(movieCard.duration) }</p>
        </div>
        { pathname === "/saved-movies"
          ? (
            <button
              type="button"
              className="movie-card__button movie-card__button_delete"
              onClick={ handleDeleteSavedMovies }
             />
          ) : (
            <button
              type="button"
              className={ isSaved
                ? "movie-card__button movie-card__button_active"
                : "movie-card__button movie-card__button_inactive"
              }
              onClick={ handleMovieSave }
            /> 
          )
        }
      </div>
      <a className="movie-card__link" href={ movieCard.trailerLink } target="_blank" rel="noreferrer">
        <img
          className="movie-card__image"
            src={ `https://api.nomoreparties.co${ movieCard.image.url }` }
            alt={ movieCard.nameRU }
        />
      </a>
    </li>
  )
}

export default MoviesCard;
