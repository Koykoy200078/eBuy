import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_COMPLETED,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST,
} from '../../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  data: null,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case FORGOT_PASSWORD_COMPLETED:
      return {
        ...state,
        isLoading: false,
        data: action.response,
        error: false,
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        data: null,
        error: true,
      };
    case 'RESET_FORGOT':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const forgotPassword = payload => ({
  type: FORGOT_PASSWORD,
  payload,
});

export const resetForgot = () => ({
  type: 'RESET_FORGOT',
});
