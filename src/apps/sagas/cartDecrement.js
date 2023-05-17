import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {decrementItem} from '../api/cart';
import {
  CART_ITEM_DECREMENT,
  CART_ITEM_DECREMENT_COMPLETED,
  CART_ITEM_DECREMENT_ERROR,
  CART_ITEM_DECREMENT_REQUEST,
} from '../api/actions';

export function* cartDecrementAsync(action) {
  yield put({type: CART_ITEM_DECREMENT_REQUEST});

  const response = yield call(decrementItem, action.payload);

  if (response && response.errors) {
    yield put({type: CART_ITEM_DECREMENT_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: CART_ITEM_DECREMENT_COMPLETED, response});
  }
}

export function* cartDecrement() {
  yield takeEvery(CART_ITEM_DECREMENT, cartDecrementAsync);
}
