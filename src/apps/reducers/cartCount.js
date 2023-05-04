import {
  CART_COUNT,
  CART_COUNT_COMPLETED,
  CART_COUNT_ERROR,
  CART_COUNT_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  cart_count: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  console.log(action.type);
  switch (action.type) {
    case CART_COUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case CART_COUNT_COMPLETED:
      return {
        ...state,
        isLoading: false,
        cart_count: action.response,
      };
    case CART_COUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case 'ResetCartCount':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const getCartCount = () => ({
  type: CART_COUNT,
});

export const resetCartCount = () => ({
  type: 'ResetCartCount',
});
