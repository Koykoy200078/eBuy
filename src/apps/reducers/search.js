import {
  PRODUCT_SEARCH,
  PRODUCT_SEARCH_COMPLETED,
  PRODUCT_SEARCH_ERROR,
  PRODUCT_SEARCH_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case PRODUCT_SEARCH_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
      };
    case PRODUCT_SEARCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case 'ResetProductSearch':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const productSearch = payload => ({
  type: PRODUCT_SEARCH,
  payload,
});

export const resetProductSearch = () => ({
  type: 'ResetProductSearch',
});
