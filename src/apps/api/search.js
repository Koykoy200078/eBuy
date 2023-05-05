import {select} from 'redux-saga/effects';
import {BASE_URI} from '../configs/url';

// search
export function* searchPData(payload) {
  const {search} = payload;

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
    BASE_URI + '/search' + '?search=' + search,
    options,
  );
  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}
