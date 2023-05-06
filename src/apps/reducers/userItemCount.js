import {
  USER_ITEM_COUNT,
  USER_ITEM_COUNT_COMPLETED,
  USER_ITEM_COUNT_ERROR,
  USER_ITEM_COUNT_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case USER_ITEM_COUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_ITEM_COUNT_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
      };
    case USER_ITEM_COUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case 'ResetUserItemCount':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const getUserItemCount = () => ({
  type: USER_ITEM_COUNT,
});

export const resetUserItemCount = () => ({
  type: 'ResetUserItemCount',
});
