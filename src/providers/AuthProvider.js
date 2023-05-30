import React, {createContext, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {userLogout} from '../apps/reducers/auth/authLogout';
import {resetLogin} from '../apps/reducers/auth/authLogin';
import {resetRegister} from '../apps/reducers/auth/authRegister';
import {resetProductData} from '../apps/reducers/product/productIndex';
import {getCartCount} from '../apps/reducers/cartCount';
import {getWishlistCount} from '../apps/reducers/wishlistCount';

const AuthContext = createContext();
const AuthProvider = props => {
  const authLogin = useSelector(state => state.authLogin.userData);

  const {slidesLoading, slidesData} = useSelector(state => state.productSlides);
  const {newArrivalLoading, newArrivalData} = useSelector(
    state => state.productNewArrivals,
  );
  const {trendingLoading, trendingData} = useSelector(
    state => state.productTrending,
  );
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(userLogout());
    dispatch(resetLogin());
    dispatch(resetRegister());
    dispatch(resetProductData());
  };

  useEffect(() => {
    checkLogin();
  }, [slidesData, newArrivalData, trendingData]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (authLogin) {
  //       dispatch(getCartCount());
  //       dispatch(getWishlistCount());
  //       console.log('has user');
  //     } else {
  //       console.log('no user');
  //     }
  //   }, 3000);

  //   return () => clearInterval(intervalId);
  // }, []);

  function checkLogin() {
    setUser(authLogin);

    if (
      (slidesData?.message === 'Unauthenticated' &&
        newArrivalData?.message === 'Unauthenticated' &&
        trendingData?.message === 'Unauthenticated') ||
      (slidesData?.message === 'Unauthenticated.' &&
        newArrivalData?.message === 'Unauthenticated.' &&
        trendingData?.message === 'Unauthenticated.')
    ) {
      Alert.alert('Session Expired', 'Please login again', [
        {
          text: 'OK',
          onPress: () => {
            onLogout();
          },
        },
      ]);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
