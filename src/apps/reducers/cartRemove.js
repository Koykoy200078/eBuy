import {
  CART_REMOVE,
  CART_REMOVE_COMPLETED,
  CART_REMOVE_ERROR,
  CART_REMOVE_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CART_REMOVE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CART_REMOVE_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
      };
    case CART_REMOVE_ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: action.error,
      };
    case 'RESET_REMOVE_DATA':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const removeCart = payload => ({
  type: CART_REMOVE,
  payload,
});

export const removeCartReset = () => ({
  type: 'RESET_REMOVE_DATA',
});
