import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {COLORS, IMAGES, ROUTES} from '../../..';
import {Icons} from '../../../apps/configs/icons';
import DropShadow from 'react-native-drop-shadow';
import {showError} from '../../../apps/others/helperFunctions';
import {useSelector, useDispatch} from 'react-redux';
import {userLogin} from '../../../apps/reducers/authLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ({navigation}) {
  const loading = useSelector(state => state.authLogin.isLoading);
  const {width, height} = Dimensions.get('window');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();

  console.log('success ==> ', success);
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@key_welcome');
        if (value !== null) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      } catch (e) {
        // error reading value
        console.log(e);
      }
    };

    getData();
  }, [success, email, password]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = () => {
    if (!email || !password) {
      showError({
        message: 'Something went wrong',
        description: 'Please enter email and password',
      });
    } else {
      dispatch(userLogin({email, password}));
    }
  };
  return (
    <View className="flex-1" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex">
        {!success ? (
          <View View className="flex-row justify-start">
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
        ) : null}

        <View className="flex-row justify-center">
          <Image source={IMAGES.login} style={{width: 200, height: 200}} />
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
              <Text
                className="ml-4 font-bold"
                style={{color: COLORS.textColor}}>
                Email Address
              </Text>
              <TextInput
                className="p-4 rounded-2xl mb-3"
                onChangeText={val => setEmail(val)}
                style={{
                  backgroundColor: COLORS.borderColor,
                  color: COLORS.textColor,
                }}
                placeholder="Enter your email address"
              />

              <Text
                className="ml-4 font-bold"
                style={{color: COLORS.textColor}}>
                Password
              </Text>
              <View className="flex-row items-center">
                <TextInput
                  className="flex-1 p-4 rounded-2xl"
                  style={{
                    backgroundColor: COLORS.borderColor,
                    color: COLORS.textColor,
                  }}
                  onChangeText={val => setPassword(val)}
                  secureTextEntry={!showPassword}
                  placeholder="Enter your password"
                />

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

              <TouchableOpacity className="flex items-end mb-4">
                <Text className="font-bold" style={{color: COLORS.textColor}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onLogin()}
                className="py-3 rounded-xl"
                style={{backgroundColor: COLORS.primary}}>
                <Text
                  className="text-xl font-bold text-center"
                  style={{color: COLORS.textWhite}}>
                  {loading ? 'Loading . . .' : 'Login'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              className="text-base font-bold text-center py-3"
              style={{color: COLORS.textColor}}>
              OR
            </Text>
            <View className="flex-row justify-center space-x-12">
              <TouchableOpacity
                className="p-2 rounded-2xl"
                style={{backgroundColor: COLORS.borderColor}}>
                <Image source={IMAGES.google} className="w-8 h-8" />
              </TouchableOpacity>

              <TouchableOpacity
                className="p-2 rounded-2xl"
                style={{backgroundColor: COLORS.borderColor}}>
                <Image source={IMAGES.facebook} className="w-8 h-8" />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-4">
              <Text className="font-semibold" style={{color: COLORS.textColor}}>
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.REGISTER)}>
                <Text
                  className="font-semibold"
                  style={{color: COLORS.textColor}}>
                  {'   '}
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </DropShadow>
      </ScrollView>
    </View>
  );
}
