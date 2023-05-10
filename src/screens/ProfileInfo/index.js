import React, {useEffect, useState} from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../../apps/configs/icons';
import {COLORS} from '../..';
import {
  getUserUpdateData,
  resetUserUpdateData,
} from '../../apps/reducers/userUpdateData';
import {showError, showSuccess} from '../../apps/others/helperFunctions';
import {userData} from '../../apps/reducers/userData';

export default function ({navigation}) {
  const data = useSelector(state => state.userData.data2);
  const updateUser = useSelector(state => state.userUpdateData.data);

  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(null);
  const [storeName, setStoreName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState(null);
  const [zipCode, setZipCode] = useState(null);

  console.log('data ===> ', fullName, phoneNumber, address, zipCode, storeName);
  const saveInfo = () => {
    dispatch(
      getUserUpdateData({
        username: fullName ? fullName : data && data.username,
        storename: storeName ? storeName : data && data.storename,
        phone: phoneNumber ? phoneNumber : data && data.phone,
        pin_code: zipCode ? zipCode : data && data.pin_code,
        address: address ? address : data && data.address,
      }),
    );
  };

  const resetFormFields = () => {
    setFullName(null);
    setPhoneNumber(null);
    setAddress(null);
    setZipCode(null);
    setStoreName(null);
  };

  useEffect(() => {
    dispatch(userData());

    if (updateUser) {
      const {message} = updateUser;
      switch (message) {
        case 'User Profile Updated':
          showSuccess({
            message: message,
          });
          break;
        case message.pin_code:
          showError({
            message: message.pin_code,
          });
          break;
        default:
          showError({
            message: 'Something went wrong',
            description: 'Please try again',
          });
      }
      dispatch(resetUserUpdateData());
      resetFormFields();
    }
  }, [updateUser]);

  const renderProfile = () => {
    return (
      <View className="w-[100%] h-fit items-center justify-center p-2">
        <View className="w-fit h-fit rounded-full">
          <Image
            source={{
              uri: 'https://avatars.githubusercontent.com/u/31362410?v=4',
            }}
            className="w-[130] h-[130] rounded-full"
          />
        </View>
      </View>
    );
  };

  const renderInfo = () => {
    return (
      <View className="w-[100%] h-fit items-start justify-center p-2">
        <View className="h-[65] w-[100%] mb-2">
          <Text className="text-sm font-bold" style={{color: COLORS.textColor}}>
            Full Name
          </Text>
          <TextInput
            className="p-2 rounded-md border"
            style={{
              color: COLORS.textColor,
            }}
            placeholder={data ? data.username : 'Enter your full name'}
            value={fullName}
            onChangeText={val => setFullName(val)}
          />
        </View>

        <View className="h-[65] w-[100%] mb-2">
          <Text className="text-sm font-bold" style={{color: COLORS.textColor}}>
            Store Name
          </Text>
          <TextInput
            className="p-2 rounded-md border"
            style={{
              color: COLORS.textColor,
            }}
            placeholder={data ? data.storename : 'Enter your store name'}
            value={storeName}
            onChangeText={val => setStoreName(val)}
          />
        </View>

        <View className="h-[65] w-[100%] mb-2">
          <Text className="text-sm font-bold" style={{color: COLORS.textColor}}>
            Email Address
          </Text>
          <TextInput
            className="p-2 rounded-md border"
            style={{
              backgroundColor: COLORS.borderColor,
              color: COLORS.textColor,
            }}
            value={data ? data.email : ''}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>

        <View className="flex-row justify-between mb-2">
          <View className="h-[65] w-[57%] mr-1">
            <Text
              className="text-sm font-bold"
              style={{color: COLORS.textColor}}>
              Phone Number
            </Text>
            <TextInput
              className="p-2 rounded-md border"
              style={{
                color: COLORS.textColor,
              }}
              placeholder={data ? data.phone : 'Enter your phone number'}
              value={phoneNumber}
              onChangeText={val => setPhoneNumber(val)}
              keyboardType="numeric"
            />
          </View>

          <View className="h-[65] w-[40%] ml-1">
            <Text
              className="text-sm font-bold"
              style={{color: COLORS.textColor}}>
              Zipcode
            </Text>
            <TextInput
              className="p-2 rounded-md border"
              style={{
                color: COLORS.textColor,
              }}
              placeholder={data ? data.pin_code : 'Enter your zipCode'}
              value={zipCode}
              onChangeText={val => setZipCode(val)}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View className="h-[65] w-[100%] mb-2">
          <Text className="text-sm font-bold" style={{color: COLORS.textColor}}>
            Delivery Address
          </Text>
          <TextInput
            className="p-2 rounded-md border"
            style={{
              color: COLORS.textColor,
            }}
            placeholder={data ? data.address : 'Enter your Delivery Address'}
            value={address}
            onChangeText={val => setAddress(val)}
          />
        </View>

        <View className="h-[65] w-[100%] mt-2">
          <TouchableOpacity onPress={() => saveInfo()}>
            <View className="flex-row h-fit items-center justify-center p-2 border rounded">
              <View className="w-[30] h-[30] items-center justify-center">
                <Icons.MaterialIcons
                  name="save"
                  size={20}
                  color={COLORS.primary}
                />
              </View>

              <Text
                className="text-base font-bold"
                style={{color: COLORS.textColor}}>
                Save
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View className="flex-1" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex flex-row justify-between w-full">
        <View View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => {
              dispatch(resetUserUpdateData());
              resetFormFields();
              navigation.goBack();
            }}
            className="p-2 rounded-tr-2xl rounded-bl-2xl">
            <Icons.Ionicons
              name="arrow-undo"
              size={30}
              color={COLORS.textColor}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {renderProfile()}
      {renderInfo()}
    </View>
  );
}
