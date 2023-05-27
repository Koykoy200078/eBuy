import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../../others/helperFunctions';
import {getProductNewArrival} from '../../api/product';
import {
  PRODUCT_NEWARRIVAL_DATA,
  PRODUCT_NEWARRIVAL_DATA_COMPLETED,
  PRODUCT_NEWARRIVAL_DATA_ERROR,
  PRODUCT_NEWARRIVAL_DATA_REQUEST,
} from '../../api/actions';

export function* productNewArrivalAsync(action) {
  yield put({type: PRODUCT_NEWARRIVAL_DATA_REQUEST});

  const response = yield call(getProductNewArrival, action.payload);

  if (response !== undefined && response.errors) {
    yield put({type: PRODUCT_NEWARRIVAL_DATA_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: PRODUCT_NEWARRIVAL_DATA_COMPLETED, response});
  }
}

export function* productNewArrival() {
  yield takeEvery(PRODUCT_NEWARRIVAL_DATA, productNewArrivalAsync);
}
