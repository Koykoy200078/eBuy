import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_COMPLETED,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case CHANGE_PASSWORD_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
        error: false,
      };
    case CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: true,
      };
    case 'RESET_PASSWORD':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const changePassword = payload => ({
  type: CHANGE_PASSWORD,
  payload,
});

export const resetChangePassword = () => ({
  type: 'RESET_PASSWORD',
});
