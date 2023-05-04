import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {Dimensions, Easing, View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  Account,
  Cart,
  Category,
  Home,
  Login,
  ProductInfo,
  ROUTES,
  Register,
  Welcome,
} from '..';
import {Icons} from '../apps/configs/icons';

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
      <MainStack.Screen name="Tab" component={TabBar} />
      <MainStack.Screen name={ROUTES.PRODUCT_DETAILS} component={ProductInfo} />
    </MainStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const TabBar = () => {
  const getCount = useSelector(state => state.cartCount.cart_count);
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === ROUTES.HOME) {
            iconName = focused ? 'home-outline' : 'home-sharp';
          } else if (route.name === ROUTES.CATEGORY) {
            return (
              <Icons.MaterialIcons
                name={'category'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === ROUTES.CART) {
            iconName = focused ? 'basket-outline' : 'basket-sharp';
          } else if (route.name === ROUTES.ACCOUNT) {
            iconName = focused
              ? 'person-circle-sharp'
              : 'person-circle-outline';
          }
          return <Icons.Ionicons name={iconName} size={size} color={color} />;
        },
        activeTintColor: '#000',
        inactiveTintColor: 'gray',
        showLabel: false,
        style: {
          backgroundColor: '#fff',
          height: 60,
        },
      })}>
      <Tab.Screen name={ROUTES.HOME} component={Home} />
      <Tab.Screen name={ROUTES.CATEGORY} component={Category} />
      <Tab.Screen
        name={ROUTES.CART}
        component={Cart}
        options={{
          tabBarBadge: getCount && getCount.cart_count,
        }}
      />
      <Tab.Screen name={ROUTES.ACCOUNT} component={Account} />
    </Tab.Navigator>
  );
};

export default () => {
  const authLogin = useSelector(state => state.authLogin);
  const {userData, error} = authLogin;

  return (
    <NavigationContainer>
      {userData !== null &&
      userData !== undefined &&
      userData.access_token !== null &&
      error === false ? (
        <Main />
      ) : (
        <Auth />
      )}
    </NavigationContainer>
  );
};
