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
import authForgot from './auth/authForgot';

import productIndex from './product/productIndex';
import productDetails from './product/productDetails';

import category from './category/categories';
import category_data from './categoriesData';

import cartCount from './cartCount';
import wishlistCount from './wishlistCount';
import wishlistItemShow from './wishlistItemShow';

import cartAddItem from './cartAddItem';
import cartData from './cartData';

import search from './search';

import userItemCount from './userItemCount';
import userData from './userData';
import userUpdateData from './userUpdateData';

import cartIncrement from './cartIncrement';
import cartDecrement from './cartDecrement';

import myProduct from './product/myProduct';

import changepass from './changepass';

import wishlistAdd from './wishlistAdd';
import wishlistRemove from './wishlistRemove';

import cartRemove from './cartRemove';

import checkout from './checkout';

import orders from './orders';

const rootReducer = combineReducers({
  authLogin: persistReducer(authPersistConfig, authLogin),
  authRegister,
  authLogout,
  authForgot,

  // product
  productIndex,
  productDetails,

  category,
  category_data,

  cartCount,
  cartAddItem,
  cartData,

  // search
  search,

  // wishlist
  wishlistCount,
  wishlistItemShow,

  // user item count
  userItemCount,
  userData,

  userUpdateData,

  cartIncrement,
  cartDecrement,

  myProduct,
  changepass,

  wishlistAdd,
  wishlistRemove,

  cartRemove,

  checkout,

  orders,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  let persistor = persistStore(store);

  return {store, persistor, runSaga: sagaMiddleware.run};
};
