import AsyncStorage from '@react-native-async-storage/async-storage';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth'],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  blacklist: [],
};

import authLogin from './authLogin';
import authRegister from './authRegister';
import authLogout from './authLogout';

const rootReducer = combineReducers({
  authLogin: persistReducer(authPersistConfig, authLogin),
  authRegister,
  authLogout,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  let persistor = persistStore(store);

  return {store, persistor, runSaga: sagaMiddleware.run};
};
