import {
  CHECKOUT,
  CHECKOUT_COMPLETED,
  CHECKOUT_ERROR,
  CHECKOUT_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case CHECKOUT_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
        error: false,
      };
    case CHECKOUT_ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: true,
      };

    case 'RESET_CHECKOUT':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const checkOut = payload => ({
  type: CHECKOUT,
  payload,
});

export const resetCheckOut = () => ({
  type: 'RESET_CHECKOUT',
});
