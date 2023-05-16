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
import ScreenWrapper from '../../components/ScreenWraper';
import Carousel from 'react-native-reanimated-carousel';
import {
  productData,
  resetProductData,
} from '../../apps/reducers/product/productIndex';
import {useSelector, useDispatch} from 'react-redux';
import {FlashList} from '@shopify/flash-list';

import {Shadow} from 'react-native-shadow-2';

import {
  categoryData,
  resetCategoryData,
} from '../../apps/reducers/category/categories';
import {
  productDetailsData,
  resetProductDetailsData,
} from '../../apps/reducers/product/productDetails';
import {getCartCount, resetCartCount} from '../../apps/reducers/cartCount';
import {
  getWishlistCount,
  resetWishlistCount,
} from '../../apps/reducers/wishlistCount';
import {resetUserData, userData} from '../../apps/reducers/userData';
import {userLogout} from '../../apps/reducers/auth/authLogout';
import {resetLogin} from '../../apps/reducers/auth/authLogin';
import {resetRegister} from '../../apps/reducers/auth/authRegister';
import {resetSelectedCategoryData} from '../../apps/reducers/categoriesData';
import {resetUserItemCount} from '../../apps/reducers/userItemCount';
import {resetWishlistItemsShow} from '../../apps/reducers/wishlistItemShow';
import {cartData, resetCartData} from '../../apps/reducers/cartData';

export default function ({navigation}) {
  const {width} = Dimensions.get('window');
  const getIndex = useSelector(state => state.productIndex.productData);
  const getCategory = useSelector(state => state.category.categoriesData);
  const getCount = useSelector(state => state.cartCount.cart_count);

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
    dispatch(cartData());
  };

  const onLogout = () => {
    dispatch(userLogout());
    dispatch(resetLogin());
    dispatch(resetRegister());
    dispatch(resetProductData());
    dispatch(resetCategoryData());
    dispatch(resetProductDetailsData());
    dispatch(resetSelectedCategoryData());
    dispatch(resetCartCount());
    dispatch(resetWishlistCount());
    dispatch(resetUserItemCount());
    dispatch(resetWishlistItemsShow());
    dispatch(resetUserData());
    dispatch(resetCartData());
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
    <View className="flex-1 relative" style={{backgroundColor: COLORS.BGColor}}>
      <View className="flex-row justify-between items-center p-3">
        <Text
          className="text-3xl font-extrabold shadow-sm italic"
          style={COLORS.textColor}>
          eBuy
        </Text>
        <TouchableOpacity
          onPress={() => onLogout()}
          className="p-2 px-3 border border-gray-200 rounded-full"
          style={{backgroundColor: COLORS.borderColor}}>
          <Text className="font-bold" style={{color: COLORS.textColor}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

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

      <View className="px-2 space-y-2">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">New Arrival</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.VIEWALL)}
            className="p-2 px-3 border-gray-200 rounded-full"
            style={{backgroundColor: COLORS.borderColor}}>
            <Text className="font-bold" style={{color: COLORS.textColor}}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-full h-full">
          <FlashList
            data={getIndex?.new_arrival_products}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={200}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
            ListFooterComponent={
              <View className="flex-col justify-center items-center h-96" />
            }
          />
        </View>
      </View>
    </View>
  );
}
