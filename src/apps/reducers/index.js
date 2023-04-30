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

import authLogin from './auth/authLogin';
import authRegister from './auth/authRegister';
import authLogout from './auth/authLogout';

import productIndex from './product/productIndex';
import productDetails from './product/productDetails';

import category from './category/categories';
import category_data from './categoriesData';

const rootReducer = combineReducers({
  authLogin: persistReducer(authPersistConfig, authLogin),
  authRegister,
  authLogout,

  // product
  productIndex,
  productDetails,

  category,
  category_data,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  let persistor = persistStore(store);

  return {store, persistor, runSaga: sagaMiddleware.run};
};
