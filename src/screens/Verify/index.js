import {View, Text, SafeAreaView, Image, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, IMAGES} from '../..';
import {useDispatch} from 'react-redux';
import {userLogin} from '../../apps/reducers/auth/authLogin';
import {ActivityIndicator} from 'react-native-paper';

export default function ({navigation, route}) {
  const {width} = Dimensions.get('window');
  const {email, password} = route.params;

  const dispatch = useDispatch();
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(userLogin({email: email, password: password}));
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <View className="flex-1" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex h-full items-center justify-center">
        <View className="flex-col items-center justify-center">
          <Image source={IMAGES.mail} style={{width: width, height: 350}} />
          <View className="space-y-8 p-2">
            <View className="flex-col items-center justify-center">
              <Text
                className="text-2xl font-bold text-center"
                style={{color: COLORS.textColor}}>
                Please verify your email first, we have sent you a verification
                link.
              </Text>
            </View>

            <View className="flex-col items-center justify-center">
              <ActivityIndicator
                animating={true}
                color={COLORS.primary}
                size={'small'}
              />
              <Text
                className="text-base font-bold text-center"
                style={{
                  color: COLORS.textColor,
                }}>
                {' '}
                Waiting for verification, Automatically login if verified.
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
