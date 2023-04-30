import {select} from 'redux-saga/effects';
import {BASE_URI} from '../configs/url';

export function* getCategories() {
  const auth = yield select(state => state.authLogin.userData.access_token);
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  };

  const response = yield fetch(BASE_URI + '/categories', options);
  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}

export function* getData(payload) {
  const auth = yield select(state => state.authLogin.userData.access_token);

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  };
  const response = yield fetch(
    BASE_URI + '/categories/products/' + payload,
    options,
  );
  const data = yield response.json();
  if (response.ok) {
    return data;
  } else {
    return data;
  }
}
