import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {
  WISHLIST_ITEMS_SHOW,
  WISHLIST_ITEMS_SHOW_COMPLETED,
  WISHLIST_ITEMS_SHOW_ERROR,
  WISHLIST_ITEMS_SHOW_REQUEST,
} from '../api/actions';
import {fetchWishlistItemData} from '../api/wishlist';

export function* wishlistDataAsync(action) {
  yield put({type: WISHLIST_ITEMS_SHOW_REQUEST});

  const response = yield call(fetchWishlistItemData, action.payload);

  if (response && response.errors) {
    yield put({type: WISHLIST_ITEMS_SHOW_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: WISHLIST_ITEMS_SHOW_COMPLETED, response});
  }
}

export function* wishlistData() {
  yield takeEvery(WISHLIST_ITEMS_SHOW, wishlistDataAsync);
}
