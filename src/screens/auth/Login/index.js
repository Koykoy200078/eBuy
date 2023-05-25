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
import {resetLogin, userLogin} from '../../../apps/reducers/auth/authLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';
import ModalPopup from '../../../apps/others/modalPopup';

export default function ({navigation}) {
  const loading = useSelector(state => state.authLogin.isLoading);
  const {errorMsg} = useSelector(state => state.authLogin);
  const {width, height} = Dimensions.get('window');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [openGoogle, setOpenGoogle] = useState(false);
  const [data, setData] = useState('');

  const handleMessage = event => {
    const message = event.nativeEvent.data;
    setData(message);
  };
  console.log('data ==> ', data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetLogin());

    if (
      errorMsg?.errors.email ===
      'Please verify your email first, we have sent you a verification email'
    ) {
      navigation.navigate(ROUTES.VERIFY, {email: email, password: password});
      dispatch(resetLogin());
    }

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
  }, [errorMsg, success, email, password, openGoogle, data]);

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

  function view001(openGoogle) {
    return (
      <ModalPopup visible={openGoogle} modalStyle="w-[90%] h-[80%] rounded">
        <View className="h-full w-full">
          <View className="flex-row w-fit h-[30] mx-[5] items-center justify-between border-b">
            <Text
              className="text-xs font-bold w-fit text-black"
              numberOfLines={1}
              ellipsizeMode="tail">
              Sign in with Google
            </Text>
            <View className="justify-between items-end">
              <TouchableOpacity
                onPress={() => {
                  setOpenGoogle(false);
                }}>
                <Icons.FontAwesome5 name="times" size={23} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-full h-full">
            <WebView
              userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50"
              source={{uri: 'https://ebuy.soon.it/auth/google/redirect'}}
              showsVerticalScrollIndicator={false}
              onMessage={handleMessage}
              javaScriptEnabled={true}
              thirdPartyCookiesEnabled={true}
            />
          </View>
        </View>
      </ModalPopup>
    );
  }

  return (
    <View className="flex-1" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex mt-4">
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

      {view001(openGoogle, setOpenGoogle)}

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
                  placeholder="Enter your email address"
                  placeholderTextColor={COLORS.textColor}
                  value={email}
                  onChangeText={val => setEmail(val)}
                />
              </View>

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
                  placeholder="Enter your password"
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

              <TouchableOpacity className="flex items-end mb-4">
                <Text className="font-bold" style={{color: COLORS.textColor}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-4">
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
            <View className="flex-row justify-center">
              <TouchableOpacity
                className="p-2 rounded-2xl flex-row items-center border"
                onPress={() => setOpenGoogle(true)}>
                <Image source={IMAGES.google} className="w-8 h-8" />
                <Text
                  className="text-base font-bold text-center py-3"
                  style={{color: COLORS.textColor}}>
                  Google
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-8">
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
