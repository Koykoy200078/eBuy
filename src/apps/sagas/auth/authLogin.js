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

  try {
    const response = yield call(userLogin, action.payload);

    if (
      response &&
      response.errors?.email ===
        'Please verify your email first, we have sent you a verification email'
    ) {
      yield put({type: USER_LOGIN_ERROR, response});
    } else {
      yield put({type: USER_LOGIN_COMPLETED, response});
      showSuccess({
        message: response.message,
      });
    }
  } catch (error) {
    showError({
      message: 'Something went wrong!',
      description: 'Please check your credentials',
    });
    yield put({type: USER_LOGIN_ERROR, error});
  }
}

export function* loginUser() {
  yield takeEvery(USER_LOGIN, loginUserAsync);
}
