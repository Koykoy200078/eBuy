import {
  USER_DATA,
  USER_DATA2,
  USER_DATA2_COMPLETED,
  USER_DATA2_ERROR,
  USER_DATA2_REQUEST,
  USER_DATA_COMPLETED,
  USER_DATA_ERROR,
  USER_DATA_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  data2: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case USER_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case USER_DATA_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
      };
    case USER_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    case USER_DATA2_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case USER_DATA2_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data2: action.response,
      };
    case USER_DATA2_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case 'ResetUserData':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const userData = () => ({
  type: USER_DATA,
});

export const userData2 = () => ({
  type: USER_DATA2,
});

export const resetUserData = () => ({
  type: 'ResetUserData',
});
