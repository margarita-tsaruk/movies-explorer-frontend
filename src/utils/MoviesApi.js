class MoviesApi {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }
  
  //Объявление приватного метода: получение ответа от сервера
  _getServerResponse(res) {
    if(res.ok) { 
      return res.json(); 
    } else { 
      return Promise.reject(`Ошибка: ${res.status}`); 
    } 
  } 
  
  //Объявление публичного метода: отправить запрос серверу - загрузить карточки
  getMovies() {
    return fetch (this.url, {
      method: 'GET',
      headers: this.headers,
      //credentials: 'include',
    })
    .then(this._getServerResponse)
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
});
  
export default moviesApi;