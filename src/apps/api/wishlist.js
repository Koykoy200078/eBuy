import {select} from 'redux-saga/effects';
import {BASE_URI} from '../configs/url';

export function* fetchWishlistCount() {
  const auth = yield select(state => state.authLogin.userData.access_token);

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  };
  const response = yield fetch(BASE_URI + '/wishlist/count', options);
  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}

export function* fetchWishlistItemData() {
  const auth = yield select(state => state.authLogin.userData.access_token);

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  };
  const response = yield fetch(BASE_URI + '/wishlist', options);
  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}

export function* getWishlistData(payload) {
  const {product_id} = payload;
  const auth = yield select(state => state.authLogin.userData.access_token);

  const url = BASE_URI + '/wishlist/newAdd/' + product_id;

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
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

export function* removeWishlistData(payload) {
  const {product_id} = payload;
  const auth = yield select(state => state.authLogin.userData.access_token);

  const url = BASE_URI + '/wishlist/' + product_id;

  const options = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
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
