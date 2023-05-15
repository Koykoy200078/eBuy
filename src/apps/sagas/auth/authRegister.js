import {put, call, takeEvery} from 'redux-saga/effects';
import {showError, showSuccess} from '../../others/helperFunctions';
import {createAccount} from '../../api/auth';
import {
  USER_REGISTER,
  USER_REGISTER_COMPLETED,
  USER_REGISTER_ERROR,
  USER_REGISTER_REQUEST,
} from '../../api/actions';

export function* createUserAccountAsync(action) {
  yield put({type: USER_REGISTER_REQUEST});

  const response = yield call(createAccount, action.payload);

  if (response !== undefined && response.errors) {
    yield put({type: USER_REGISTER_ERROR, response});
    showError({
      message: 'Something went wrong!',
      description: 'Please check your credentials',
    });
  } else {
    yield put({type: USER_REGISTER_COMPLETED, response});
    showSuccess({
      message: response.message,
    });
  }
}

export function* createUserAccount() {
  yield takeEvery(USER_REGISTER, createUserAccountAsync);
}
