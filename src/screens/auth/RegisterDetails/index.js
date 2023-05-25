import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import {COLORS, IMAGES, ROUTES} from '../../..';
import {Icons} from '../../../apps/configs/icons';
import DropShadow from 'react-native-drop-shadow';
import {showError, showSuccess} from '../../../apps/others/helperFunctions';
import {
  resetRegister,
  userRegister,
} from '../../../apps/reducers/auth/authRegister';
import {useSelector, useDispatch} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import {Button, CheckBox} from '@rneui/themed';
import {RadioButton} from 'react-native-paper';

export default function ({navigation, route}) {
  const {width, height} = Dimensions.get('window');
  const authRegister = useSelector(state => state.authRegister.success);
  const loading = useSelector(state => state.authRegister.isLoading);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [address, setAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);

  const dispatch = useDispatch();
  // const {name, email, password} = route.params;
  let name = 'test';
  let email = '';
  let password = 'test';

  useEffect(() => {
    if (authRegister === true) {
      showSuccess({
        message: 'Successfully registered',
        description: 'Check your email for verification',
      });
      dispatch(resetRegister());
      navigation.navigate(ROUTES.LOGIN);
    }
  }, [authRegister, selectedGender]);

  const formatDate = date => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onRegister = () => {
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !phoneNumber ||
      !selectedGender
    ) {
      showError({
        message: 'Something went wrong',
        description: 'Please validate all fields',
      });
    } else {
      if (selectedGender) {
        dispatch(
          userRegister({
            name: name,
            email: email,
            password: password,
            address: address,
            phone: phoneNumber,
            birthdate: formatDate(date),
            gender: selectedGender,
          }),
        );
      } else {
        showError({
          message: 'Something went wrong',
        });
      }
    }
  };

  return (
    <View className="flex-1" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex mt-2">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            style={{backgroundColor: COLORS.primary}}>
            <Icons.Ionicons
              name="arrow-undo"
              size={24}
              color={COLORS.textWhite}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center">
          <Image
            source={IMAGES.register}
            resizeMode="contain"
            style={{width: '100%', height: 200}}
          />
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        <DropShadow
          style={{
            paddingTop: 10,
            width: '100%',
            height: '100%',
            shadowColor: COLORS.borderColor,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 5,
          }}>
          <View
            className="flex-1 px-8 pt-6"
            style={{
              backgroundColor: COLORS.BGColor,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View className="space-y-4">
              {/* Address */}
              <View className="flex-row items-center justify-center h-fit w-[100%]">
                <View className="ml-[-15] items-center">
                  <Icons.Ionicons
                    name="location-outline"
                    size={30}
                    color={COLORS.textGray}
                  />
                </View>
                <TextInput
                  className="ml-2 p-2 border-b h-[50]"
                  style={{
                    color: COLORS.textColor,
                    width: width - 100,
                  }}
                  placeholder="Address"
                  placeholderTextColor={COLORS.textColor}
                  value={address}
                  onChangeText={val => setAddress(val)}
                />
              </View>

              <View className="flex-row justify-between mb-2">
                <View className="h-fit w-[60%] mr-1">
                  <Text
                    className="text-sm font-bold"
                    style={{color: COLORS.textColor}}></Text>
                  <TextInput
                    className="p-2 rounded-md border h-[50]"
                    style={{
                      color: COLORS.textColor,
                    }}
                    placeholder="Phone Number"
                    placeholderTextColor={COLORS.textColor}
                    value={phoneNumber}
                    onChangeText={val => setPhoneNumber(val)}
                    keyboardType="numeric"
                  />
                </View>

                <View className="h-fit w-[40%] ml-1">
                  <Text
                    className="text-sm font-bold"
                    style={{color: COLORS.textColor}}>
                    Birthday
                  </Text>

                  <View className="flex-row justify-center items-center">
                    <TouchableOpacity
                      onPress={() => setOpen(true)}
                      className="p-2 rounded-md border w-full items-center justify-center h-[50]"
                      style={{
                        color: COLORS.textColor,
                      }}>
                      <Text
                        className="text-sm font-bold"
                        style={{color: COLORS.textColor}}>
                        {formatDate(date)}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <DatePicker
                    modal
                    mode="date"
                    open={open}
                    date={date}
                    locale="en_PH"
                    maximumDate={date}
                    onConfirm={date => {
                      setOpen(false);
                      setDate(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </View>
              </View>

              <View className="h-[120] w-[100%] mb-2">
                <Text className="font-bold" style={{color: COLORS.textColor}}>
                  Gender
                </Text>

                <View className="flex-col justify-between h-fit rounded-md">
                  <RadioButton.Group
                    onValueChange={value => setSelectedGender(value)}
                    value={selectedGender}>
                    <RadioButton.Item label="Male" value="male" />
                    <RadioButton.Item label="Female" value="female" />
                  </RadioButton.Group>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => onRegister()}
                className="py-3 rounded-xl"
                style={{backgroundColor: COLORS.primary}}>
                <Text
                  className="text-xl font-bold text-center"
                  style={{color: COLORS.textWhite}}>
                  {loading ? 'Loading . . .' : 'Register'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </DropShadow>
      </ScrollView>
    </View>
  );
}
