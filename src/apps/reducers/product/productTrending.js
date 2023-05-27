import {
  PRODUCT_TRENDING_DATA,
  PRODUCT_TRENDING_DATA_COMPLETED,
  PRODUCT_TRENDING_DATA_ERROR,
  PRODUCT_TRENDING_DATA_REQUEST,
} from '../../api/actions';

const INITIAL_STATE = {
  trendingLoading: false,
  trendingData: null,
  trendingError: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case PRODUCT_TRENDING_DATA_REQUEST:
      return {
        ...state,
        trendingLoading: true,
        trendingError: false,
      };
    case PRODUCT_TRENDING_DATA_COMPLETED:
      return {
        ...state,
        trendingLoading: false,
        trendingData: action.response,
        trendingError: false,
      };
    case PRODUCT_TRENDING_DATA_ERROR:
      return {
        ...state,
        trendingLoading: false,
        trendingData: null,
        trendingError: true,
      };
    case 'RESET_PRODUCT_TRENDING_DATA':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const productTrendingData = () => ({
  type: PRODUCT_TRENDING_DATA,
});

export const resetProductTrendingData = () => ({
  type: 'RESET_PRODUCT_TRENDING_DATA',
});
