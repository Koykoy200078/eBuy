import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {
  PRODUCT_DATA,
  PRODUCT_DATA_COMPLETED,
  PRODUCT_DATA_ERROR,
  PRODUCT_DATA_REQUEST,
} from '../api/actions';

import {getProduct} from '../api/product';

export function* productAsync(action) {
  yield put({type: PRODUCT_DATA_REQUEST});

  const response = yield call(getProduct, action.payload);

  if (response !== undefined && response.errors) {
    yield put({type: PRODUCT_DATA_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: PRODUCT_DATA_COMPLETED, response});
  }
}

export function* product() {
  yield takeEvery(PRODUCT_DATA, productAsync);
}
