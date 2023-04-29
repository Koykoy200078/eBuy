import {
  USER_REGISTER,
  USER_REGISTER_COMPLETED,
  USER_REGISTER_ERROR,
  USER_REGISTER_REQUEST,
} from '../api/actions';

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  isRegisterError: false,
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  console.log(action.type);
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isRegisterError: false,
      };
    case USER_REGISTER_COMPLETED:
      return {
        ...state,
        isLoading: false,
        success: true,
        isRegisterError: false,
      };
    case USER_REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        success: false,
        isRegisterError: true,
      };

    case 'RESET_REGISTER':
      return INITIAL_STATE;
    default:
      return state;
  }
}

export const userRegister = payload => ({
  type: USER_REGISTER,
  payload,
});

export const resetRegister = () => ({
  type: 'RESET_REGISTER',
});
