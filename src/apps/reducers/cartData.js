import {
  CART_DATA,
  CART_DATA_COMPLETED,
  CART_DATA_ERROR,
  CART_DATA_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CART_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case CART_DATA_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
      };
    case CART_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    case 'ResetCartData':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const cartData = payload => ({
  type: CART_DATA,
  payload,
});

export const resetCartData = () => ({
  type: 'ResetCartData',
});
