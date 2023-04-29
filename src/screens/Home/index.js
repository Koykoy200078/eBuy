import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import {COLORS} from '../..';
import ScreenWrapper from '../../components/ScreenWraper';
import Carousel from 'react-native-reanimated-carousel';
import {productData} from '../../apps/reducers/productIndex';
import {useSelector, useDispatch} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import CustomCard from '../../components/Card';

export default function () {
  const {width} = Dimensions.get('window');
  const getIndex = useSelector(state => state.productIndex.productData);
  const dispatch = useDispatch();

  console.log('getIndex ==> ', getIndex);
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    dispatch(productData());
  };
  return (
    <View className="flex-1" style={{backgroundColor: COLORS.BGColor}}>
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-3xl font-bold shadow-sm">eBuy</Text>
        <TouchableOpacity
          className="p-2 px-3 border border-gray-200 rounded-full"
          style={{backgroundColor: COLORS.borderColor}}>
          <Text className="font-bold" style={{color: COLORS.textColor}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center items-center rounded-xl mb-4">
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay={true}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          data={getIndex?.sliders}
          scrollAnimationDuration={1000}
          renderItem={({item}) => (
            <View className="flex-1 w-[100%]">
              <Image
                source={{uri: item.image_url}}
                className="w-[100%] h-[100%] rounded-md"
                resizeMode="contain"
              />
            </View>
          )}
        />
      </View>

      <View className="px-4 space-y-2">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">New Arrival</Text>
          <TouchableOpacity
            className="p-2 px-3 border-gray-200 rounded-full"
            style={{backgroundColor: COLORS.borderColor}}>
            <Text className="font-bold" style={{color: COLORS.textColor}}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-[350] h-[380]">
          <FlashList
            data={getIndex?.new_arrival_products}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  className="rounded-2xl mb-3 shadow-sm"
                  style={{
                    backgroundColor: COLORS.BGColor,
                    borderColor: COLORS.borderColor,
                  }}>
                  <CustomCard
                    image={item.image_url}
                    original_price={item.original_price}
                    selling_price={item.selling_price}
                    itemName={item.name}
                  />
                  <View className="items-center justify-center">
                    <Text className="text-xs font-bold">{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={<View className="h-[20]" />}
          />
        </View>
      </View>
    </View>
  );
}
