import {put, call, takeEvery} from 'redux-saga/effects';
import {showError} from '../others/helperFunctions';
import {getOrders} from '../api/orders';
import {
  ORDERS,
  ORDERS_COMPLETED,
  ORDERS_ERROR,
  ORDERS_REQUEST,
} from '../api/actions';

export function* ordersDataAsync(action) {
  yield put({type: ORDERS_REQUEST});

  const response = yield call(getOrders, action.payload);

  if (response && response.errors) {
    yield put({type: ORDERS_ERROR, response});
    showError({
      message: 'Something went wrong!',
    });
  } else {
    yield put({type: ORDERS_COMPLETED, response});
  }
}

export function* ordersData() {
  yield takeEvery(ORDERS, ordersDataAsync);
}
