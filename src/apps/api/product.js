import {select} from 'redux-saga/effects';
import {BASE_URI} from '../configs/url';

export function* getProduct() {
  const auth = yield select(state => state.authLogin.userData.access_token);
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  };

  const response = yield fetch(BASE_URI + '/products/index', options);
  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}

export function* getProductDetails(payload) {
  const {category_slug, product_slug} = payload;
  const url = BASE_URI + '/products/' + category_slug + '/' + product_slug;

  const auth = yield select(state => state.authLogin.userData.access_token);
  const options = {
    method: 'GET',
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

export function* getMyProduct() {
  const auth = yield select(state => state.authLogin.userData.access_token);
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  };

  const response = yield fetch(BASE_URI + '/myProducts', options);
  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}
