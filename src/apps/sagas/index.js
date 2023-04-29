import {all} from 'redux-saga/effects';

// Auth
import {loginUser} from './authLogin';
import {createUserAccount} from './authRegister';
import {logoutUser} from './authLogout';

export default function* rootSaga() {
  yield all([
    // auth/login
    loginUser(),
    createUserAccount(),
    logoutUser(),
  ]);
}
