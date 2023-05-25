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

export default function ({navigation}) {
  const {width, height} = Dimensions.get('window');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      showError({
        message: 'Something went wrong',
        description: 'Please validate all fields',
      });
    } else {
      if (password === confirmPassword) {
        navigation.navigate(ROUTES.REGISTER_DETAILS, {
          name: name,
          email: email,
          password: password,
        });
      } else {
        showError({
          message: 'Something went wrong',
          description: 'Password and confirm password does not match',
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
              {/* user */}
              <View className="flex-row items-center justify-center h-fit w-[100%]">
                <View className="ml-[-15] items-center">
                  <Icons.Feather
                    name="user"
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
                  placeholder="Full Name"
                  placeholderTextColor={COLORS.textColor}
                  value={name}
                  onChangeText={val => setName(val)}
                />
              </View>

              {/* email */}
              <View className="flex-row items-center justify-center h-fit w-[100%]">
                <View className="ml-[-15] items-center">
                  <Icons.Ionicons name="at" size={30} color={COLORS.textGray} />
                </View>
                <TextInput
                  className="ml-2 p-2 border-b h-[50]"
                  style={{
                    color: COLORS.textColor,
                    width: width - 100,
                  }}
                  placeholder="Email Address"
                  placeholderTextColor={COLORS.textColor}
                  value={email}
                  onChangeText={val => setEmail(val)}
                />
              </View>

              {/* password */}
              <View className="flex-row items-center justify-center h-fit w-[100%]">
                <View className="ml-[-15] items-center">
                  <Icons.Ionicons
                    name="key"
                    size={30}
                    color={COLORS.textGray}
                  />
                </View>

                <TextInput
                  className="ml-2 p-2 border-b h-[50]"
                  style={{
                    color: COLORS.textColor,
                    width: width - 130,
                  }}
                  placeholder="Password"
                  placeholderTextColor={COLORS.textColor}
                  value={password}
                  onChangeText={val => setPassword(val)}
                  secureTextEntry={!showPassword}
                />

                <View className="mx-1">
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Icons.Feather
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={24}
                      color={COLORS.textGray}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* confirm password */}
              <View className="flex-row items-center justify-center h-fit w-[100%]">
                <View className="ml-[-15] items-center">
                  <Icons.Ionicons
                    name="key"
                    size={30}
                    color={COLORS.textGray}
                  />
                </View>

                <TextInput
                  className="ml-2 p-2 border-b h-[50]"
                  style={{
                    color: COLORS.textColor,
                    width: width - 130,
                  }}
                  placeholder="Confirm Password"
                  placeholderTextColor={COLORS.textColor}
                  value={confirmPassword}
                  onChangeText={val => setConfirmPassword(val)}
                  secureTextEntry={!showPassword}
                />

                <View className="mx-1">
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Icons.Feather
                      name={showPassword ? 'eye' : 'eye-off'}
                      size={24}
                      color={COLORS.textGray}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="mt-10">
              <TouchableOpacity
                onPress={() => onRegister()}
                className="py-3 rounded-xl"
                style={{backgroundColor: COLORS.primary}}>
                <Text
                  className="text-xl font-bold text-center"
                  style={{color: COLORS.textWhite}}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </DropShadow>
      </ScrollView>
    </View>
  );
}
