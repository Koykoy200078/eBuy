import React, {createContext, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {userLogout} from '../apps/reducers/auth/authLogout';
import {resetLogin} from '../apps/reducers/auth/authLogin';
import {resetRegister} from '../apps/reducers/auth/authRegister';
import {resetProductData} from '../apps/reducers/productIndex';

const AuthContext = createContext();
const AuthProvider = props => {
  const authLogin = useSelector(state => state.authLogin.userData);
  const getProducts = useSelector(state => state.productIndex.productData);

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

    if (
      getProducts?.message === 'Unauthenticated' ||
      getProducts?.message === 'Unauthenticated.'
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
  }, []);

  function checkLogin() {
    setUser(authLogin);
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
