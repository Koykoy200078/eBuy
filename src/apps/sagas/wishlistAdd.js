import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {getWishlistData} from '../api/wishlist';
import {
  WISHLIST_ADD,
  WISHLIST_ADD_COMPLETED,
  WISHLIST_ADD_ERROR,
  WISHLIST_ADD_REQUEST,
} from '../api/actions';

export function* getWishlistAsync(action) {
  yield put({type: WISHLIST_ADD_REQUEST});

  const response = yield call(getWishlistData, action.payload);

  if (response && response.errors) {
    yield put({type: WISHLIST_ADD_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: WISHLIST_ADD_COMPLETED, response});
  }
}

export function* getWishlist() {
  yield takeEvery(WISHLIST_ADD, getWishlistAsync);
}
