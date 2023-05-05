import {
  CATEGORY_DATA,
  CATEGORY_DATA_COMPLETED,
  CATEGORY_DATA_ERROR,
  CATEGORY_DATA_REQUEST,
} from '../../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  categoriesData: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CATEGORY_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case CATEGORY_DATA_COMPLETED:
      return {
        ...state,
        isLoading: false,
        categoriesData: action.response,
        error: false,
      };
    case CATEGORY_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        categoriesData: null,
        error: true,
      };

    case 'RESET_CATEGORY_DATA':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const categoryData = () => ({
  type: CATEGORY_DATA,
});

export const resetCategoryData = () => ({
  type: 'RESET_CATEGORY_DATA',
});
