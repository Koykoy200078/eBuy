import {put, call, takeEvery} from 'redux-saga/effects';
import {showError, showSuccess} from '../others/helperFunctions';
import {
  USER_LOGOUT,
  USER_LOGOUT_COMPLETED,
  USER_LOGOUT_ERROR,
  USER_LOGOUT_REQUEST,
} from '../api/actions';
import {userLogout} from '../api/auth';

export function* logoutUserAsync(action) {
  yield put({type: USER_LOGOUT_REQUEST});

  const response = yield call(userLogout, action.payload);

  if (response !== undefined && response.errors) {
    yield put({type: USER_LOGOUT_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: USER_LOGOUT_COMPLETED, response});
    showSuccess({
      message: 'Logout successful',
      description: 'You have been logged out successfully',
    });
  }
}

export function* logoutUser() {
  yield takeEvery(USER_LOGOUT, logoutUserAsync);
}
