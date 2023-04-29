import {View, Text, Button} from 'react-native';
import React from 'react';
import {userLogout} from '../../apps/reducers/authLogout';
import {useSelector, useDispatch} from 'react-redux';
import {resetLogin} from '../../apps/reducers/authLogin';
import {resetRegister} from '../../apps/reducers/authRegister';

export default function () {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(userLogout());
    dispatch(resetLogin());
    dispatch(resetRegister());
  };
  return (
    <View>
      <Button title="Logout" onPress={() => onLogout()} />
    </View>
  );
}
