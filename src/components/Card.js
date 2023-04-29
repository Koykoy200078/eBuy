import {View, Text, Image} from 'react-native';
import React from 'react';
import CardView from 'react-native-cardview';
import {COLORS} from '..';

export default function ({image, original_price, selling_price, itemName}) {
  return (
    <CardView
      cardElevation={7}
      cardMaxElevation={7}
      cornerRadius={5}
      cornerOverlap={false}
      className="w-[150] h-[180]"
      style={{
        backgroundColor: COLORS.secondaryBGColor,
        shadowColor: COLORS.borderColor,
      }}>
      <View className="w-[100%] h-[100%] bg-transparent">
        <Image
          className="w-[100%] h-[100%] rounded-md"
          source={{
            uri: image,
          }}
        />

        {/* top-right corner */}
        <View className="absolute top-0 right-0 items-center justify-center w-fit">
          <View
            className="p-1 w-fit rounded-bl-md"
            style={{backgroundColor: COLORS.accent}}>
            <Text
              className="text-xs line-through font-bold"
              style={{color: COLORS.textColor}}>
              ₱ {original_price}
            </Text>
          </View>

          {/* <View className="p-1 w-fit bg-blue-600 rounded-bl-md">
              <Text
                className="text-xs font-bold"
                style={{color: COLORS.textColor}}>
                ₱ {selling_price}
              </Text>
            </View> */}
        </View>
      </View>
    </CardView>
  );
}
