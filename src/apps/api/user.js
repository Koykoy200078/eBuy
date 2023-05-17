import {select} from 'redux-saga/effects';
import {BASE_URI} from '../configs/url';

export function* fetchUser() {
  const auth = yield select(state => state.authLogin.userData.access_token);
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  };

  const response = yield fetch(BASE_URI + '/user/info', options);

  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}

export function* fetchUser2() {
  const auth = yield select(state => state.authLogin.userData.access_token);
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  };

  const response = yield fetch(BASE_URI + '/user/details', options);

  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}

export function* fetchItemCount(payload) {
  const auth = yield select(state => state.authLogin.userData.access_token);
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  };

  const response = yield fetch(BASE_URI + '/user/item/count', options);

  const data = yield response.json();

  if (response.ok) {
    return data;
  } else {
    return data;
  }
}

export function* updateUserInfo(payload) {
  const {address, phone, pin_code, username, storename} = payload;
  const url =
    BASE_URI +
    '/user/details/update' +
    '?username=' +
    username +
    '&phone=' +
    phone +
    '&pin_code=' +
    pin_code +
    '&address=' +
    address +
    '&storename=' +
    storename;

  // console.log('url ===> ', url);
  const auth = yield select(state => state.authLogin.userData.access_token);
  const options = {
    method: 'PUT',
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

// change password
export function* changeUserPassword(payload) {
  const {current_password, password} = payload;
  console.log('payload ===> ', payload);

  const auth = yield select(state => state.authLogin.userData.access_token);
  const url =
    BASE_URI +
    '/change-password' +
    '?current_password=' +
    current_password +
    '&password=' +
    password;

  const options = {
    method: 'PUT',
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
