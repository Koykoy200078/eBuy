import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import {COLORS, IMAGES} from '..';
import {Shadow} from 'react-native-shadow-2';
import {Icons} from '../apps/configs/icons';

export default function ({item, index, onPressWishlist, onPressCart}) {
  const priceDifference = item.original_price - item.selling_price;
  const percentageOff = (priceDifference / item.original_price) * 100;
  const roundedPercentageOff = Math.round(percentageOff);

  return (
    <View className="w-52 h-[290] my-6 mr-6">
      <Shadow
        distance={5}
        startColor={COLORS.borderColor}
        style={{borderRadius: 6}}>
        <View className="flex-row justify-center">
          <Image
            source={{uri: item.image_url}}
            className="w-52 h-52 rounded-t-md"
          />
        </View>

        <View className="absolute top-0 right-0 items-center justify-center w-fit">
          <View
            className="p-1 w-fit rounded-bl-md rounded-tr-md"
            style={{backgroundColor: COLORS.accent}}>
            <Text
              className="text-base font-bold"
              style={{color: COLORS.textColor}}>
              {roundedPercentageOff}% OFF
            </Text>
          </View>
        </View>

        <View className="flex-1 px-3 py-2 space-y-1">
          <Text
            className="text-xl font-medium tracking-wider text-center"
            style={{color: COLORS.textColor}}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.name}
          </Text>

          <View className="flex-row justify-between items-center px-1">
            <Text
              className="text-base font-semibold"
              style={{color: COLORS.textColor}}>
              ₱ {item.selling_price}
            </Text>
            <View className="flex-row space-x-3">
              <TouchableOpacity onPress={onPressWishlist}>
                <View className="w-6 h-10 items-center justify-center rounded-full">
                  <Image source={IMAGES.wishlist_dark} className="w-6 h-6" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={onPressCart}>
                <View className="w-8 h-10 items-center justify-center rounded-full">
                  <Icons.Ionicons name="basket-sharp" size={30} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Shadow>
    </View>
  );
}
