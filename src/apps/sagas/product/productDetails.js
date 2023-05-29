import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../../others/helperFunctions';
import {
  PRODUCT_DETAILS_DATA,
  PRODUCT_DETAILS_DATA_COMPLETED,
  PRODUCT_DETAILS_DATA_ERROR,
  PRODUCT_DETAILS_DATA_REQUEST,
} from '../../api/actions';

import {getProductDetails} from '../../api/product';

export function* productDetailsAsync(action) {
  yield put({type: PRODUCT_DETAILS_DATA_REQUEST});

  try {
    const response = yield call(getProductDetails, action.payload);

    if (response !== undefined && response.errors) {
      yield put({type: PRODUCT_DETAILS_DATA_ERROR, response});
      showError({
        message: 'Something went wrong!',
      });
    } else {
      yield put({type: PRODUCT_DETAILS_DATA_COMPLETED, response});
    }
  } catch (error) {
    showError({
      message: 'Something went wrong!',
    });
    yield put({type: PRODUCT_DETAILS_DATA_ERROR, response});
  }
}

export function* productDetails() {
  yield takeEvery(PRODUCT_DETAILS_DATA, productDetailsAsync);
}
