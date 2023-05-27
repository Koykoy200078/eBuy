import {
  PRODUCT_NEWARRIVAL_DATA,
  PRODUCT_NEWARRIVAL_DATA_COMPLETED,
  PRODUCT_NEWARRIVAL_DATA_ERROR,
  PRODUCT_NEWARRIVAL_DATA_REQUEST,
} from '../../api/actions';

const INITIAL_STATE = {
  newArrivalLoading: false,
  newArrivalData: null,
  newArrivalError: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case PRODUCT_NEWARRIVAL_DATA_REQUEST:
      return {
        ...state,
        newArrivalLoading: true,
        newArrivalError: false,
      };
    case PRODUCT_NEWARRIVAL_DATA_COMPLETED:
      return {
        ...state,
        newArrivalLoading: false,
        newArrivalData: action.response,
        newArrivalError: false,
      };
    case PRODUCT_NEWARRIVAL_DATA_ERROR:
      return {
        ...state,
        newArrivalLoading: false,
        newArrivalData: null,
        newArrivalError: true,
      };
    case 'RESET_PRODUCT_NEWARRIVAL_DATA':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const productNewArrivalData = () => ({
  type: PRODUCT_NEWARRIVAL_DATA,
});

export const resetProductNewArrivalData = () => ({
  type: 'RESET_PRODUCT_NEWARRIVAL_DATA',
});
