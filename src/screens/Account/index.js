import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../apps/configs/icons';
import {ROUTES, COLORS, IMAGES} from '../..';
import {userLogout} from '../../apps/reducers/auth/authLogout';
import {resetLogin} from '../../apps/reducers/auth/authLogin';
import {resetRegister} from '../../apps/reducers/auth/authRegister';
import {resetProductData} from '../../apps/reducers/product/productIndex';
import {resetCategoryData} from '../../apps/reducers/category/categories';
import {resetProductDetailsData} from '../../apps/reducers/product/productDetails';
import {resetSelectedCategoryData} from '../../apps/reducers/categoriesData';
import {getCartCount, resetCartCount} from '../../apps/reducers/cartCount';
import {
  getWishlistCount,
  resetWishlistCount,
} from '../../apps/reducers/wishlistCount';
import {
  getUserItemCount,
  resetUserItemCount,
} from '../../apps/reducers/userItemCount';
import {resetUserData, userData, userData2} from '../../apps/reducers/userData';
import {resetUserUpdateData} from '../../apps/reducers/userUpdateData';
import {
  getWishlistItemsShow,
  resetWishlistItemsShow,
} from '../../apps/reducers/wishlistItemShow';
import {resetCartData} from '../../apps/reducers/cartData';
import {resetCartItemIncrement} from '../../apps/reducers/cartIncrement';
import {resetCartItemDecrement} from '../../apps/reducers/cartDecrement';
import {resetMyProductsData} from '../../apps/reducers/product/myProduct';
import {resetChangePassword} from '../../apps/reducers/changepass';
import {resetWishlistAdd} from '../../apps/reducers/wishlistAdd';
import {resetWishlistRemove} from '../../apps/reducers/wishlistRemove';
import {removeCartReset} from '../../apps/reducers/cartRemove';
import {resetCheckOut} from '../../apps/reducers/checkout';
import {getOrders, resetOrders} from '../../apps/reducers/orders';
import {resetForgot} from '../../apps/reducers/auth/authForgot';
import {resetProductSlidesData} from '../../apps/reducers/product/productSlides';
import {resetProductNewArrivalData} from '../../apps/reducers/product/productNewArrivals';
import {resetProductTrendingData} from '../../apps/reducers/product/productTrending';
import {globalResetActions} from '../../globalResetActions';

export default function ({navigation}) {
  const session = useSelector(state => state.authLogin.userData);
  const cartCount = useSelector(state => state.cartCount.cart_count);
  const getwishlistCount = useSelector(state => state.wishlistCount.data);
  const getUserSellCount = useSelector(state => state.userItemCount.data);
  const {user} = useSelector(state => state.userData.data);
  const {orders} = useSelector(state => state.orders.data);

  const dispatch = useDispatch();

  const onLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            Symbol;
            dispatch(globalResetActions());
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  useEffect(() => {
    dispatch(userData());
    dispatch(userData2());

    dispatch(getCartCount());
    dispatch(getWishlistCount());
    dispatch(getUserItemCount());
    dispatch(getWishlistItemsShow());

    dispatch(getOrders());
  }, []);

  const renderProfile = () => {
    return (
      <View className="w-[100%] h-fit mt-2 p-2">
        <View className="items-center justify-center my-2">
          <View className="w-fit h-fit rounded-full">
            <Image
              source={IMAGES.user}
              className="w-[130] h-[130] rounded-full"
            />
          </View>

          <View className="w-[100%] p-2 items-center justify-center mt-2">
            <Text
              className="text-xl font-bold"
              style={{color: COLORS.textColor}}>
              {user && user.name}
            </Text>
            <Text className="text-base" style={{color: COLORS.textColor}}>
              {user && user.email}
            </Text>
            <View className="flex-row items-center justify-center mt-2">
              <Image source={IMAGES.verified} style={{width: 22, height: 26}} />
              <Text className="ml-1 text-sm" style={{color: COLORS.textColor}}>
                {user && user.email_verified_at !== null
                  ? 'Account Verified'
                  : 'Account Not Verified'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderAll = () => {
    return (
      <ScrollView
        className="w-[100%] h-fit my-2"
        showsVerticalScrollIndicator={false}>
        {/* Account */}
        <View className="w-[100%] h-fit mb-2">
          <Text className="text-xs font-bold" style={{color: COLORS.textColor}}>
            ACCOUNT
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CART)}>
            <View className="flex-row w-[100%] h-fit items-center justify-between p-2">
              <View className="flex-row items-center">
                <View className="w-[30] h-[30] items-center justify-center">
                  <Image
                    source={IMAGES.cart}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </View>

                <Text
                  className="mx-2 text-base font-bold"
                  style={{color: COLORS.textColor}}>
                  Cart
                </Text>

                {cartCount && cartCount.cart_count > 0 ? (
                  <View className="rounded-full bg-red-500 w-5 items-center">
                    <Text
                      className="font-bold"
                      style={{color: COLORS.textWhite}}>
                      {cartCount.cart_count}
                    </Text>
                  </View>
                ) : null}
              </View>

              <View>
                <Icons.FontAwesome name="angle-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.WISHLIST)}>
            <View className="flex-row w-[100%] h-fit items-center justify-between p-2">
              <View className="flex-row items-center">
                <View className="w-[30] h-[30] items-center justify-center">
                  <Image
                    source={IMAGES.wishlist}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </View>

                <Text
                  className="mx-2 text-base font-bold"
                  style={{color: COLORS.textColor}}>
                  Wishlist
                </Text>

                {getwishlistCount && getwishlistCount.wishlistCount > 0 ? (
                  <View className="rounded-full bg-red-500 w-5 items-center">
                    <Text
                      className="font-bold"
                      style={{color: COLORS.textWhite}}>
                      {getwishlistCount.wishlistCount}
                    </Text>
                  </View>
                ) : null}
              </View>

              <View>
                <Icons.FontAwesome name="angle-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SELL)}>
            <View className="flex-row w-[100%] h-fit items-center justify-between p-2">
              <View className="flex-row items-center justify-center">
                <View className="w-[30] h-[30] items-center justify-center">
                  <Image
                    source={IMAGES.peso}
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </View>

                <Text
                  className="mx-2 text-base font-bold"
                  style={{color: COLORS.textColor}}>
                  My Products
                </Text>
                {getUserSellCount && getUserSellCount.productCount > 0 ? (
                  <View className="rounded-full bg-red-500 w-5 items-center">
                    <Text
                      className="font-bold"
                      style={{color: COLORS.textWhite}}>
                      {getUserSellCount.productCount}
                    </Text>
                  </View>
                ) : null}
              </View>

              <View>
                <Icons.FontAwesome name="angle-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.ORDERS)}>
            <View className="flex-row w-[100%] h-fit items-center justify-between p-2">
              <View className="flex-row items-center justify-center">
                <View className="w-[30] h-[30] items-center justify-center">
                  <Image
                    source={IMAGES.orders}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </View>

                <Text
                  className="mx-2 text-base font-bold"
                  style={{color: COLORS.textColor}}>
                  My Orders
                </Text>
              </View>

              <View>
                <Icons.FontAwesome name="angle-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View className="w-[100%] h-fit mb-2">
          <Text className="text-xs font-bold" style={{color: COLORS.textColor}}>
            SETTINGS
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.PROFILE_INFO)}>
            <View className="flex-row w-[100%] h-fit items-center justify-between p-2">
              <View className="flex-row items-center">
                <View className="w-[30] h-[30] items-center justify-center">
                  <Image
                    source={IMAGES.user_details}
                    style={{
                      width: 35,
                      height: 28,
                    }}
                  />
                </View>

                <Text
                  className="mx-3 text-base font-bold"
                  style={{color: COLORS.textColor}}>
                  User Details
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.CHANGE_PASSWORD)}>
            <View className="flex-row w-[100%] h-fit items-center justify-between p-2">
              <View className="flex-row items-center">
                <View className="w-[30] h-[30] items-center justify-center">
                  <Image
                    source={IMAGES.change_password}
                    resizeMode="contain"
                    style={{
                      width: 35,
                      height: 30,
                    }}
                  />
                </View>

                <Text
                  className="mx-3 text-base font-bold"
                  style={{color: COLORS.textColor}}>
                  Change Password
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onLogout()}>
            <View className="flex-row w-[100%] h-fit items-center justify-between p-2">
              <View className="flex-row items-center">
                <View className="w-[30] h-[30] items-center justify-center">
                  <Image
                    source={IMAGES.logout}
                    resizeMode="contain"
                    style={{
                      width: 35,
                      height: 30,
                    }}
                  />
                </View>

                <Text
                  className="mx-3 text-base font-bold"
                  style={{color: COLORS.textColor}}>
                  Logout
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  return (
    <SafeAreaView
      className="w-[100%] h-[100%] p-2"
      style={{backgroundColor: COLORS.BGColor}}>
      {renderProfile()}

      {renderAll()}
    </SafeAreaView>
  );
}
