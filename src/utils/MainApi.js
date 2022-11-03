class MainApi {
  constructor({url, headers}) {
    this.url = url;
    this.headers = headers;
  }
  
  _getServerResponse(res) {
    if(res.ok) { 
      return res.json(); 
    } else { 
      return Promise.reject(`Ошибка: ${res.status}`); 
    } 
  } 
  
  getSavedMovies() {
    return fetch(`${this.url}/movies`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    })
    .then(this._getServerResponse);
  }

  changeMovieStatus(movie, isSaved, movieId) {
    if(!isSaved) {
      return fetch (`${this.url}/movies`, {
        method: 'POST',
        headers: this.headers,
        //credentials: 'include',
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          movieId: movie.id,
          image: `https://api.nomoreparties.co${movie.image.url}`,
          trailerLink: movie.trailerLink,
          thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
          description: movie.description,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        }),
      })
      .then((res) => {
        return this._getServerResponse(res)
      })
    } else {
      return fetch (`${this.url}/movies/${movieId}`, {
        method: 'DELETE',
        headers: this.headers,
        //credentials: 'include',
      })
      .then((res) => {
        return this._getServerResponse(res)
      })
     }
  }
  
}

const mainApi = new MainApi({
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});
  
export default mainApi;