import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../../others/helperFunctions';
import {getMyProduct} from '../../api/product';
import {
  MY_PRODUCTS,
  MY_PRODUCTS_COMPLETED,
  MY_PRODUCTS_ERROR,
  MY_PRODUCTS_REQUEST,
} from '../../api/actions';

export function* myProductDetailsAsync(action) {
  yield put({type: MY_PRODUCTS_REQUEST});

  const response = yield call(getMyProduct, action.payload);

  if (response !== undefined && response.errors) {
    yield put({type: MY_PRODUCTS_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: MY_PRODUCTS_COMPLETED, response});
  }
}

export function* myProductDetails() {
  yield takeEvery(MY_PRODUCTS, myProductDetailsAsync);
}
