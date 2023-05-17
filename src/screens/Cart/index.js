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
import {COLORS, IMAGES} from '../..';
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
import {showError} from '../../apps/others/helperFunctions';

export default function () {
  const {cart} = useSelector(state => state.cartData.data);
  const aa = useSelector(state => state.cartIncrement.data);
  const bb = useSelector(state => state.cartDecrement.data);
  const {width} = Dimensions.get('window');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  console.log('aa ==> ', aa);
  console.log('bb ==>', bb);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(cartData());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    calculateTotalPrice();

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
  }, [selectedItems, totalPrice, aa, bb]);

  const handleCheckBox = cartItemId => {
    if (selectedItems.includes(cartItemId)) {
      setSelectedItems(prevItems => prevItems.filter(id => id !== cartItemId));
    } else {
      setSelectedItems(prevItems => [...prevItems, cartItemId]);
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
  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.store_name]) {
      acc[item.store_name] = [item];
    } else {
      acc[item.store_name].push(item);
    }
    return acc;
  }, {});

  return (
    <View className="flex-1 relative" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex-1">
        <View className="my-1 space-y-2">
          <Text
            className="mx-4 text-2xl font-medium italic"
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
                            className="ml-2 text-sm font-bold"
                            style={{color: COLORS.textColor}}>
                            {storeName}
                          </Text>
                        </View>

                        <TouchableOpacity>
                          <View className="flex justify-center items-center h-full mr-1">
                            <Text
                              className="text-sm font-bold"
                              style={{color: COLORS.textColor}}>
                              Remove
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>

                      <View className="w-12/12 h-[1] border mx-2 mb-3" />

                      {items.map(item => (
                        <View
                          key={item.cart_item_id}
                          className="flex flex-row ml-2 mt-0 mb-2 justify-start">
                          <CheckBox
                            containerStyle={{
                              marginLeft: 0,
                              marginRight: 0,
                              backgroundColor: 'transparent',
                              borderWidth: 0,
                            }}
                            checked={selectedItems.includes(item.cart_item_id)}
                            checkedColor="#1dd1a1"
                            onPress={() => handleCheckBox(item.cart_item_id)}
                          />
                          <Image
                            source={{
                              uri: item.image_url,
                            }}
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 6,
                            }}
                          />

                          <View
                            className="flex items-start ml-2 h-[70]"
                            style={{width: width / 2.1}}>
                            <View className="flex flex-col justify-center items-start w-full h-[70]">
                              <Text
                                className="text-sm text-center font-bold"
                                numberOfLines={3}
                                ellipsizeMode="tail"
                                style={{color: COLORS.textColor}}>
                                {item.product_name}
                              </Text>
                            </View>

                            <View className="w-full h-[1] border" />

                            <View className="flex flex-row items-center justify-between">
                              <View className="flex-row w-[80]">
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
                                      className="font-bold"
                                      style={{color: COLORS.textColor}}>
                                      -
                                    </Text>
                                  </View>
                                </TouchableOpacity>

                                <View className="flex justify-center items-center h-8 w-8">
                                  <Text
                                    className="font-bold"
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
                                      className="font-bold"
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
              className="text-sm font-bold"
              style={{color: COLORS.textColor}}>
              Total Price: ₱{' '}
              <Text className="text-sm font-bold text-red-600">
                {totalPrice}
              </Text>
            </Text>

            <TouchableOpacity>
              <View className="flex justify-center items-center h-10 w-24 border rounded-md">
                <Text className="font-bold" style={{color: COLORS.textColor}}>
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
