import {View, Text, SafeAreaView, Image, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, IMAGES} from '../..';
import {useDispatch} from 'react-redux';
import {userLogin} from '../../apps/reducers/auth/authLogin';

export default function ({navigation, route}) {
  const {width} = Dimensions.get('window');
  const {email, password} = route.params;

  console.log('params ==> ', email, password);

  const dispatch = useDispatch();
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(userLogin({email: email, password: password}));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <View className="flex-1" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex h-full items-center justify-center">
        <View className="flex-col items-center justify-center">
          <Image source={IMAGES.mail} style={{width: width, height: 350}} />
          <View className="p-2">
            <Text className="text-2xl font-bold text-center">
              Please verify your email first, we have sent you a verification
              link.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
