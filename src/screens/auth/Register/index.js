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
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
            }}>
            <View className="form space-y-2">
              <View className="h-fit w-[100%]">
                <Text
                  className="text-sm font-bold"
                  style={{color: COLORS.textColor}}>
                  Name
                </Text>
                <TextInput
                  className="p-2 rounded-md border h-[50]"
                  style={{
                    color: COLORS.textColor,
                  }}
                  placeholder="Enter your name"
                  value={name}
                  onChangeText={val => setName(val)}
                />
              </View>

              <View className="h-fit w-[100%]">
                <Text
                  className="text-sm font-bold"
                  style={{color: COLORS.textColor}}>
                  Email Address
                </Text>
                <TextInput
                  className="p-2 rounded-md border h-[50]"
                  style={{
                    color: COLORS.textColor,
                  }}
                  placeholder="Enter your email address"
                  value={email}
                  onChangeText={val => setEmail(val)}
                />
              </View>

              <View className="h-fit w-[100%]">
                <Text
                  className="text-sm font-bold"
                  style={{color: COLORS.textColor}}>
                  Password
                </Text>
                <View className="flex-row items-center">
                  <View className="w-[250]">
                    <TextInput
                      className="p-2 rounded-md border h-[50]"
                      style={{
                        color: COLORS.textColor,
                      }}
                      placeholder="Enter your password"
                      value={password}
                      onChangeText={val => setPassword(val)}
                      secureTextEntry={!showPassword}
                    />
                  </View>

                  <View className="mx-4">
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                      <Icons.Feather
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={24}
                        color={COLORS.textColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View className="h-fit w-[100%]">
                <Text
                  className="text-sm font-bold"
                  style={{color: COLORS.textColor}}>
                  Confirm Password
                </Text>
                <View className="flex-row items-center">
                  <View className="w-[250]">
                    <TextInput
                      className="p-2 rounded-md border h-[50]"
                      style={{
                        color: COLORS.textColor,
                      }}
                      onChangeText={val => setConfirmPassword(val)}
                      secureTextEntry={!showPassword}
                      placeholder="Confirm your password"
                    />
                  </View>

                  <View className="mx-4">
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                      <Icons.Feather
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={24}
                        color={COLORS.textColor}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View className="mt-4">
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
