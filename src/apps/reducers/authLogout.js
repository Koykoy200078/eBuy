import {
  USER_LOGOUT,
  USER_LOGOUT_COMPLETED,
  USER_LOGOUT_ERROR,
  USER_LOGOUT_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  logout: false,
  error: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  console.log(action.type);
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case USER_LOGOUT_COMPLETED:
      return {
        ...state,
        isLoading: false,
        logout: true,
        error: false,
      };
    case USER_LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false,
        logout: false,
        error: true,
      };
    default:
      return state;
  }
}

export const userLogout = () => ({
  type: USER_LOGOUT,
});
