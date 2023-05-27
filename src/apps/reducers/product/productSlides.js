import {
  PRODUCT_SLIDES_DATA,
  PRODUCT_SLIDES_DATA_COMPLETED,
  PRODUCT_SLIDES_DATA_ERROR,
  PRODUCT_SLIDES_DATA_REQUEST,
} from '../../api/actions';

const INITIAL_STATE = {
  slidesLoading: false,
  slidesData: null,
  slidesError: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case PRODUCT_SLIDES_DATA_REQUEST:
      return {
        ...state,
        slidesLoading: true,
        slidesError: false,
      };
    case PRODUCT_SLIDES_DATA_COMPLETED:
      return {
        ...state,
        slidesLoading: false,
        slidesData: action.response,
        slidesError: false,
      };
    case PRODUCT_SLIDES_DATA_ERROR:
      return {
        ...state,
        slidesLoading: false,
        slidesData: null,
        slidesError: true,
      };
    case 'RESET_PRODUCT_SLIDES_DATA':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const productSlidesData = () => ({
  type: PRODUCT_SLIDES_DATA,
});

export const resetProductSlidesData = () => ({
  type: 'RESET_PRODUCT_SLIDES_DATA',
});
