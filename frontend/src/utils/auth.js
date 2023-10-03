class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status} ${res.statusText}`);
  }

  setRegistration(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then(this._checkRes);
  }

  setAuthorization(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",      
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then(this._checkRes);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
     },
    }).then(this._checkRes);
  }

  signOut() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",      
      credentials: 'include',
      headers: {"Content-Type": "application/json"},
    }).then(this._checkRes);
  }
}

export const auth = new Auth({
  baseUrl: "https://api.mesto-orties.nomoredomainsrocks.ru"
  // baseUrl: "http://localhost:3000",
});
