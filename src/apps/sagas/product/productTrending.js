import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../../others/helperFunctions';
import {getProductTrending} from '../../api/product';
import {
  PRODUCT_TRENDING_DATA,
  PRODUCT_TRENDING_DATA_COMPLETED,
  PRODUCT_TRENDING_DATA_ERROR,
  PRODUCT_TRENDING_DATA_REQUEST,
} from '../../api/actions';

export function* productTrendingAsync(action) {
  yield put({type: PRODUCT_TRENDING_DATA_REQUEST});

  const response = yield call(getProductTrending, action.payload);

  if (response !== undefined && response.errors) {
    yield put({type: PRODUCT_TRENDING_DATA_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: PRODUCT_TRENDING_DATA_COMPLETED, response});
  }
}

export function* productTrending() {
  yield takeEvery(PRODUCT_TRENDING_DATA, productTrendingAsync);
}
