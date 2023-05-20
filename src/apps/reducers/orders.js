import {
  ORDERS,
  ORDERS_COMPLETED,
  ORDERS_ERROR,
  ORDERS_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case ORDERS_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
        error: false,
      };
    case ORDERS_ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: true,
      };
    case 'RESET_ORDERS':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const getOrders = () => ({
  type: ORDERS,
});

export const resetOrders = () => ({
  type: 'RESET_ORDERS',
});
