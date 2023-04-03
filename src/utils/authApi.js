class AuthApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  signUp(name, email, password) {
    return fetch(`${this._url}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
      })
    })
      .then(res => this._getResponseData(res))
      .then(data => {
        localStorage.setItem('token', data.token);
        return data;
      })
  }

  signIn(email, password) {
    return fetch(`${this._url}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
      .then(res => this._getResponseData(res))
      .then(data => {
        localStorage.setItem('token', data.token);
        return data;
      })
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => this._getResponseData(res))
  }
}

export const authApi = new AuthApi({
  // baseUrl: 'https://api.diploma.ivanovann.nomoredomains.work',
  baseUrl: 'http://localhost:3001',
});
