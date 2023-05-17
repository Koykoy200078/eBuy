import {
  CART_ITEM_DECREMENT,
  CART_ITEM_DECREMENT_COMPLETED,
  CART_ITEM_DECREMENT_ERROR,
  CART_ITEM_DECREMENT_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CART_ITEM_DECREMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case CART_ITEM_DECREMENT_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
      };
    case CART_ITEM_DECREMENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case 'ResetCartItemDecrement':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const cartItemDataDecrement = payload => ({
  type: CART_ITEM_DECREMENT,
  payload,
});

export const resetCartItemDecrement = () => ({
  type: 'ResetCartItemDecrement',
});
