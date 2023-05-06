import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {fetchItemCount} from '../api/user';
import {
  USER_ITEM_COUNT,
  USER_ITEM_COUNT_COMPLETED,
  USER_ITEM_COUNT_ERROR,
  USER_ITEM_COUNT_REQUEST,
} from '../api/actions';

export function* userItemCountDataAsync(action) {
  yield put({type: USER_ITEM_COUNT_REQUEST});

  const response = yield call(fetchItemCount, action.payload);

  if (response && response.errors) {
    yield put({type: USER_ITEM_COUNT_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: USER_ITEM_COUNT_COMPLETED, response});
  }
}

export function* userItemCountData() {
  yield takeEvery(USER_ITEM_COUNT, userItemCountDataAsync);
}
