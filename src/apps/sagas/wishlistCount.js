import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {fetchWishlistCount} from '../api/wishlist';
import {
  WISHLIST_COUNT,
  WISHLIST_COUNT_COMPLETED,
  WISHLIST_COUNT_ERROR,
  WISHLIST_COUNT_REQUEST,
} from '../api/actions';

export function* wishlistCountDataAsync(action) {
  yield put({type: WISHLIST_COUNT_REQUEST});

  const response = yield call(fetchWishlistCount, action.payload);

  if (response && response.errors) {
    yield put({type: WISHLIST_COUNT_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: WISHLIST_COUNT_COMPLETED, response});
  }
}

export function* wishlistCountData() {
  yield takeEvery(WISHLIST_COUNT, wishlistCountDataAsync);
}
