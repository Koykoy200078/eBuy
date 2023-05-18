import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {cartRemoveItem, getCartData} from '../api/cart';
import {
  CART_REMOVE,
  CART_REMOVE_COMPLETED,
  CART_REMOVE_ERROR,
  CART_REMOVE_REQUEST,
} from '../api/actions';

export function* cartRemoveItemDataAsync(action) {
  yield put({type: CART_REMOVE_REQUEST});

  const response = yield call(cartRemoveItem, action.payload);

  if (response && response.errors) {
    yield put({type: CART_REMOVE_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: CART_REMOVE_COMPLETED, response});
  }
}

export function* cartRemoveItemData() {
  yield takeEvery(CART_REMOVE, cartRemoveItemDataAsync);
}
