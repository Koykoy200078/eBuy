import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS, ROUTES} from '../..';
import {Icons} from '../../apps/configs/icons';
import {Shadow} from 'react-native-shadow-2';
import {CheckBox} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {userData, userData2} from '../../apps/reducers/userData';
import {checkOut, resetCheckOut} from '../../apps/reducers/checkout';

export default function ({navigation, route}) {
  const data = useSelector(state => state.userData.data2);
  const myCheckoutData = useSelector(state => state.checkout.data);
  const {totalPrice, selectedItems} = route.params;

  console.log('myCheckoutData ==> ', myCheckoutData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userData());
    dispatch(userData2());

    if (myCheckoutData && myCheckoutData.success === true) {
      navigation.navigate(ROUTES.SUCCESS);
      dispatch(resetCheckOut());
    }
  }, [myCheckoutData]);

  const confirmOrder = () => {
    if (
      data !== null &&
      data.address !== null &&
      data.email !== null &&
      data.phone !== null &&
      data.pin_code !== null &&
      data.username !== null
    ) {
      dispatch(
        checkOut({
          fullname: data.username,
          email: data.email,
          phone: data.phone,
          pincode: data.pin_code,
          address: data.address,
          payment_mode: 'Cash On Delivery',
          selectedIds: selectedItems,
        }),
      );
    }
  };
  return (
    <View className="flex-1 relative" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex-1">
        <View className="my-1 space-y-2 flex-row">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-2">
            <Icons.Ionicons
              name="arrow-undo"
              size={30}
              color={COLORS.textColor}
            />
          </TouchableOpacity>

          <Text
            className="mx-4 text-2xl font-medium italic"
            style={{color: COLORS.textColor}}>
            Checkout
          </Text>
        </View>

        <ScrollView className="py-2" showsVerticalScrollIndicator={false}>
          {/* total Amount */}
          <View className="p-2">
            <Shadow
              className="w-[346] h-[160] rounded-lg"
              distance={5}
              startColor={COLORS.borderColor}>
              <View className="flex flex-col justify-between">
                <View className="flex flex-row mt-0 item-center justify-between h-10">
                  <View className="flex flex-row ml-2 justify-start items-center">
                    <Text
                      className="text-sm font-bold"
                      style={{color: COLORS.textColor}}>
                      Total Amount
                    </Text>
                  </View>

                  <View className="flex justify-center items-center h-full mr-2">
                    <Text
                      className="text-sm font-bold"
                      style={{color: COLORS.textColor}}>
                      ₱ {totalPrice}
                    </Text>
                  </View>
                </View>

                <View className="w-12/12 h-[1] border mx-2 mb-3" />

                <View className="flex flex-col ml-2 mt-0 mb-2 justify-start">
                  <Text
                    className="text-xs font-bold"
                    style={{color: COLORS.textColor}}>
                    * Your items will be delivered within 3-5 business days.
                  </Text>
                  <Text
                    className="text-xs font-bold"
                    style={{color: COLORS.textColor}}>
                    * Tax and other charges are included in the total cost.
                  </Text>
                  <Text
                    className="text-xs font-bold"
                    style={{color: COLORS.textColor}}>
                    * You can track your order using the tracking number
                    provided in the{' '}
                    <Text className="font-extrabold">'My Order Items'</Text>{' '}
                    section of your account.
                  </Text>
                  <Text
                    className="text-xs font-bold"
                    style={{color: COLORS.textColor}}>
                    * If you have any questions or concerns, please contact our
                    customer support team.
                  </Text>
                </View>
              </View>
            </Shadow>
          </View>

          {/* payment method */}
          <View className="p-2">
            <Shadow
              className="w-[346] h-[100] rounded-lg"
              distance={5}
              startColor={COLORS.borderColor}>
              <View className="flex flex-col justify-between">
                <View className="flex flex-row mt-0 item-center justify-between h-10">
                  <View className="flex flex-row ml-2 justify-start items-center">
                    <Text
                      className="text-sm font-bold"
                      style={{color: COLORS.textColor}}>
                      Payment Method
                    </Text>
                  </View>
                </View>

                <View className="w-12/12 h-[1] border mx-2" />

                <View className="flex-row justify-between">
                  <CheckBox
                    containerStyle={{
                      marginLeft: 0,
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                    }}
                    title="Cash on Delivery"
                    checked={true}
                    // checkedIcon="dot-circle-o"
                    // uncheckedColor="circle-o"
                    checkedColor="#1dd1a1"
                    // onPress={() => setCheckCOD(true)}
                  />
                </View>
              </View>
            </Shadow>
          </View>

          {/* user Info */}
          <View className="p-2">
            <Shadow
              className="w-[346] h-fit rounded-lg"
              distance={5}
              startColor={COLORS.borderColor}>
              <View className="flex flex-col justify-between">
                <View className="flex flex-row mt-0 item-center justify-between h-10">
                  <View className="flex flex-row ml-2 justify-start items-center">
                    <Text
                      className="text-sm font-bold"
                      style={{color: COLORS.textColor}}>
                      Delivery Info
                    </Text>
                  </View>
                </View>

                <View className="w-12/12 h-[1] border mx-2 mb-2" />

                <View className="flex flex-col ml-2 mt-0 mb-2 justify-start">
                  {/* full name */}
                  <View className="flex-row p-1">
                    <View className="w-[40%]">
                      <Text
                        className="flex-shrink font-bold"
                        style={{color: COLORS.textColor}}>
                        Full Name
                      </Text>
                    </View>
                    <View className="w-[60%]">
                      <Text
                        className="flex-shrink"
                        style={{color: COLORS.textColor}}>
                        {data && data.username}
                      </Text>
                    </View>
                  </View>

                  {/* email address */}
                  <View className="flex-row p-1">
                    <View className="w-[40%]">
                      <Text
                        className="flex-shrink font-bold"
                        style={{color: COLORS.textColor}}>
                        Email Address
                      </Text>
                    </View>
                    <View className="w-[60%]">
                      <Text
                        className="flex-shrink"
                        style={{color: COLORS.textColor}}>
                        {data && data.email}
                      </Text>
                    </View>
                  </View>

                  {/* contact number */}
                  <View className="flex-row p-1">
                    <View className="w-[40%]">
                      <Text
                        className="flex-shrink font-bold"
                        style={{color: COLORS.textColor}}>
                        Contact Number
                      </Text>
                    </View>
                    <View className="w-[60%]">
                      <Text
                        className="flex-shrink"
                        style={{color: COLORS.textColor}}>
                        {data && data.phone}
                      </Text>
                    </View>
                  </View>

                  {/* address */}
                  <View className="flex-row p-1">
                    <View className="w-[40%]">
                      <Text
                        className="flex-shrink font-bold"
                        style={{color: COLORS.textColor}}>
                        Delivery Address
                      </Text>
                    </View>
                    <View className="w-[60%]">
                      <Text
                        className="flex-shrink"
                        style={{color: COLORS.textColor}}>
                        {data && data.address}
                      </Text>
                    </View>
                  </View>

                  {/* zipcode */}
                  <View className="flex-row p-1">
                    <View className="w-[40%]">
                      <Text
                        className="flex-shrink font-bold"
                        style={{color: COLORS.textColor}}>
                        Zipcode
                      </Text>
                    </View>
                    <View className="w-[60%]">
                      <Text
                        className="flex-shrink"
                        style={{color: COLORS.textColor}}>
                        {data && data.pin_code}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Shadow>
          </View>
        </ScrollView>

        <View className="p-2 mb-2">
          <TouchableOpacity onPress={() => confirmOrder()}>
            <View
              className="flex flex-row items-center h-[50] justify-center rounded-md"
              style={{backgroundColor: COLORS.primary}}>
              <Text
                className="text-base font-bold"
                style={{color: COLORS.textWhite}}>
                Confirm Order
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
