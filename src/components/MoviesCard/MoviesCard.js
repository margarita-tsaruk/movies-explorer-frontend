import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard( { movieCard } ) {
  const [isSaved, setIsSaved] = useState(false);
  const { pathname } = useLocation();

  function getDuration(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  };

  function handleSaveMovies() {
    setIsSaved(!isSaved);
  }
  
  function handleDeleteSavedMovies() {
    setIsSaved(!isSaved);
    console.log('yes')
  }
  
  return (
    <li className="movie-card">
      <div className="movie-card__info-container">
        <h3 className="movie-card__title">{`${movieCard.nameRu}`}</h3>
        <p className="movie-card__subtitle">{getDuration(movieCard.duration)}</p>
        { pathname === "/saved-movies"
          ? (
            <button
              type="button"
              className="movie-card__button movie-card__button_delete"
              onClick={handleDeleteSavedMovies}
             />
          ) : (
            <button
              type="button"
              className={ isSaved
                ? "movie-card__button movie-card__button_active"
                : "movie-card__button movie-card__button_inactive"
              }
              onClick={handleSaveMovies}
            /> 
          )
        }
      </div>
      
      <img
        className="movie-card__image"
          src={`https://avatars.mds.yandex.net/i?id=aabb58069748049fd63c0178429ee9ad-4269827-images-thumbs&n=13`}
          alt={movieCard.nameRu}
      />
    </li>
  )
}

export default MoviesCard;
