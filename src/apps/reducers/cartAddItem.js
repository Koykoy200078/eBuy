import {
  ADD_TO_CART,
  ADD_TO_CART_COMPLETED,
  ADD_TO_CART_ERROR,
  ADD_TO_CART_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  console.log(action.type);
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case ADD_TO_CART_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
      };
    case ADD_TO_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case 'ResetAddToCart':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const addToCart = payload => ({
  type: ADD_TO_CART,
  payload,
});

export const resetAddToCart = () => ({
  type: 'ResetAddToCart',
});
