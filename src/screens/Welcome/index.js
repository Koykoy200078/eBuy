import React, {useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {COLORS, IMAGES, ROUTES} from '../..';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ({navigation}) {
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@key_welcome', value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@key_welcome');
        if (value !== null) {
          navigation.navigate(ROUTES.LOGIN);
        }
      } catch (e) {
        // error reading value
        console.log(e);
      }
    };

    getData();
  }, []);

  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: COLORS.BGColor}}>
      <View className="flex-1 flex justify-around my-4">
        <Text
          className="font-bold text-4xl text-center"
          style={{color: COLORS.textColor}}>
          Let's Get Started!
        </Text>

        <View className="flex-row justify-center">
          <Image source={IMAGES.welcome} style={{width: 350, height: 350}} />
        </View>

        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.REGISTER)}
            className="py-3 mx-7 rounded-xl"
            style={{backgroundColor: COLORS.primary}}>
            <Text
              className="text-xl font-bold text-center"
              style={{color: COLORS.textWhite}}>
              Register
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-base" style={{color: COLORS.textColor}}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ROUTES.LOGIN), storeData('success');
              }}>
              <Text
                className="font-bold text-base"
                style={{color: COLORS.textColor}}>
                {'   '}
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center">
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://ebuy.soon.it/about-us');
              }}>
              <Text
                className="font-bold text-base"
                style={{color: COLORS.textColor}}>
                About Us
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
