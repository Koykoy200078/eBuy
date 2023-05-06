import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
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
export default function ({navigation}) {
  const session = useSelector(state => state.authLogin.userData);
  const cartCount = useSelector(state => state.cartCount.cart_count);
  const getwishlistCount = useSelector(state => state.wishlistCount.data);
  const getUserSellCount = useSelector(state => state.userItemCount.data);
  // const getUserData = useSelector(state => state.user.userDetails);

  console.log('getUserSellCount ===> ', getUserSellCount);
  const [data, setData] = useState(''); //getUserData
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(userLogout());
    dispatch(resetLogin());
    dispatch(resetRegister());
    dispatch(resetProductData());
    dispatch(resetCategoryData());
    dispatch(resetProductDetailsData());
    dispatch(resetSelectedCategoryData());
    dispatch(resetCartCount());
    dispatch(resetWishlistCount());
    dispatch(resetUserItemCount());
  };

  useEffect(() => {
    dispatch(getCartCount());
    dispatch(getWishlistCount());
    dispatch(getUserItemCount());
  }, []);

  const renderProfile = () => {
    return (
      <View className="w-[100%] h-fit mt-2 p-2">
        <View className="items-center justify-center my-2">
          <View className="w-fit h-fit rounded-full">
            <Image
              source={{
                uri: 'https://avatars.githubusercontent.com/u/31362410?v=4',
              }}
              className="w-[130] h-[130] rounded-full"
            />
          </View>

          <View className="w-[100%] p-2 items-center justify-center mt-2">
            <Text className="text-xl font-bold">
              {data.username ? data.username : session.user.name}
            </Text>
            <Text className="text-base italic">
              {data.email ? data.email : session.user.email}
            </Text>
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
          <Text className="text-xs font-bold">ACCOUNT</Text>

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
            onPress={() => navigation.navigate(ROUTES.CHANGE_PASSWORD)}>
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
          <TouchableOpacity>
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
                  Sell
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
        </View>

        {/* Settings */}
        <View className="w-[100%] h-fit mb-2">
          <Text className="text-xs font-bold">SETTINGS</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.PROFILE_INFO)}>
            <View className="flex-row w-[100%] h-fit items-center justify-between p-2">
              <View className="flex-row items-center">
                <View className="w-[30] h-[30] items-center justify-center">
                  <Icons.FontAwesome
                    name="user"
                    size={20}
                    color={COLORS.primary}
                  />
                </View>

                <Text
                  className="text-base font-bold"
                  style={{color: COLORS.textColor}}>
                  User Details
                </Text>
              </View>

              <View>
                <Icons.FontAwesome name="angle-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.CHANGE_PASSWORD)}>
            <View className="flex-row w-[100%] h-fit items-center justify-between p-2">
              <View className="flex-row items-center">
                <View className="w-[30] h-[30] items-center justify-center">
                  <Icons.Ionicons
                    name="key-outline"
                    size={20}
                    color={COLORS.primary}
                  />
                </View>

                <Text
                  className="text-base font-bold"
                  style={{color: COLORS.textColor}}>
                  Change Password
                </Text>
              </View>

              <View>
                <Icons.FontAwesome name="angle-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onLogout()}>
            <View className="flex-row w-[100%] h-fit items-center justify-between p-2">
              <View className="flex-row items-center">
                <View className="w-[30] h-[30] items-center justify-center">
                  <Icons.MaterialIcons
                    name="logout"
                    size={20}
                    color={COLORS.primary}
                  />
                </View>

                <Text
                  className="text-base font-bold"
                  style={{color: COLORS.textColor}}>
                  Logout
                </Text>
              </View>

              <View>
                <Icons.FontAwesome name="angle-right" size={20} />
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
