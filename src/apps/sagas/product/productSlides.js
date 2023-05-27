import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../../others/helperFunctions';
import {getProductSlides} from '../../api/product';
import {
  PRODUCT_SLIDES_DATA,
  PRODUCT_SLIDES_DATA_COMPLETED,
  PRODUCT_SLIDES_DATA_ERROR,
  PRODUCT_SLIDES_DATA_REQUEST,
} from '../../api/actions';

export function* productSlidesAsync(action) {
  yield put({type: PRODUCT_SLIDES_DATA_REQUEST});

  const response = yield call(getProductSlides, action.payload);

  if (response !== undefined && response.errors) {
    yield put({type: PRODUCT_SLIDES_DATA_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: PRODUCT_SLIDES_DATA_COMPLETED, response});
  }
}

export function* productSlides() {
  yield takeEvery(PRODUCT_SLIDES_DATA, productSlidesAsync);
}
