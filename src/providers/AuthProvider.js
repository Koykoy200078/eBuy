import React, {createContext, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();
const AuthProvider = props => {
  const authLogin = useSelector(state => state.authLogin.userData);

  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    checkLogin();
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
