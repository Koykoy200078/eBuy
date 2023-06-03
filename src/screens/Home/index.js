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

import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {productSlidesData} from '../../apps/reducers/product/productSlides';
import {productTrendingData} from '../../apps/reducers/product/productTrending';
import {productNewArrivalData} from '../../apps/reducers/product/productNewArrivals';

export default function ({navigation}) {
  const {width} = Dimensions.get('window');

  const {slidesLoading, slidesData} = useSelector(state => state.productSlides);
  const {newArrivalLoading, newArrivalData} = useSelector(
    state => state.productNewArrivals,
  );
  const {trendingLoading, trendingData} = useSelector(
    state => state.productTrending,
  );
  const [product_slug, setProductSlug] = useState(null);
  const [category_slug, setCategorySlug] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const getInfo = () => {
    dispatch(
      productDetailsData({
        category_slug: category_slug,
        product_slug: product_slug,
      }),
    );
    setProductSlug(null);
    setCategorySlug(null);
    navigation.navigate(ROUTES.PRODUCT_DETAILS);
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

    dispatch(productSlidesData());
    dispatch(productTrendingData());
    dispatch(productNewArrivalData());
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

    if (category_slug && product_slug) {
      getInfo();
    }
  }, [product_slug, category_slug]);

  return (
    <ScrollView
      className="flex-1 relative"
      style={{backgroundColor: COLORS.BGColor}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View className="flex-row justify-center items-center rounded-xl mb-2">
        <SkeletonContent
          containerStyle={{
            flex: 1,
            width: width,
            height: width / 1.8,
          }}
          isLoading={slidesLoading || (slidesData && slidesData?.status === 0)}
          layout={[
            {
              width: width - 24,
              height: width / 2,
              marginHorizontal: 10,
              marginVertical: 10,
            },
          ]}>
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
            data={slidesData?.data}
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
        </SkeletonContent>
      </View>

      <View className="px-2 mt-2 space-y-1">
        <View className="flex-row justify-between items-center">
          <Text
            className="text-2xl font-bold"
            style={{color: COLORS.textColor}}>
            Popular Items
          </Text>
        </View>

        <View style={{flexDirection: 'row', width: width, height: 185}}>
          <SkeletonContent
            containerStyle={{
              flex: 1,
              width: width,
              height: 183,
              flexDirection: 'row',
            }}
            isLoading={
              trendingLoading || (trendingData && trendingData?.status === 0)
            }
            layout={[
              {
                width: 160,
                height: 167,
                marginHorizontal: 10,
                marginVertical: 10,
                borderRadius: 6,
              },
              {
                width: 160,
                height: 167,
                marginHorizontal: 10,
                marginVertical: 10,
                borderRadius: 6,
              },
            ]}>
            <FlashList
              data={trendingData?.data}
              horizontal
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={200}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                const priceDifference =
                  item.original_price - item.selling_price;
                const percentageOff =
                  (priceDifference / item.original_price) * 100;
                const roundedPercentageOff = Math.round(percentageOff);

                return (
                  <TouchableOpacity
                    className="flex-1 my-2 items-center mx-2"
                    onPress={() => {
                      setProductSlug(item.slug);
                      setCategorySlug(item.category_slug);
                    }}>
                    <Shadow
                      distance={5}
                      startColor={COLORS.borderColor}
                      style={{
                        borderRadius: 6,
                      }}>
                      <View className="w-full h-full items-center justify-center">
                        <Image
                          className="w-[160] h-[167] rounded-md"
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
                          </View>

                          {item.quantity_status === 'Out of stock' ? (
                            <View
                              className="p-1 w-full rounded-bl-md rounded-tl-md mt-1 items-center"
                              style={{
                                backgroundColor: COLORS.error,
                              }}>
                              <Text
                                className="text-xs font-bold text-center"
                                style={{
                                  color: COLORS.textWhite,
                                }}>
                                {item.quantity_status}
                              </Text>
                            </View>
                          ) : null}
                        </View>

                        <View
                          className="h-fit"
                          style={{
                            position: 'absolute',
                            width: 160,
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
                          <Text
                            style={{color: COLORS.textWhite}}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {item.sold_quantity} Item/s Sold
                          </Text>
                        </View>
                      </View>
                    </Shadow>
                  </TouchableOpacity>
                );
              }}
            />
          </SkeletonContent>
        </View>
      </View>

      <View className="px-2 mt-2 space-y-1">
        <View className="flex-row justify-between items-center">
          <Text
            className="text-2xl font-bold"
            style={{color: COLORS.textColor}}>
            New Arrival
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.VIEWALL)}
            className="p-2 px-3 border-gray-200 rounded-full"
            style={{backgroundColor: COLORS.primary}}>
            <Text
              className="font-bold text-base"
              style={{color: COLORS.textWhite}}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', width: width, height: 185}}>
          <SkeletonContent
            containerStyle={{
              flex: 1,
              width: width,
              height: 183,
              flexDirection: 'row',
            }}
            isLoading={
              newArrivalLoading ||
              (newArrivalData && newArrivalData.status === 0)
            }
            layout={[
              {
                width: 160,
                height: 167,
                marginHorizontal: 10,
                marginVertical: 10,
                borderRadius: 6,
              },
              {
                width: 160,
                height: 167,
                marginHorizontal: 10,
                marginVertical: 10,
                borderRadius: 6,
              },
            ]}>
            <FlashList
              data={newArrivalData?.data}
              horizontal
              showsHorizontalScrollIndicator={false}
              estimatedItemSize={200}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                const priceDifference =
                  item.original_price - item.selling_price;
                const percentageOff =
                  (priceDifference / item.original_price) * 100;
                const roundedPercentageOff = Math.round(percentageOff);

                return (
                  <TouchableOpacity
                    className="flex-1 my-2 items-center mx-2"
                    onPress={() => {
                      setProductSlug(item.slug);
                      setCategorySlug(item.category_slug);
                    }}>
                    <Shadow
                      distance={5}
                      startColor={COLORS.borderColor}
                      style={{
                        borderRadius: 6,
                      }}>
                      <View className="w-full h-full items-center justify-center">
                        <Image
                          className="w-[160] h-[167] rounded-md"
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
                          </View>

                          {item.quantity_status === 'Out of stock' ? (
                            <View
                              className="p-1 w-full rounded-bl-md rounded-tl-md mt-1 items-center"
                              style={{
                                backgroundColor: COLORS.error,
                              }}>
                              <Text
                                className="text-xs font-bold text-center"
                                style={{
                                  color: COLORS.textWhite,
                                }}>
                                {item.quantity_status}
                              </Text>
                            </View>
                          ) : null}
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
          </SkeletonContent>
        </View>
      </View>
    </ScrollView>
  );
}
