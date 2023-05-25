import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Shadow} from 'react-native-shadow-2';
import {COLORS, IMAGES, ROUTES} from '../..';
import {Icons} from '../../apps/configs/icons';
import {useDispatch, useSelector} from 'react-redux';
import {
  productDetailsData,
  resetProductDetailsData,
} from '../../apps/reducers/product/productDetails';
import {
  getWishlistItemsShow,
  resetWishlistItemsShow,
} from '../../apps/reducers/wishlistItemShow';

export default function ({navigation}) {
  const {width} = Dimensions.get('window');
  const getIndex = useSelector(state => state.productIndex.productData);

  const getCategory = useSelector(state => state.category.categoriesData);

  const [product_slug, setProductSlug] = useState(null);
  const [category_slug, setCategorySlug] = useState(null);

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

  useEffect(() => {
    dispatch(getWishlistItemsShow());

    if (productCategoryName) {
      getInfo();
    }
  }, [product_slug, category_slug]);

  return (
    <View className="flex-1 relative" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex-1">
        <View className="my-1 space-y-2 flex-row">
          <TouchableOpacity
            onPress={() => {
              dispatch(resetWishlistItemsShow());
              setProductSlug(null);
              setCategorySlug(null);
              navigation.goBack();
            }}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-2">
            <Icons.Ionicons
              name="arrow-undo"
              size={30}
              color={COLORS.textColor}
            />
          </TouchableOpacity>

          <Text
            className="mx-4 text-2xl font-medium italic"
            style={{color: COLORS.textColor}}>
            View All
          </Text>
        </View>

        <ScrollView className="py-2" showsVerticalScrollIndicator={false}>
          {getIndex &&
            getIndex.new_arrival_products.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setProductSlug(item.slug);
                    setCategorySlug(item.id);
                  }}>
                  <View className="p-2">
                    <Shadow
                      className="w-[346] h-[160] rounded-lg"
                      distance={5}
                      startColor={COLORS.borderColor}>
                      <View className="w-full h-fit items-center justify-start flex-row">
                        <View className="">
                          <Image
                            source={{
                              uri: item.image_url,
                            }}
                            className="w-[160] h-[160] rounded-l-lg"
                          />
                        </View>

                        <View className="w-[186] h-[160]">
                          <View className="absolute top-0 right-0 items-center justify-center w-fit">
                            <View
                              className="p-1 w-fit rounded-bl-md rounded-tr-md flex-row"
                              style={{backgroundColor: COLORS.accent}}>
                              <Text
                                className="text-base font-bold"
                                style={{color: COLORS.textColor}}>
                                ₱{' '}
                              </Text>
                              <Text
                                className="text-base font-bold"
                                style={{color: COLORS.textColor}}>
                                {item.selling_price}
                              </Text>
                            </View>
                          </View>

                          <View className="w-full h-[100%] p-2 flex-col">
                            <View className="h-[35]" />
                            <View className="flex-row items-center justify-center">
                              <Text
                                className="flex-shrink font-bold text-base"
                                style={{color: COLORS.textColor}}
                                numberOfLines={3}
                                ellipsizeMode="tail">
                                {item.name}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Shadow>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>

        <View className="absolute bottom-0 right-0 h-10" />
      </SafeAreaView>
    </View>
  );
}
