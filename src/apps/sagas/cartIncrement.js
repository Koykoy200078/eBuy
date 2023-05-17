import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {incrementItem} from '../api/cart';
import {
  CART_ITEM_INCREMENT,
  CART_ITEM_INCREMENT_COMPLETED,
  CART_ITEM_INCREMENT_ERROR,
  CART_ITEM_INCREMENT_REQUEST,
} from '../api/actions';

export function* cartIncrementAsync(action) {
  yield put({type: CART_ITEM_INCREMENT_REQUEST});

  const response = yield call(incrementItem, action.payload);

  if (response && response.errors) {
    yield put({type: CART_ITEM_INCREMENT_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: CART_ITEM_INCREMENT_COMPLETED, response});
  }
}

export function* cartIncrement() {
  yield takeEvery(CART_ITEM_INCREMENT, cartIncrementAsync);
}
