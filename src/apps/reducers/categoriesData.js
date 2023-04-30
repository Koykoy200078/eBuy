import {
  CATEGORY_DETAILS_DATA,
  CATEGORY_DETAILS_DATA_COMPLETED,
  CATEGORY_DETAILS_DATA_ERROR,
  CATEGORY_DETAILS_DATA_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  selectedData: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  console.log(action.type);
  switch (action.type) {
    case CATEGORY_DETAILS_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case CATEGORY_DETAILS_DATA_COMPLETED:
      return {
        ...state,
        isLoading: false,
        selectedData: action.response,
        error: false,
      };
    case CATEGORY_DETAILS_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        selectedData: null,
        error: true,
      };
    case 'RESET_CATEGORY_DETAILS_DATA':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const selectedCategoryData = payload => ({
  type: CATEGORY_DETAILS_DATA,
  payload,
});

export const resetSelectedCategoryData = () => ({
  type: 'RESET_CATEGORY_DETAILS_DATA',
});
