import {
  WISHLIST_ITEMS_SHOW,
  WISHLIST_ITEMS_SHOW_COMPLETED,
  WISHLIST_ITEMS_SHOW_ERROR,
  WISHLIST_ITEMS_SHOW_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case WISHLIST_ITEMS_SHOW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case WISHLIST_ITEMS_SHOW_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
      };
    case WISHLIST_ITEMS_SHOW_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case 'ResetWishlistItemsShow':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const getWishlistItemsShow = () => ({
  type: WISHLIST_ITEMS_SHOW,
});

export const resetWishlistItemsShow = () => ({
  type: 'ResetWishlistItemsShow',
});
