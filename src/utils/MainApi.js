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

  getUserInfo() {
    return fetch (`${this.url}/users/me`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    })
    .then(this._getServerResponse)
  }

  updateUserInfo(name, email) {
    return fetch (`${this.url}/users/me`, {
      headers: this.headers,
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify ({
        name: name,
        email: email,
      })
    })
    .then((res) => {
      return this._getServerResponse(res)
    })
  }
  
  getSavedMovies() {
    return fetch(`${this.url}/movies`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    })
    .then(this._getServerResponse);
  }

  getData() {
    return Promise.all([this.getUserInfo(), this.getSavedMovies()])
  }

  changeMovieStatus(movie, isSaved) {
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
      const movieId = movie.id
      return fetch (`${this.url}/movies/${ movieId }`, {
        method: 'DELETE',
        headers: this.headers,
        credentials: 'include',
      })
      .then((res) => {
        return this._getServerResponse(res)
      })
    }
  }

  deleteSavedMovie(movie) {
    const movieId = movie.movieId
    return fetch (`${this.url}/movies/${ movieId }`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    })
    .then((res) => {
      return this._getServerResponse(res)
    })
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