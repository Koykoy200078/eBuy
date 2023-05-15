import {select} from 'redux-saga/effects';
import {BASE_URI} from '../configs/url';

export function* fetchCartCount() {
  const auth = yield select(state => state.authLogin.userData.access_token);

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  };
  const response = yield fetch(BASE_URI + '/cart/count', options);
  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}

export function* getCartAddItems(payload) {
  const {product_color_id, product_id} = payload;
  const url =
    BASE_URI +
    '/products/cart/' +
    product_id +
    '?product_color_id=' +
    product_color_id +
    '&quantity_count=1';

  const auth = yield select(state => state.authLogin.userData.access_token);

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

export function* getCartData(payload) {
  const auth = yield select(state => state.authLogin.userData.access_token);

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  };
  const response = yield fetch(BASE_URI + '/cart', options);
  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}
