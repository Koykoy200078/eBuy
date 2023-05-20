import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {checkOut} from '../api/checkout';
import {
  CHECKOUT,
  CHECKOUT_COMPLETED,
  CHECKOUT_ERROR,
  CHECKOUT_REQUEST,
} from '../api/actions';

export function* checkoutItemAsync(action) {
  yield put({type: CHECKOUT_REQUEST});

  const response = yield call(checkOut, action.payload);

  if (response && response.errors) {
    yield put({type: CHECKOUT_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: CHECKOUT_COMPLETED, response});
  }
}

export function* checkoutItem() {
  yield takeEvery(CHECKOUT, checkoutItemAsync);
}
