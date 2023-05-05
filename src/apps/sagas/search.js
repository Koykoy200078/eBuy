import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {searchPData} from '../api/search';
import {
  PRODUCT_SEARCH,
  PRODUCT_SEARCH_COMPLETED,
  PRODUCT_SEARCH_ERROR,
  PRODUCT_SEARCH_REQUEST,
} from '../api/actions';

export function* searchDataAsync(action) {
  yield put({type: PRODUCT_SEARCH_REQUEST});

  const response = yield call(searchPData, action.payload);

  if (response && response.errors) {
    yield put({type: PRODUCT_SEARCH_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: PRODUCT_SEARCH_COMPLETED, response});
  }
}

export function* searchData() {
  yield takeEvery(PRODUCT_SEARCH, searchDataAsync);
}
