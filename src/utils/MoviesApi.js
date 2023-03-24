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
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: { authorization: this._headers.authorization },
    })
      .then(res => this._getResponseData(res));
  }}
  
export const api = new Api({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
});
