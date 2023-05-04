import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {
  CART_COUNT,
  CART_COUNT_COMPLETED,
  CART_COUNT_ERROR,
  CART_COUNT_REQUEST,
} from '../api/actions';
import {fetchCartCount} from '../api/cart';

export function* cartCountDataAsync(action) {
  yield put({type: CART_COUNT_REQUEST});

  const response = yield call(fetchCartCount, action.payload);

  if (response && response.errors) {
    yield put({type: CART_COUNT_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: CART_COUNT_COMPLETED, response});
  }
}

export function* cartCountData() {
  yield takeEvery(CART_COUNT, cartCountDataAsync);
}
