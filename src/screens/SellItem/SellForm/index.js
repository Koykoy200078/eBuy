import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../..';
import {Icons} from '../../../apps/configs/icons';
import {Shadow} from 'react-native-shadow-2';

export default function ({navigation}) {
  const {width, height} = Dimensions.get('window');

  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState(null);
  const [zipCode, setZipCode] = useState(null);

  // const saveInfo = () => {
  //   dispatch(
  //     getUserUpdateData({
  //       username: fullName
  //         ? fullName
  //         : getUserDataInfo && getUserDataInfo.username,
  //       phone: phoneNumber
  //         ? phoneNumber
  //         : getUserDataInfo && getUserDataInfo.phone,
  //       pin_code: zipCode
  //         ? zipCode
  //         : getUserDataInfo && getUserDataInfo.pin_code,
  //       address: address ? address : getUserDataInfo && getUserDataInfo.address,
  //     }),
  //   );
  // };

  const resetFormFields = () => {
    setFullName(null);
    setPhoneNumber(null);
    setAddress(null);
    setZipCode(null);
  };

  const renderProfile = () => {
    return (
      <View className="w-[100%] h-fit items-center justify-center p-2">
        <View className="w-fit h-fit rounded-md">
          <Image
            source={{
              uri: 'https://avatars.githubusercontent.com/u/31362410?v=4',
            }}
            className="w-[250] h-[160] rounded-md"
            resizeMode="contain"
          />
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-[100%] h-fit items-start justify-center p-2">
          <Shadow
            distance={5}
            startColor={COLORS.borderColor}
            style={{borderRadius: 6, padding: 10}}>
            <View className="h-[65] w-[320] mb-2">
              <Text
                className="text-sm font-bold"
                style={{color: COLORS.textColor}}>
                Select Category
              </Text>
              <TextInput
                className="p-2 rounded-md border"
                style={{
                  color: COLORS.textColor,
                }}
                // onChangeText={val => setFullName(val)}
              />
            </View>

            <View className="h-[65] w-[320] mb-2">
              <Text
                className="text-sm font-bold"
                style={{color: COLORS.textColor}}>
                Product Name
              </Text>
              <TextInput
                className="p-2 rounded-md border"
                style={{
                  color: COLORS.textColor,
                }}
                // onChangeText={val => setFullName(val)}
              />
            </View>

            <View className="flex-row justify-between mb-2">
              <View className="h-[65] w-[57%] mr-1">
                <Text
                  className="text-sm font-bold"
                  style={{color: COLORS.textColor}}>
                  Product Slug
                </Text>
                <TextInput
                  className="p-2 rounded-md border"
                  style={{
                    color: COLORS.textColor,
                  }}
                />
              </View>

              <View className="h-[65] w-[40%] ml-1">
                <Text
                  className="text-sm font-bold"
                  style={{color: COLORS.textColor}}>
                  Select Brand
                </Text>
                <TextInput
                  className="p-2 rounded-md border"
                  style={{
                    color: COLORS.textColor,
                  }}
                />
              </View>
            </View>

            <View className="h-fit w-[320] mb-2">
              <Text
                className="text-sm font-bold"
                style={{color: COLORS.textColor}}>
                Small description
              </Text>
              <TextInput
                className="p-2 rounded-md border"
                style={{
                  color: COLORS.textColor,
                }}
                // onChangeText={val => setFullName(val)}
              />
            </View>

            <View className="h-fit w-[320] mb-2">
              <Text
                className="text-sm font-bold"
                style={{color: COLORS.textColor}}>
                Description
              </Text>
              <TextInput
                className="p-2 rounded-md border"
                style={{
                  color: COLORS.textColor,
                }}
                // onChangeText={val => setFullName(val)}
              />
            </View>
          </Shadow>
        </View>
      </ScrollView>
    </View>
  );
}
