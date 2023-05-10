import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {fetchUser, fetchUser2} from '../api/user';
import {
  USER_DATA,
  USER_DATA2,
  USER_DATA2_COMPLETED,
  USER_DATA2_ERROR,
  USER_DATA2_REQUEST,
  USER_DATA_COMPLETED,
  USER_DATA_ERROR,
  USER_DATA_REQUEST,
} from '../api/actions';

export function* userDataAsync(action) {
  yield put({type: USER_DATA_REQUEST});

  const response = yield call(fetchUser, action.payload);

  if (response && response.errors) {
    yield put({type: USER_DATA_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: USER_DATA_COMPLETED, response});
  }
}

export function* userData() {
  yield takeEvery(USER_DATA, userDataAsync);
}

export function* userData2Async(action) {
  yield put({type: USER_DATA2_REQUEST});

  const response = yield call(fetchUser2, action.payload);

  if (response && response.errors) {
    yield put({type: USER_DATA2_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: USER_DATA2_COMPLETED, response});
  }
}

export function* userData2() {
  yield takeEvery(USER_DATA2, userData2Async);
}
