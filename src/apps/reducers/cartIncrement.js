import {
  CART_ITEM_INCREMENT,
  CART_ITEM_INCREMENT_COMPLETED,
  CART_ITEM_INCREMENT_ERROR,
  CART_ITEM_INCREMENT_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CART_ITEM_INCREMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case CART_ITEM_INCREMENT_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
      };
    case CART_ITEM_INCREMENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case 'ResetCartItemIncrement':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const cartItemDataIncrement = payload => ({
  type: CART_ITEM_INCREMENT,
  payload,
});

export const resetCartItemIncrement = () => ({
  type: 'ResetCartItemIncrement',
});
