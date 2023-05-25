import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  RefreshControl,
} from 'react-native';
import {COLORS, ROUTES} from '../..';
import Carousel from 'react-native-reanimated-carousel';
import {productData} from '../../apps/reducers/product/productIndex';
import {useSelector, useDispatch} from 'react-redux';
import {FlashList} from '@shopify/flash-list';

import {Shadow} from 'react-native-shadow-2';

import {categoryData} from '../../apps/reducers/category/categories';
import {productDetailsData} from '../../apps/reducers/product/productDetails';
import {getCartCount} from '../../apps/reducers/cartCount';
import {getWishlistCount} from '../../apps/reducers/wishlistCount';
import {userData, userData2} from '../../apps/reducers/userData';
import {cartData} from '../../apps/reducers/cartData';
import {myProductsData} from '../../apps/reducers/product/myProduct';
import {getOrders} from '../../apps/reducers/orders';
import {ScrollView} from 'react-native-gesture-handler';

export default function ({navigation}) {
  const {width} = Dimensions.get('window');
  const data = useSelector(state => state.userData.data2);
  const getIndex = useSelector(state => state.productIndex.productData);
  const getCategory = useSelector(state => state.category.categoriesData);

  const [product_slug, setProductSlug] = useState(null);
  const [category_slug, setCategorySlug] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const getProductCategoryName = () => {
    if (!getCategory || !Array.isArray(getCategory.categories)) {
      return null;
    }
    const category = getCategory.categories.find(c => c.id === category_slug);
    return category ? category.slug : null;
  };

  const productCategoryName = getProductCategoryName();

  const getInfo = () => {
    if (productCategoryName && product_slug) {
      dispatch(
        productDetailsData({
          category_slug: productCategoryName,
          product_slug: product_slug,
        }),
      );
      setProductSlug(null);
      setCategorySlug(null);
      navigation.navigate(ROUTES.PRODUCT_DETAILS);
    }
  };

  const loadAll = () => {
    dispatch(productData());
    dispatch(categoryData());
    dispatch(getCartCount());
    dispatch(getWishlistCount());
    dispatch(userData());
    dispatch(userData2());
    dispatch(cartData());
    dispatch(myProductsData());
    dispatch(getOrders());
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAll();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    loadAll();

    if (productCategoryName) {
      getInfo();
    }
  }, [product_slug, category_slug]);

  return (
    <ScrollView
      className="flex-1 relative"
      style={{backgroundColor: COLORS.BGColor}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View className="flex-row justify-center items-center rounded-xl mb-2">
        <Carousel
          loop
          width={width}
          height={width / 1.8}
          autoPlay={true}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.88,
            parallaxScrollingOffset: 50,
          }}
          data={getIndex?.sliders}
          scrollAnimationDuration={1000}
          renderItem={({item}) => (
            <View className="flex-1 w-[100%]">
              <Image
                source={{uri: item.image_url}}
                className="w-[100%] h-[100%] rounded-md"
              />
            </View>
          )}
        />
      </View>

      <View className="px-2 mt-2 space-y-1">
        <View className="flex-row justify-between items-center">
          <Text
            className="text-2xl font-bold italic"
            style={{color: COLORS.textColor}}>
            Popular Items
          </Text>
        </View>

        <View className="h-[168]" style={{flexDirection: 'row', width: width}}>
          <FlashList
            data={getIndex?.trending_products}
            // numColumns={2}
            horizontal
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              const priceDifference = item.original_price - item.selling_price;
              const percentageOff =
                (priceDifference / item.original_price) * 100;
              const roundedPercentageOff = Math.round(percentageOff);

              return (
                <TouchableOpacity
                  className="flex-1 mt-2 items-center mx-2"
                  onPress={() => {
                    setProductSlug(item.slug);
                    setCategorySlug(item.category_id);
                  }}>
                  <Shadow
                    distance={5}
                    startColor={COLORS.borderColor}
                    style={{
                      borderRadius: 6,
                    }}>
                    <View className="w-full h-full items-center justify-center">
                      <Image
                        className="w-[160] h-[160] rounded-md"
                        source={{
                          uri: item.image_url,
                        }}
                      />

                      <View className="absolute top-0 right-0 items-center justify-center w-[56]">
                        <View
                          className="p-1 w-full rounded-bl-md rounded-tr-md"
                          style={{backgroundColor: COLORS.accent}}>
                          <Text
                            className="text-xs font-bold"
                            style={{color: COLORS.textColor}}>
                            {roundedPercentageOff}% OFF
                          </Text>
                          <Text
                            className="text-xs font-bold"
                            style={{color: COLORS.textColor}}>
                            {item.sold_quantity} Sold
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          position: 'absolute',
                          width: 160,
                          height: 30,
                          bottom: 0,
                          padding: 5,
                          backgroundColor: 'rgba(0,0,0, 0.3)',
                          borderBottomLeftRadius: 6,
                          borderBottomRightRadius: 6,
                        }}>
                        <Text
                          style={{color: COLORS.textWhite}}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  </Shadow>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={
              <View className="flex-col justify-center items-center h-2" />
            }
          />
        </View>
      </View>

      <View className="px-2 mt-2 space-y-1">
        <View className="flex-row justify-between items-center">
          <Text
            className="text-2xl font-bold italic"
            style={{color: COLORS.textColor}}>
            New Arrival
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.VIEWALL)}
            className="p-2 px-3 border-gray-200 rounded-full"
            style={{backgroundColor: COLORS.primary}}>
            <Text className="font-bold" style={{color: COLORS.textWhite}}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View className="h-[197]" style={{width: width}}>
          <FlashList
            data={getIndex?.new_arrival_products}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              const priceDifference = item.original_price - item.selling_price;
              const percentageOff =
                (priceDifference / item.original_price) * 100;
              const roundedPercentageOff = Math.round(percentageOff);

              return (
                <TouchableOpacity
                  className="flex-1 mt-2 items-center"
                  onPress={() => {
                    setProductSlug(item.slug);
                    setCategorySlug(item.category_id);
                  }}>
                  <Shadow
                    distance={5}
                    startColor={COLORS.borderColor}
                    style={{
                      borderRadius: 6,
                    }}>
                    <View className="w-full h-full items-center justify-center">
                      <Image
                        className="w-[160] h-[160] rounded-md"
                        source={{
                          uri: item.image_url,
                        }}
                      />

                      <View className="absolute top-0 right-0 items-center justify-center w-fit">
                        <View
                          className="p-1 w-fit rounded-bl-md rounded-tr-md"
                          style={{backgroundColor: COLORS.accent}}>
                          <Text
                            className="text-xs font-bold"
                            style={{color: COLORS.textColor}}>
                            {roundedPercentageOff}% OFF
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          position: 'absolute',
                          width: 160,
                          height: 30,
                          bottom: 0,
                          padding: 5,
                          backgroundColor: 'rgba(0,0,0, 0.3)',
                          borderBottomLeftRadius: 6,
                          borderBottomRightRadius: 6,
                        }}>
                        <Text
                          style={{color: COLORS.textWhite}}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  </Shadow>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
