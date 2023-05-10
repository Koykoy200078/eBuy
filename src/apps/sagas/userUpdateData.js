import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {
  USER_UPDATE_DATA,
  USER_UPDATE_DATA_COMPLETED,
  USER_UPDATE_DATA_ERROR,
  USER_UPDATE_DATA_REQUEST,
} from '../api/actions';
import {updateUserInfo} from '../api/user';

export function* userUpdateDataAsync(action) {
  yield put({type: USER_UPDATE_DATA_REQUEST});

  const response = yield call(updateUserInfo, action.payload);

  if (response && response.errors) {
    yield put({type: USER_UPDATE_DATA_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: USER_UPDATE_DATA_COMPLETED, response});
  }
}

export function* userUpdateData() {
  yield takeEvery(USER_UPDATE_DATA, userUpdateDataAsync);
}
