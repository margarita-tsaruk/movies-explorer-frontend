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
  getUserData() {
    return Promise.all([this.getToken(), this.getSavedMovies()]);
  }

  getToken() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    })
    .then(this._getServerResponse);
  }

  authorize(userData) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        password: userData.password,
        email: userData.email
      })
    })
    .then(this._getServerResponse);
  }

  register(userData) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: userData.name,
        password: userData.password,
        email: userData.email
      })
    })
    .then(this._getServerResponse)
  }
  
  getSavedMovies() {
    return fetch(`${this.url}/movies`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    })
    .then(this._getServerResponse);
  }

  changeMovieStatus(movie, id, isSaved) {
    if (!isSaved) {
      return fetch (`${this.url}/movies`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `https://api.nomoreparties.co${ movie.image.url }`,
          trailerLink: movie.trailerLink,
          thumbnail: `https://api.nomoreparties.co${ movie.image.url }`,
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        }),
      })
      .then((res) => {
        return this._getServerResponse(res)
      })
    } else {
      return fetch (`${this.url}/movies/${id}`, {
        method: 'DELETE',
        headers: this.headers,
        credentials: 'include',
      })
      .then((res) => {
        return this._getServerResponse(res)
      })
    }
  }
  
  signOut() {
    return fetch(`${this.url}/signout`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    })
    .then(this._getServerResponse)
  }
}

const mainApi = new MainApi({
  url: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  }
});
  
export default mainApi;