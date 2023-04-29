import {put, call, takeEvery} from 'redux-saga/effects';
import {showError, showSuccess} from '../../others/helperFunctions';

import {
  USER_LOGIN,
  USER_LOGIN_COMPLETED,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
} from '../../api/actions';

import {userLogin} from '../../api/auth';

export function* loginUserAsync(action) {
  yield put({type: USER_LOGIN_REQUEST});

  const response = yield call(userLogin, action.payload);

  if (response !== undefined && response.errors) {
    yield put({type: USER_LOGIN_ERROR, response});
    showError({
      message: 'Something went wrong!',
      description: 'Please check your credentials',
    });
  } else {
    yield put({type: USER_LOGIN_COMPLETED, response});
    showSuccess({
      message: response.message,
      description: `Welcome ${response.user.name}`,
    });
  }
}

export function* loginUser() {
  yield takeEvery(USER_LOGIN, loginUserAsync);
}
