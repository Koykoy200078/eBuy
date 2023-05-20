import {select} from 'redux-saga/effects';
import {BASE_URI} from '../configs/url';

export function* getOrders(payload) {
  const auth = yield select(state => state.authLogin.userData.access_token);

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  };

  const response = yield fetch(BASE_URI + '/orders', options);
  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}
