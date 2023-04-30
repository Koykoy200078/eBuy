import {
  PRODUCT_DATA,
  PRODUCT_DATA_COMPLETED,
  PRODUCT_DATA_ERROR,
  PRODUCT_DATA_REQUEST,
} from '../../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  productData: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  console.log(action.type);
  switch (action.type) {
    case PRODUCT_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case PRODUCT_DATA_COMPLETED:
      return {
        ...state,
        isLoading: false,
        productData: action.response,
        error: false,
      };
    case PRODUCT_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        productData: null,
        error: true,
      };
    case 'RESET_PRODUCT_DATA':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const productData = () => ({
  type: PRODUCT_DATA,
});

export const resetProductData = () => ({
  type: 'RESET_PRODUCT_DATA',
});
