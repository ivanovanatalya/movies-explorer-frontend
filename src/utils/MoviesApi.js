class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getMoviesList() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}`, {
      method: 'GET',
    })
      .then(res => this._getResponseData(res));
  }
}

export const moviesApi = new Api({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
});
