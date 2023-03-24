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

  setUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
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

  // addCard({ name, link }) {
  //   return fetch(`${this._url}/cards`, {
  //     method: 'POST',
  //     headers: this._headers,
  //     body: JSON.stringify({ name, link })
  //   })
  //     .then(res => this._getResponseData(res));
  // }

  // deleteCard(cardID) {
  //   return fetch(`${this._url}/cards/${cardID}`, {
  //     method: 'DELETE',
  //     headers: { authorization: this._headers.authorization },
  //   })
  //     .then(res => this._getResponseData(res));
  // }

  _setSavedMovie(cardID) {
    return fetch(`${this._url}/movies`, {
      method: 'PUT',
      headers: { authorization: this._headers.authorization },
    })
      .then(res => this._getResponseData(res));
  }

  _deleteSavedMovie(cardID) {
    return fetch(`${this._url}/movies`, {
      method: 'DELETE',
      headers: { authorization: this._headers.authorization },
    })
      .then(res => this._getResponseData(res));
  }

  changeSavedMovieStatus(cardID, isLiked) {
    return isLiked ? this._deleteCardLike(cardID) : this._setCardLike(cardID);
  }

  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }
}

export const api = new Api({
  baseUrl: 'https://api.diploma.ivanovann.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  }
});
