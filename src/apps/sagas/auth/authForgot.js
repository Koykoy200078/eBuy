import {put, call, takeEvery} from 'redux-saga/effects';
import {forgotPassword} from '../../api/auth';
import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_COMPLETED,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST,
} from '../../api/actions';

export function* forgotUserPasswordAsync(action) {
  yield put({type: FORGOT_PASSWORD_REQUEST});

  const response = yield call(forgotPassword, action.payload);

  if (response !== undefined && response.errors) {
    yield put({type: FORGOT_PASSWORD_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: FORGOT_PASSWORD_COMPLETED, response});
  }
}

export function* forgotUserPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotUserPasswordAsync);
}
