import {
  WISHLIST_REMOVE,
  WISHLIST_REMOVE_COMPLETED,
  WISHLIST_REMOVE_ERROR,
  WISHLIST_REMOVE_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case WISHLIST_REMOVE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case WISHLIST_REMOVE_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
        error: false,
      };
    case WISHLIST_REMOVE_ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: true,
      };
    case 'RESET_WISHLIST_REMOVE':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const wishlistRemove = payload => ({
  type: WISHLIST_REMOVE,
  payload,
});

export const resetWishlistRemove = () => ({
  type: 'RESET_WISHLIST_REMOVE',
});
