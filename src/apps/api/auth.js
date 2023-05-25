import {BASE_URI} from '../configs/url';

export function* userLogin(payload) {
  try {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...payload}),
    };

    const response = yield fetch(`${BASE_URI}/auth/login`, options);
    const data = yield response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.errors);
    }
  } catch (error) {
    throw new Error('An error occurred during login.');
  }
}

export function* createAccount(payload) {
  const {name, email, password, address, phone, birthdate, gender} = payload;
  const url =
    BASE_URI +
    '/auth/register?name=' +
    name +
    '&email=' +
    email +
    '&password=' +
    password +
    '&address=' +
    address +
    '&phone=' +
    phone +
    '&birthday=' +
    birthdate +
    '&gender=' +
    gender;

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const response = yield fetch(url, options);
  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}

export function* userLogout(payload) {
  try {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...payload}),
    };

    const response = yield fetch(`${BASE_URI}/logout`, options);
    const data = yield response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.errors);
    }
  } catch (error) {
    throw new Error('An error occurred during logout.');
  }
}
