import {
  PRODUCT_DETAILS_DATA,
  PRODUCT_DETAILS_DATA_COMPLETED,
  PRODUCT_DETAILS_DATA_ERROR,
  PRODUCT_DETAILS_DATA_REQUEST,
} from '../../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  productDetails: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  console.log(action.type);
  switch (action.type) {
    case PRODUCT_DETAILS_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case PRODUCT_DETAILS_DATA_COMPLETED:
      return {
        ...state,
        isLoading: false,
        productDetails: action.response,
        error: false,
      };
    case PRODUCT_DETAILS_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        productDetails: null,
        error: true,
      };
    case 'RESET_PRODUCT_DETAILS_DATA':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const productDetailsData = payload => ({
  type: PRODUCT_DETAILS_DATA,
  payload,
});

export const resetProductDetailsData = () => ({
  type: 'RESET_PRODUCT_DETAILS_DATA',
});
