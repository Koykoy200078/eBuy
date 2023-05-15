import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {getCartData} from '../api/cart';
import {
  CART_DATA,
  CART_DATA_COMPLETED,
  CART_DATA_ERROR,
  CART_DATA_REQUEST,
} from '../api/actions';

export function* cartDataAsync(action) {
  yield put({type: CART_DATA_REQUEST});

  const response = yield call(getCartData, action.payload);

  if (response && response.errors) {
    yield put({type: CART_DATA_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: CART_DATA_COMPLETED, response});
  }
}

export function* cartData() {
  yield takeEvery(CART_DATA, cartDataAsync);
}
