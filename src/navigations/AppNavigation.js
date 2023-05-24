import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import {Dimensions, Easing} from 'react-native';
import {useSelector} from 'react-redux';
import {
  Account,
  Cart,
  Category,
  ChangePassword,
  Checkout,
  Home,
  Login,
  ProductInfo,
  ProfileInfo,
  ROUTES,
  Register,
  RegisterDetails,
  SellItem,
  Success,
  Verify,
  ViewAll,
  Welcome,
  Wishlist,
} from '..';
import {Icons} from '../apps/configs/icons';
import Orders from '../screens/Orders';

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
    <AuthStack.Navigator
      initialRouteName={ROUTES.WELCOME}
      screenOptions={(options, {headerShown: false})}>
      <AuthStack.Screen name={ROUTES.WELCOME} component={Welcome} />
      <AuthStack.Screen name={ROUTES.LOGIN} component={Login} />
      <AuthStack.Screen name={ROUTES.REGISTER} component={Register} />
      <AuthStack.Screen
        name={ROUTES.REGISTER_DETAILS}
        component={RegisterDetails}
      />
      <AuthStack.Screen name={ROUTES.VERIFY} component={Verify} />
    </AuthStack.Navigator>
  );
};

const MainStack = createStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      initialRouteName={ROUTES.TAB}
      screenOptions={(options, {headerShown: false})}>
      <MainStack.Screen name={ROUTES.TAB} component={TabBar} />
      <MainStack.Screen name={ROUTES.VIEWALL} component={ViewAll} />
      <MainStack.Screen
        name={ROUTES.CHANGE_PASSWORD}
        component={ChangePassword}
      />
      <MainStack.Screen name={ROUTES.PRODUCT_DETAILS} component={ProductInfo} />
      <MainStack.Screen name={ROUTES.PROFILE_INFO} component={ProfileInfo} />
      <MainStack.Screen name={ROUTES.WISHLIST} component={Wishlist} />
      <MainStack.Screen name={ROUTES.SELL} component={SellItem} />
      <MainStack.Screen name={ROUTES.CHECKOUT} component={Checkout} />
      <MainStack.Screen name={ROUTES.ORDERS} component={Orders} />
      <MainStack.Screen name={ROUTES.SUCCESS} component={Success} />
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
              ? 'person-circle-outline'
              : 'person-circle-sharp';
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
          tabBarBadge:
            getCount && getCount.cart_count > 0 ? getCount.cart_count : null,
        }}
      />
      <Tab.Screen name={ROUTES.ACCOUNT} component={Account} />
    </Tab.Navigator>
  );
};

export default () => {
  const {userData, error} = useSelector(state => state.authLogin);

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
