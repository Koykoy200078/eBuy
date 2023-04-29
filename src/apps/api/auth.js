import {BASE_URI} from '../configs/url';

export function* userLogin(payload) {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...payload}),
  };

  const response = yield fetch(BASE_URI + '/auth/login', options);
  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}

export function* createAccount(payload) {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...payload}),
  };

  const response = yield fetch(BASE_URI + '/auth/register', options);
  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}

export function* userLogout(payload) {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...payload}),
  };

  const response = yield fetch(BASE_URI + '/logout', options);
  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}
