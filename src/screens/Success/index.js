import {View, Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, IMAGES, ROUTES} from '../..';

export default function ({navigation}) {
  return (
    <View
      className="w-[100%] h-[100%] items-center justify-center"
      style={{backgroundColor: COLORS.BGColor}}>
      <View className="h-fit w-screen">
        <Image
          source={IMAGES.success}
          className="w-[100%] h-[320]"
          resizeMode="contain"
        />

        <View className="items-center justify-center">
          <Text
            className="text-lg text-center font-bold my-3"
            style={{color: COLORS.textColor}}>
            Order placed successfully
          </Text>

          <View className="p-2">
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.TAB)}>
              <View
                className="w-[100%] rounded-md items-center justify-center p-2"
                style={{backgroundColor: COLORS.primary}}>
                <Text
                  className="text-base font-bold"
                  style={{color: COLORS.textWhite}}>
                  GO TO MAIN
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
