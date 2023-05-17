import {
  MY_PRODUCTS,
  MY_PRODUCTS_COMPLETED,
  MY_PRODUCTS_ERROR,
  MY_PRODUCTS_REQUEST,
} from '../../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case MY_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case MY_PRODUCTS_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
        error: false,
      };
    case MY_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: true,
      };
    case 'RESET_MY_PRODUCTS':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const myProductsData = () => ({
  type: MY_PRODUCTS,
});

export const resetMyProductsData = () => ({
  type: 'RESET_MY_PRODUCTS',
});
