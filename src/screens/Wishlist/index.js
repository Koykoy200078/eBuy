import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
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
import {wishlistRemove} from '../../apps/reducers/wishlistRemove';
import {showError, showSuccess} from '../../apps/others/helperFunctions';
import {resetWishlistRemove} from '../../apps/reducers/wishlistRemove';

export default function ({navigation}) {
  const {width} = Dimensions.get('window');
  const getCategory = useSelector(state => state.category.categoriesData);
  const getWishlistData = useSelector(state => state.wishlistItemShow.data);
  const getData = useSelector(state => state.wishlistRemove.data);

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
    if (productCategoryName) {
      getInfo();
    }

    if (getData) {
      if (getData.message === 'Wishlist item removed successfully') {
        dispatch(getWishlistItemsShow());
        dispatch(resetWishlistRemove());
        showSuccess({
          message: 'Success',
          description: 'Wishlist item removed successfully',
        });
      } else {
        showError({
          message: 'Error',
          description: 'Something went wrong',
        });

        dispatch(getWishlistItemsShow());
        dispatch(resetWishlistRemove());
      }
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
            My Wishlist
          </Text>
        </View>

        <ScrollView className="py-2" showsVerticalScrollIndicator={false}>
          {getWishlistData &&
            getWishlistData.data.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setProductSlug(item.product.slug);
                    setCategorySlug(item.product.category.id);
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
                              uri: item.product.image_url,
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
                                {item.product.selling_price}
                              </Text>
                            </View>
                          </View>

                          <View className="w-full h-[78%] p-2 flex-col">
                            <View className="h-[20]" />
                            <View className="flex-row">
                              <Text
                                className="flex-shrink font-bold text-base"
                                style={{color: COLORS.textColor}}
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {item.product.name}
                              </Text>
                            </View>
                          </View>

                          <View className="w-fit h-fit items-end justify-center flex-col">
                            <View className="flex-row p-1 items-center justify-center">
                              <TouchableOpacity
                                onPress={() => {
                                  Alert.alert(
                                    'Remove',
                                    'Are you sure you want to remove this item from your wishlist?',
                                    [
                                      {
                                        text: 'Cancel',
                                        onPress: () => {},
                                        style: 'cancel',
                                      },
                                      {
                                        text: 'Remove',
                                        onPress: () => {
                                          dispatch(
                                            wishlistRemove({
                                              product_id: item.id,
                                            }),
                                          );

                                          dispatch(getWishlistItemsShow());
                                        },
                                      },
                                    ],
                                  );
                                }}>
                                <View className="mx-1">
                                  <Icons.Octicons
                                    name="trash"
                                    size={25}
                                    color={COLORS.primary}
                                  />
                                </View>
                              </TouchableOpacity>
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
      </SafeAreaView>
    </View>
  );
}
