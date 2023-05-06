import {
  WISHLIST_COUNT,
  WISHLIST_COUNT_COMPLETED,
  WISHLIST_COUNT_ERROR,
  WISHLIST_COUNT_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case WISHLIST_COUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case WISHLIST_COUNT_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
      };
    case WISHLIST_COUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case 'ResetWishlistCount':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const getWishlistCount = () => ({
  type: WISHLIST_COUNT,
});

export const resetWishlistCount = () => ({
  type: 'ResetWishlistCount',
});
