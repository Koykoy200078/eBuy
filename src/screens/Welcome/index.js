import React from 'react';
import {SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, IMAGES, ROUTES} from '../..';

export default function ({navigation}) {
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
            <Text className="font-semibold" style={{color: COLORS.textColor}}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN)}>
              <Text className="font-semibold" style={{color: COLORS.textColor}}>
                {'   '}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
