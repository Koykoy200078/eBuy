import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, IMAGES, ROUTES} from '../..';
import {useDispatch} from 'react-redux';
import {Icons} from '../../apps/configs/icons';

export default function ({navigation}) {
  const {width} = Dimensions.get('window');

  const dispatch = useDispatch();

  return (
    <View className="flex-1" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex flex-row items-star w-full border">
        <View View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-2">
            <Icons.Ionicons
              name="arrow-undo"
              size={30}
              color={COLORS.textColor}
            />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-between h-10">
          <Text className="text-2xl font-medium italic">Profile Info</Text>
        </View>
      </SafeAreaView>

      <View className="flex-1">
        <View className="flex flex-col justify-between">
          <View className="flex flex-row justify-between h-10">
            <Text className="text-2xl font-medium italic">Profile Info</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
