import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, IMAGES} from '../..';
import {CheckBox} from '@rneui/themed';
import {Shadow} from 'react-native-shadow-2';
import {useSelector} from 'react-redux';
import {Icons} from '../../apps/configs/icons';

export default function () {
  const {cart} = useSelector(state => state.cartData.data);
  const {width} = Dimensions.get('window');
  const [checkItem, setCheckItem] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const aa = cart.map(item => {
    return item.items.map(items => {
      return items;
    });
  });
  console.log('aa ==> ', aa);
  console.log('totalPrice ==> ', totalPrice);

  useEffect(() => {
    // Calculate total price of selected items
    let price = 0;
    // aa.forEach(item => {
    //   if (selectedIds.includes(item.id)) {
    //     price += item.product_price * item.quantity;
    //   }
    // });
    // setTotalPrice(price);
  }, [selectedIds, totalPrice, checkItem]);

  const handleCheckBox = id => {
    let ids = [...selectedIds];
    if (ids.includes(id)) {
      ids = ids.filter(item => item !== id);
    } else {
      ids.push(id);
    }
    setSelectedIds(ids);
  };

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

        <ScrollView className="py-1" showsVerticalScrollIndicator={false}>
          {cart.map(item => {
            return (
              <View
                key={item.product_user_id}
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
                            {item.storename}
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

                      {item.items.map(items => {
                        return (
                          <View
                            key={items.id}
                            className="flex flex-row ml-2 mt-0 mb-2 justify-start">
                            <CheckBox
                              containerStyle={{
                                marginLeft: 0,
                                marginRight: 0,
                                backgroundColor: 'transparent',
                                borderWidth: 0,
                              }}
                              // checked={checkItem}
                              checked={selectedIds.includes(item.cart_id)}
                              checkedColor="#1dd1a1"
                              onPress={() => handleCheckBox(items.id)}
                            />
                            <Image
                              source={{
                                uri: items.image_url,
                              }}
                              style={{width: 100, height: 100, borderRadius: 6}}
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
                                  {items.item_name}
                                </Text>
                              </View>

                              <View className="w-full h-[1] border" />

                              <View className="flex flex-row items-center justify-between">
                                <View className="flex-row w-[80]">
                                  <Text className="text-sm font-bold text-red-600">
                                    ₱ {items.product.selling_price}
                                  </Text>
                                </View>

                                <View className="flex-row">
                                  <TouchableOpacity>
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
                                      {items.quantity}
                                    </Text>
                                  </View>

                                  <TouchableOpacity>
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
                        );
                      })}
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
                {/* {totalPrice} */}
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
