import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {
  ADD_TO_CART,
  ADD_TO_CART_COMPLETED,
  ADD_TO_CART_ERROR,
  ADD_TO_CART_REQUEST,
} from '../api/actions';
import {getCartAddItems} from '../api/cart';

export function* cartAddAsync(action) {
  yield put({type: ADD_TO_CART_REQUEST});

  const response = yield call(getCartAddItems, action.payload);

  if (response && response.errors) {
    yield put({type: ADD_TO_CART_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: ADD_TO_CART_COMPLETED, response});
  }
}

export function* cartAdd() {
  yield takeEvery(ADD_TO_CART, cartAddAsync);
}
