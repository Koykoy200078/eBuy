import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {changeUserPassword} from '../api/user';
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_COMPLETED,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_REQUEST,
} from '../api/actions';

export function* changePasswordAsync(action) {
  yield put({type: CHANGE_PASSWORD_REQUEST});

  const response = yield call(changeUserPassword, action.payload);

  if (response !== undefined && response.errors) {
    yield put({type: CHANGE_PASSWORD_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: CHANGE_PASSWORD_COMPLETED, response});
  }
}

export function* changePassword() {
  yield takeEvery(CHANGE_PASSWORD, changePasswordAsync);
}
