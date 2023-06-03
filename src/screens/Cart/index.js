import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {COLORS, IMAGES, ROUTES} from '../..';
import {CheckBox} from '@rneui/themed';
import {Shadow} from 'react-native-shadow-2';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../apps/configs/icons';
import {RefreshControl} from 'react-native-gesture-handler';
import {cartData} from '../../apps/reducers/cartData';
import {
  cartItemDataIncrement,
  resetCartItemIncrement,
} from '../../apps/reducers/cartIncrement';
import {
  cartItemDataDecrement,
  resetCartItemDecrement,
} from '../../apps/reducers/cartDecrement';
import {showError, showSuccess} from '../../apps/others/helperFunctions';
import {resetUserData, userData} from '../../apps/reducers/userData';
import {removeCart, removeCartReset} from '../../apps/reducers/cartRemove';
import {getCartCount} from '../../apps/reducers/cartCount';
import {getWishlistCount} from '../../apps/reducers/wishlistCount';

export default function ({navigation}) {
  const {cart} = useSelector(state => state.cartData.data);
  const data = useSelector(state => state.userData.data2);
  const aa = useSelector(state => state.cartIncrement.data);
  const bb = useSelector(state => state.cartDecrement.data);
  const getRemove = useSelector(state => state.cartRemove.data);
  const {width} = Dimensions.get('window');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(cartData());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    calculateTotalPrice();
    dispatch(userData());

    if (aa && aa.status === 200) {
      dispatch(cartData());
      dispatch(resetCartItemIncrement());
      dispatch(resetCartItemDecrement());
    } else if (bb && bb.status === 200) {
      dispatch(cartData());
      dispatch(resetCartItemIncrement());
      dispatch(resetCartItemDecrement());
    } else {
      dispatch(cartData());
    }

    if (getRemove && getRemove.status === 200) {
      dispatch(removeCartReset());
      showSuccess({
        message: 'Item removed from cart',
      });
    }
  }, [selectedItems, totalPrice, aa, bb, data, getRemove]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getCartCount());
      dispatch(getWishlistCount());
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const onNavigate = () => {
    if (
      data !== null &&
      data.address !== null &&
      data.email !== null &&
      data.phone !== null &&
      data.pin_code !== null &&
      data.username !== null
    ) {
      if (selectedItems.length > 0) {
        navigation.navigate(ROUTES.CHECKOUT, {
          totalPrice: totalPrice,
          selectedItems: selectedItems,
        });
      } else {
        showError({
          message: 'Something went wrong!',
          description: 'Please select items to checkout',
        });
      }
    } else {
      showError({
        message: 'Something went wrong!',
        description: 'Please complete your profile first',
      });
      dispatch(resetUserData());
    }
  };

  const handleCheckBox = cartItemId => {
    const storeName = cart.find(
      item => item.cart_item_id === cartItemId,
    )?.store_name;
    if (storeName) {
      // Clear selected items in other stores
      setSelectedItems(prevItems =>
        prevItems.filter(id => {
          const itemStoreName = cart.find(
            item => item.cart_item_id === id,
          )?.store_name;
          return itemStoreName === storeName;
        }),
      );
      // Toggle selected item
      if (selectedItems.includes(cartItemId)) {
        setSelectedItems(prevItems =>
          prevItems.filter(id => id !== cartItemId),
        );
      } else {
        setSelectedItems(prevItems => [...prevItems, cartItemId]);
      }
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    cart.forEach(item => {
      if (selectedItems.includes(item.cart_item_id)) {
        total += item.subtotal_price;
      }
    });
    setTotalPrice(total);
  };

  // Group items by store name
  function groupCartByStore(cart) {
    if (!cart) {
      return {};
    }

    const groupedCart = cart.reduce((acc, item) => {
      if (!acc[item.store_name]) {
        acc[item.store_name] = [item];
      } else {
        acc[item.store_name].push(item);
      }
      return acc;
    }, {});

    return groupedCart;
  }

  const groupedCart = groupCartByStore(cart);

  return (
    <View className="flex-1 relative" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex-1">
        <View className="my-1 space-y-2">
          <Text
            className="mx-4 text-2xl font-bold italic"
            style={{color: COLORS.textColor}}>
            My Cart
          </Text>
        </View>

        <ScrollView
          className="py-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {Object.keys(groupedCart).map(storeName => {
            const items = groupedCart[storeName];
            return (
              <View
                key={storeName}
                className="px-2 space-y-2"
                style={{width: width, marginVertical: 10}}>
                <View className="my-0">
                  <Shadow
                    distance={5}
                    startColor={COLORS.borderColor}
                    style={{
                      borderRadius: 6,
                      width: width - 20,
                    }}>
                    <View className="flex flex-col justify-between">
                      <View className="flex flex-row mt-0 item-center justify-between h-10">
                        <View className="flex flex-row ml-2 justify-start items-center">
                          <Icons.MaterialCommunityIcons
                            name="store"
                            size={30}
                            color={COLORS.primary}
                          />
                          <Text
                            className="ml-2 text-base font-bold"
                            style={{color: COLORS.textColor}}>
                            {storeName}
                          </Text>
                        </View>
                      </View>

                      <View className="w-12/12 h-[1] border mx-2 mb-2" />

                      {items.map(item => (
                        <View
                          key={item.cart_item_id}
                          className="flex flex-row ml-1 mt-0 mb-4 justify-start">
                          <View className="flex-col">
                            <CheckBox
                              containerStyle={{
                                marginLeft: 0,
                                marginRight: 0,
                                backgroundColor: 'transparent',
                                borderWidth: 0,
                              }}
                              checked={selectedItems.includes(
                                item.cart_item_id,
                              )}
                              checkedColor="#1dd1a1"
                              onPress={() => handleCheckBox(item.cart_item_id)}
                            />

                            <TouchableOpacity
                              onPress={() => {
                                Alert.alert(
                                  'Remove Item',
                                  'Are you sure you want to remove this item from cart?',
                                  [
                                    {
                                      text: 'Cancel',
                                      onPress: () =>
                                        console.log('Cancel Pressed'),
                                      style: 'cancel',
                                    },
                                    {
                                      text: 'YES',
                                      onPress: () => {
                                        dispatch(
                                          removeCart({
                                            cartId: item.cart_item_id,
                                          }),
                                        );
                                      },
                                    },
                                  ],
                                );
                              }}>
                              <View className="ml-3">
                                <Icons.Octicons
                                  name="trash"
                                  size={25}
                                  color={COLORS.primary}
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                          <View className="flex-col my-2">
                            <Image
                              source={{
                                uri: item.image_url,
                              }}
                              style={{
                                width: 120,
                                height: 120,
                                borderRadius: 6,
                              }}
                            />
                          </View>

                          <View
                            className="flex items-start ml-2 h-[70]"
                            style={{width: width / 2.4}}>
                            <View className="flex flex-col justify-center items-start w-full h-[70]">
                              <Text
                                className="text-base text-center font-bold"
                                numberOfLines={3}
                                ellipsizeMode="tail"
                                style={{color: COLORS.textColor}}>
                                {item.product_name}
                              </Text>
                            </View>

                            <Text
                              className="text-xs my-1 font-bold text-center"
                              style={{color: COLORS.textColor}}>
                              Color: {item.product_colors.color_name}
                            </Text>

                            <View className="w-full h-[1] border" />

                            <View className="flex flex-row items-center justify-between">
                              <View className="flex-row w-[60]">
                                <Text className="text-sm font-bold text-red-600">
                                  ₱ {item.selling_price}
                                </Text>
                              </View>

                              <View className="flex-row">
                                <TouchableOpacity
                                  onPress={() => {
                                    if (item.quantity === 1) {
                                      showError({
                                        message: 'Quantity Limit Reached',
                                        description:
                                          'Quantity cannot be decreased further',
                                      });
                                    } else {
                                      dispatch(
                                        cartItemDataDecrement({
                                          cartId: item.cart_item_id,
                                        }),
                                      );
                                      setSelectedItems([]);
                                    }
                                  }}>
                                  <View className="flex justify-center items-center h-8 w-8">
                                    <Text
                                      className="font-bold text-base"
                                      style={{color: COLORS.textColor}}>
                                      -
                                    </Text>
                                  </View>
                                </TouchableOpacity>

                                <View className="flex justify-center items-center h-8 w-8">
                                  <Text
                                    className="font-bold text-base"
                                    style={{color: COLORS.textColor}}>
                                    {item.quantity}
                                  </Text>
                                </View>

                                <TouchableOpacity
                                  onPress={() => {
                                    if (
                                      item.product_colors.quantity ===
                                      item.quantity
                                    ) {
                                      showError({
                                        message: 'Quantity Limit Reached',
                                        description:
                                          'Quantity cannot be increased further',
                                      });
                                    } else {
                                      dispatch(
                                        cartItemDataIncrement({
                                          cartId: item.cart_item_id,
                                        }),
                                      );
                                      setSelectedItems([]);
                                    }
                                  }}>
                                  <View className="flex justify-center items-center h-8 w-8">
                                    <Text
                                      className="font-bold text-base"
                                      style={{color: COLORS.textColor}}>
                                      +
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                  </Shadow>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View className="flex-row items-center justify-between">
          <View
            className="flex-row items-center justify-between px-2 mb-1"
            style={{width: width}}>
            <Text
              className="text-base font-bold"
              style={{color: COLORS.textColor}}>
              Total Price: ₱{' '}
              <Text className="text-base font-bold text-red-600">
                {totalPrice}
              </Text>
            </Text>

            <TouchableOpacity onPress={() => onNavigate()}>
              <View
                className="flex justify-center items-center h-12 w-32 rounded-md"
                style={{backgroundColor: COLORS.primary}}>
                <Text
                  className="font-bold text-xl text-center"
                  style={{color: COLORS.textWhite}}>
                  Checkout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
