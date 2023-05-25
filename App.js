import React, {useEffect} from 'react';
import {View, Text, StatusBar, Alert, BackHandler} from 'react-native';

import {COLORS, ROUTES} from './src';
import App from './src/navigations/AppNavigation';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Provider as StoreProvider, useDispatch} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AuthProvider} from './src/providers/AuthProvider';

import configureStore from './src/apps/reducers';
import rootSaga from './src/apps/sagas';
import {userLogout} from './src/apps/reducers/auth/authLogout';
import {resetLogin} from './src/apps/reducers/auth/authLogin';
import {resetRegister} from './src/apps/reducers/auth/authRegister';
import {resetProductData} from './src/apps/reducers/product/productIndex';
import {resetCategoryData} from './src/apps/reducers/category/categories';
import {resetProductDetailsData} from './src/apps/reducers/product/productDetails';
import {resetSelectedCategoryData} from './src/apps/reducers/categoriesData';
import {resetCartCount} from './src/apps/reducers/cartCount';
import {resetWishlistCount} from './src/apps/reducers/wishlistCount';
import {resetUserItemCount} from './src/apps/reducers/userItemCount';
import {resetWishlistItemsShow} from './src/apps/reducers/wishlistItemShow';
import {resetUserData} from './src/apps/reducers/userData';
import {resetCartData} from './src/apps/reducers/cartData';
import {resetCartItemIncrement} from './src/apps/reducers/cartIncrement';
import {resetCartItemDecrement} from './src/apps/reducers/cartDecrement';
import {resetMyProductsData} from './src/apps/reducers/product/myProduct';
import {resetChangePassword} from './src/apps/reducers/changepass';
import {resetWishlistAdd} from './src/apps/reducers/wishlistAdd';
import {resetWishlistRemove} from './src/apps/reducers/wishlistRemove';
import {removeCartReset} from './src/apps/reducers/cartRemove';
import {resetCheckOut} from './src/apps/reducers/checkout';
import {resetOrders} from './src/apps/reducers/orders';
import {resetForgot} from './src/apps/reducers/auth/authForgot';

const {store, persistor, runSaga} = configureStore();

runSaga(rootSaga);

export default function ({navigation}) {
  const backAction = () => {
    Alert.alert('Confirm', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => logout()},
    ]);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  function logout() {
    store.dispatch(resetLogin());
    store.dispatch(resetRegister());
    store.dispatch(resetProductData());
    store.dispatch(resetCategoryData());
    store.dispatch(resetProductDetailsData());
    store.dispatch(resetSelectedCategoryData());
    store.dispatch(resetCartCount());
    store.dispatch(resetWishlistCount());
    store.dispatch(resetUserItemCount());
    store.dispatch(resetWishlistItemsShow());
    store.dispatch(resetUserData());
    store.dispatch(resetCartData());
    store.dispatch(resetCartItemIncrement());
    store.dispatch(resetCartItemDecrement());
    store.dispatch(resetMyProductsData());
    store.dispatch(resetChangePassword());
    store.dispatch(resetWishlistAdd());
    store.dispatch(resetWishlistRemove());
    store.dispatch(removeCartReset());
    store.dispatch(resetCheckOut());
    store.dispatch(resetOrders());
    store.dispatch(resetForgot());

    store.dispatch(userLogout());

    BackHandler.exitApp();
  }

  return (
    <>
      <StatusBar
        animated={true}
        translucent={false}
        backgroundColor={COLORS.BGColor}
        barStyle={'dark-content'}
      />

      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </PersistGate>
      </StoreProvider>

      <Toast topOffset={10} />
    </>
  );
}
