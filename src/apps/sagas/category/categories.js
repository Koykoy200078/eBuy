import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../../others/helperFunctions';
import {
  CATEGORY_DATA,
  CATEGORY_DATA_COMPLETED,
  CATEGORY_DATA_ERROR,
  CATEGORY_DATA_REQUEST,
} from '../../api/actions';

import {getCategories} from '../../api/category';

export function* categoryAsync(action) {
  yield put({type: CATEGORY_DATA_REQUEST});

  const response = yield call(getCategories, action.payload);

  if (response !== undefined && response.errors) {
    yield put({type: CATEGORY_DATA_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: CATEGORY_DATA_COMPLETED, response});
  }
}

export function* category() {
  yield takeEvery(CATEGORY_DATA, categoryAsync);
}
