import {
  WISHLIST_ADD,
  WISHLIST_ADD_COMPLETED,
  WISHLIST_ADD_ERROR,
  WISHLIST_ADD_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case WISHLIST_ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case WISHLIST_ADD_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
        error: false,
      };
    case WISHLIST_ADD_ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: true,
      };
    case 'RESET_WISHLIST_ADD':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const wishlistAdd = payload => ({
  type: WISHLIST_ADD,
  payload,
});

export const resetWishlistAdd = () => ({
  type: 'RESET_WISHLIST_ADD',
});
