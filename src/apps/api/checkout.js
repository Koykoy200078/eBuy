import {select} from 'redux-saga/effects';
import {BASE_URI} from '../configs/url';

export function* checkOut(payload) {
  const {fullname, email, phone, pincode, address, payment_mode, selectedIds} =
    payload;
  const auth = yield select(state => state.authLogin.userData.access_token);
  const selectedIdsArray = Array.isArray(selectedIds)
    ? selectedIds
    : [selectedIds];
  const url =
    BASE_URI +
    '/add-orders' +
    '?fullname=' +
    fullname +
    '&email=' +
    email +
    '&phone=' +
    phone +
    '&pincode=' +
    pincode +
    '&address=' +
    address +
    '&payment_mode=' +
    payment_mode +
    '&selectedIds=[' +
    selectedIdsArray.join(',') +
    ']';

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
