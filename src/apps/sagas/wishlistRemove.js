import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {removeWishlistData} from '../api/wishlist';
import {
  WISHLIST_REMOVE,
  WISHLIST_REMOVE_COMPLETED,
  WISHLIST_REMOVE_ERROR,
  WISHLIST_REMOVE_REQUEST,
} from '../api/actions';

export function* removeWishlistAsync(action) {
  yield put({type: WISHLIST_REMOVE_REQUEST});

  const response = yield call(removeWishlistData, action.payload);

  if (response && response.errors) {
    yield put({type: WISHLIST_REMOVE_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: WISHLIST_REMOVE_COMPLETED, response});
  }
}

export function* removeWishlist() {
  yield takeEvery(WISHLIST_REMOVE, removeWishlistAsync);
}
