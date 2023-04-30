import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';

import {
  CATEGORY_DETAILS_DATA,
  CATEGORY_DETAILS_DATA_COMPLETED,
  CATEGORY_DETAILS_DATA_ERROR,
  CATEGORY_DETAILS_DATA_REQUEST,
} from '../api/actions';

import {getData} from '../api/category';

export function* categoryDataAsync(action) {
  yield put({type: CATEGORY_DETAILS_DATA_REQUEST});

  const response = yield call(getData, action.payload);

  if (response !== undefined && response.errors) {
    yield put({type: CATEGORY_DETAILS_DATA_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: CATEGORY_DETAILS_DATA_COMPLETED, response});
  }
}

export function* categoryData() {
  yield takeEvery(CATEGORY_DETAILS_DATA, categoryDataAsync);
}
