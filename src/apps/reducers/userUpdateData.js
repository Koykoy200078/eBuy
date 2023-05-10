import {
  USER_UPDATE_DATA,
  USER_UPDATE_DATA_COMPLETED,
  USER_UPDATE_DATA_ERROR,
  USER_UPDATE_DATA_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case USER_UPDATE_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_UPDATE_DATA_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
      };
    case USER_UPDATE_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case 'ResetUserUpdateData':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const getUserUpdateData = payload => ({
  type: USER_UPDATE_DATA,
  payload,
});

export const resetUserUpdateData = () => ({
  type: 'ResetUserUpdateData',
});
