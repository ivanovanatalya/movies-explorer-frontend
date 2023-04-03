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

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: { authorization: this._headers.authorization },
    })
      .then(res => this._getResponseData(res));
  }

  setUserInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email })
    })
      .then(res => this._getResponseData(res));
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: { authorization: this._headers.authorization },
    })
      .then(res => this._getResponseData(res));
  }

  setSavedMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(movie),
    })
      .then(res => this._getResponseData(res));
  }

  deleteSavedMovie(movieID) {
    return fetch(`${this._url}/movies/${movieID}`, {
      method: 'DELETE',
      headers: { authorization: this._headers.authorization },
    })
      .then(res => this._getResponseData(res));
  }

  changeSavedMovieStatus(movieID, isSaved) {
    return isSaved ? this._deleteSavedMovie(movieID) : this._setSavedMovie(movieID);
  }

  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }
}

export const api = new Api({
  // baseUrl: 'https://api.diploma.ivanovann.nomoredomains.work',
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});
