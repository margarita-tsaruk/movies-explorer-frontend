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
  
  saveMovies() {
    return fetch(`${this.url}/movies`, {
      method: 'GET',
      headers: this.headers,
      
    })
    .then(this._getServerResponse);
  }
  
}

const mainApi = new Api({
  url: 'https://api.movies-explorer.m-ts.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json'
  }
});
  
export default mainApi;