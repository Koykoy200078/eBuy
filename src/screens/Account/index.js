import {View, Text, Button} from 'react-native';
import React from 'react';
import {userLogout} from '../../apps/reducers/auth/authLogout';
import {useSelector, useDispatch} from 'react-redux';
import {resetLogin} from '../../apps/reducers/auth/authLogin';
import {resetRegister} from '../../apps/reducers/auth/authRegister';
import {resetProductData} from '../../apps/reducers/productIndex';

export default function () {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(userLogout());
    dispatch(resetLogin());
    dispatch(resetRegister());
    dispatch(resetProductData());
  };
  return (
    <View>
      <Button title="Logout" onPress={() => onLogout()} />
    </View>
  );
}
