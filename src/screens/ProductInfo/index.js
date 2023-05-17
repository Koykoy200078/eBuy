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
import {Icons} from '../../apps/configs/icons';
import {useSelector, useDispatch} from 'react-redux';
import {resetProductDetailsData} from '../../apps/reducers/product/productDetails';
import {showError, showSuccess} from '../../apps/others/helperFunctions';
import {addToCart, resetAddToCart} from '../../apps/reducers/cartAddItem';
import {getCartCount} from '../../apps/reducers/cartCount';
import {resetWishlistAdd, wishlistAdd} from '../../apps/reducers/wishlistAdd';

export default function ({navigation}) {
  const {width} = Dimensions.get('window');
  const getDetails = useSelector(state => state.productDetails.productDetails);
  const getCount = useSelector(state => state.cartCount.cart_count);
  const getCartData = useSelector(state => state.cartAddItem.data);
  const getWishlistData = useSelector(state => state.wishlistAdd.data);

  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedColorName, setSelectedColorName] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch();
  const APImessage = getCartData?.message;

  const addItem = () => {
    if (!selectedColorId) {
      showError({
        message: 'Item color is required',
        description: 'Please select a color',
      });
      setIsSuccess(false);
    } else {
      dispatch(
        addToCart({
          product_id: getDetails && getDetails.product.id,
          product_color_id: selectedColorId,
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(getCartCount());
    if (isSuccess) {
      dispatch(resetAddToCart());
    }

    if (getCartData) {
      if (APImessage === 'Product Added to Cart') {
        setIsSuccess(true);
        showSuccess({
          message: 'Success',
        });
      } else if (APImessage === 'Product Already Added') {
        showError({
          message: 'Error',
          description: 'Product already added to cart',
        });
        setIsSuccess(false);
        dispatch(resetAddToCart());
      } else if (APImessage === 'Product color does not exist') {
        showError({
          message: 'Error',
          description: 'Product color does not exist',
        });
        setIsSuccess(false);
        dispatch(resetAddToCart());
      }
    }

    if (getWishlistData) {
      if (getWishlistData.message === 'Wishlist added successfully') {
        showSuccess({
          message: 'Success',
          description: 'Product added to wishlist',
        });
        dispatch(resetWishlistAdd());
      } else if (getWishlistData.message === 'Already added to wishlist') {
        showError({
          message: 'Error',
          description: 'Product already added to wishlist',
        });
        dispatch(resetWishlistAdd());
      } else if (
        getWishlistData.message === 'You cannot buy your own product'
      ) {
        showError({
          message: 'Error',
          description: 'You cannot add to wishlist your own product',
        });
        dispatch(resetWishlistAdd());
      } else {
        showError({
          message: 'Error',
          description: 'Something went wrong',
        });
        dispatch(resetWishlistAdd());
      }
    }
  }, [
    getCartData,
    isSuccess,
    APImessage,
    selectedColorId,
    selectedColorName,
    getWishlistData,
    getDetails,
  ]);

  const defaultBorderStyle = {borderWidth: 1, borderColor: '#000'};
  const greenBorderStyle = {borderWidth: 2, borderColor: '#0f0'};

  return (
    <View className="flex-1" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex flex-row justify-between w-full mt-2">
        <View View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => {
              dispatch(resetProductDetailsData());
              dispatch(resetAddToCart());
              dispatch(resetWishlistAdd());
              setSelectedColorId(null);
              setSelectedColorName(null);
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

        <View className="relative">
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.CART)}
            style={{padding: 8}}>
            <Icons.Ionicons
              name="basket-sharp"
              size={30}
              color={COLORS.textColor}
            />
          </TouchableOpacity>
          <View className="absolute top-0 right-0 bg-red-600 rounded-full w-4 h-4 items-center justify-center">
            <Text style={{color: 'white', fontSize: 10}}>
              {getCount && getCount.cart_count}
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <View className="flex items-center">
        <Image
          source={
            getDetails && getDetails.image_url
              ? {uri: getDetails.image_url}
              : IMAGES.loading
          }
          style={{width: width, height: width / 1.2}}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-col justify-between items-start px-2 mt-2 space-y-3">
          <View className="flex">
            <Text
              className="text-2xl font-bold text-center"
              style={{color: COLORS.textColor}}>
              {getDetails && getDetails.product
                ? getDetails.product.name
                : 'Loading . . .'}
            </Text>
          </View>

          <View>
            <View className="flex-row">
              <Text
                className="text-xl font-bold"
                style={{color: COLORS.textColor}}>
                ₱{' '}
                {getDetails &&
                  getDetails.product &&
                  getDetails.product.selling_price}{' '}
              </Text>
              <Text className="line-through text-sm">
                ₱{' '}
                {getDetails &&
                  getDetails.product &&
                  getDetails.product.original_price}
              </Text>
            </View>

            <Text
              className="text-xs font-medium"
              style={{color: COLORS.textColor}}>
              Tax included
            </Text>
          </View>

          <View>
            <View>
              <Text
                className="text-xl font-extrabold"
                style={{color: COLORS.textColor}}>
                COLOR: {selectedColorName}
              </Text>
            </View>

            <View className="flex-row space-x-3">
              {getDetails &&
                getDetails.product_colors &&
                getDetails.product_colors.map(item => {
                  const borderStyle =
                    item.product_color_id === selectedColorId
                      ? greenBorderStyle
                      : defaultBorderStyle;

                  return (
                    <TouchableOpacity
                      key={item.product_color_id}
                      onPress={() => {
                        setSelectedColorId(item.product_color_id);
                        setSelectedColorName(item.color_name);
                      }}>
                      <View
                        className="w-8 h-8 rounded-full"
                        style={[
                          borderStyle,
                          {
                            backgroundColor: item.color_code,
                          },
                        ]}>
                        <Text className="hidden">1</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>

          <View>
            <View>
              <Text
                className="text-xl font-extrabold"
                style={{color: COLORS.textColor}}>
                Description
              </Text>
            </View>

            <View>
              <Text className="text-sm" style={{color: COLORS.textColor}}>
                {getDetails &&
                  getDetails.product &&
                  getDetails.product.description}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="flex-row items-center justify-between px-2 my-2">
        <View className="w-2/12">
          <TouchableOpacity
            onPress={() =>
              dispatch(
                wishlistAdd({
                  product_id: getDetails && getDetails.product.id,
                }),
              )
            }>
            <View
              className="px-3 justify-center items-center w-[100%] h-12 rounded-md"
              style={{backgroundColor: COLORS.primary}}>
              <Image source={IMAGES.wishlist_light} className="w-[30] h-8" />
            </View>
          </TouchableOpacity>
        </View>

        <View className="w-10/12 px-3">
          <TouchableOpacity onPress={() => addItem()}>
            <View
              className="flex-row justify-center items-center w-[100%] h-12 rounded-md"
              style={{backgroundColor: COLORS.primary}}>
              <Text
                className="text-xl font-bold"
                style={{color: COLORS.textWhite}}>
                Add to Cart
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
