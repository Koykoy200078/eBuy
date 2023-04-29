import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {Dimensions, Easing, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Home, Login, ROUTES, Register, Welcome} from '..';

const width = Dimensions.get('window').width;

const options = {
  gestureEnabled: true,
  gestureDirections: 'horizontal',
  transitionSpec: {
    open: {animation: 'timing', duration: 300, easing: Easing},
    close: {animation: 'timing', duration: 300, easing: Easing},
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const AuthStack = createStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator screenOptions={(options, {headerShown: false})}>
      <AuthStack.Screen name={ROUTES.WELCOME} component={Welcome} />
      <AuthStack.Screen name={ROUTES.LOGIN} component={Login} />
      <AuthStack.Screen name={ROUTES.REGISTER} component={Register} />
    </AuthStack.Navigator>
  );
};

const MainStack = createStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator screenOptions={(options, {headerShown: false})}>
      <MainStack.Screen name={ROUTES.HOME} component={Home} />
    </MainStack.Navigator>
  );
};

export default () => {
  const authLogin = useSelector(state => state.authLogin);
  const {userData, error} = authLogin;

  console.log('nav authLogin ==> ', authLogin);

  return (
    <NavigationContainer>
      {userData !== null && userData !== undefined && error === false ? (
        <Main />
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
};
