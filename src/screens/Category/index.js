import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Button,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {COLORS, IMAGES, ROUTES, Search} from '../..';
import {Icons} from '../../apps/configs/icons';
import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch} from 'react-redux';
import {
  resetSelectedCategoryData,
  selectedCategoryData,
} from '../../apps/reducers/categoriesData';
import Card from '../../components/Card';
import {productSearch, resetProductSearch} from '../../apps/reducers/search';
import {Shadow} from 'react-native-shadow-2';
import {showError, showSuccess} from '../../apps/others/helperFunctions';
import {productDetailsData} from '../../apps/reducers/product/productDetails';
import {productData} from '../../apps/reducers/product/productIndex';
import {categoryData} from '../../apps/reducers/category/categories';
import {getCartCount} from '../../apps/reducers/cartCount';
import {getWishlistCount} from '../../apps/reducers/wishlistCount';
import {resetWishlistAdd, wishlistAdd} from '../../apps/reducers/wishlistAdd';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ({navigation}) {
  const getCategory = useSelector(state => state.category.categoriesData);
  const getData = useSelector(state => state.category_data.selectedData);
  const getSearchData = useSelector(state => state.search);
  const getWishlistData = useSelector(state => state.wishlistAdd.data);

  const getCategData =
    getCategory && getCategory.categories.map(index => index.id);
  const getCategDataFinal = getCategData[0];

  const [activeCategory, setActiveCategory] = useState(getCategDataFinal);
  const [slug, setSlug] = useState(null);

  const [product_slug, setProductSlug] = useState(null);
  const [category_slug, setCategorySlug] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadAll = () => {
    dispatch(productData());
    dispatch(categoryData());
    dispatch(getCartCount());
    dispatch(getWishlistCount());
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAll();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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

  // search
  const [query, setQuery] = useState(null);
  const handleSearch = () => {
    dispatch(
      productSearch({
        search: query,
      }),
    );
  };

  const getSearchLength =
    getSearchData && getSearchData?.data?.searchResults?.data.length > 0;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productCategoryName) {
      getInfo();
    }

    if (query !== null) {
      if (getSearchLength) {
        showSuccess({message: 'Product Found'});
      } else {
        showSuccess({message: 'Product Not Found'});
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
    activeCategory,
    getSearchLength,
    product_slug,
    category_slug,
    getWishlistData,
  ]);

  return (
    <View className="flex-1 relative" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex-1">
        <View className="my-10 space-y-2">
          <Text
            className="mx-4 text-5xl font-medium italic"
            style={{color: COLORS.textColor}}>
            Looking that
          </Text>
          <Text
            className="mx-4 text-5xl font-medium italic"
            style={{color: COLORS.textColor}}>
            <Text className="font-extrabold italic">fits</Text> your style
          </Text>
        </View>
        <Search
          placeholder="Type anything to search"
          value={query}
          icons={'send'}
          onChangeText={queryText => setQuery(queryText)}
          onPressButton={() => handleSearch(query)}
        />

        {getSearchLength ? (
          <>
            <View className="p-2 mt-2 items-center justify-center">
              <TouchableOpacity
                onPress={() => {
                  setQuery(null);
                  dispatch(resetProductSearch());
                }}>
                <View
                  className="w-40 h-10 rounded-md items-center justify-center"
                  style={{backgroundColor: COLORS.primary}}>
                  <Text
                    className="text-center text-base font-bold"
                    style={{color: COLORS.textWhite}}>
                    Clear Search
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <ScrollView
              className="py-2"
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {getSearchData.data.searchResults.data.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      setProductSlug(item.slug);
                      setCategorySlug(item.category_id);
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
                              className="w-[120] h-[160] rounded-l-lg"
                            />
                          </View>

                          <View className="w-[227] h-[160]">
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

                            <View className="w-full h-[70%] p-2 flex-col">
                              <View className="h-[20]" />
                              <View className="flex-row">
                                <Text
                                  className="flex-shrink font-bold text-base"
                                  style={{color: COLORS.textColor}}
                                  numberOfLines={1}
                                  ellipsizeMode="tail">
                                  {item.name}
                                </Text>
                              </View>

                              <View className="flex-row items-center justify-start">
                                <Text
                                  className="flex-shrink font-bold text-base"
                                  style={{color: COLORS.textColor}}>
                                  Brand:{' '}
                                </Text>

                                <Text
                                  className="flex-shrink text-base"
                                  style={{color: COLORS.textColor}}>
                                  {item.brand}
                                </Text>
                              </View>

                              <View className="flex-row items-center justify-start">
                                <Text
                                  className="flex-shrink font-bold text-base"
                                  style={{color: COLORS.textColor}}>
                                  Stocks:{' '}
                                </Text>

                                <Text
                                  className="flex-shrink text-base"
                                  style={{color: COLORS.textColor}}>
                                  {item.quantity
                                    ? item.quantity
                                    : 'No stocks available'}
                                </Text>
                              </View>
                            </View>

                            <View className="w-fit h-fit items-end justify-center flex-col">
                              <View className="flex-row p-1 items-center justify-center">
                                <TouchableOpacity>
                                  <View className="mx-1">
                                    {/* <Image
                                    source={IMAGES.addCart_dark}
                                    className="w-[30] h-[30]"
                                  /> */}
                                  </View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                  <View className="mx-1">
                                    {/* <Image
                                    source={IMAGES.wishList_dark}
                                    className="w-[40] h-[40]"
                                  /> */}
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
          </>
        ) : (
          <>
            <ScrollView
              className="mt-6 py-2 max-h-20"
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 20}}>
              {getCategory?.categories?.map((item, index) => {
                let isActive = activeCategory === item.id;
                let textClass = isActive
                  ? 'text-base tracking-widest text-base font-bold'
                  : 'text-base tracking-widest';

                return (
                  <Animatable.View
                    delay={index * 120}
                    animation="slideInDown"
                    key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        setActiveCategory(item.id);
                        dispatch(selectedCategoryData(item.slug));
                      }}
                      className="mr-8">
                      <Text
                        className={textClass}
                        style={{color: COLORS.textColor}}>
                        {item.name}
                      </Text>
                      {isActive ? (
                        <View className="flex-row">
                          <View
                            style={{
                              width: 50,
                              height: 2,
                              borderColor: COLORS.primary,
                              borderWidth: 2,
                            }}
                          />
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  </Animatable.View>
                );
              })}
            </ScrollView>

            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 20,
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {getData && getData.data.length > 0
                ? getData.data.map((item, index) => (
                    <Card
                      item={item}
                      index={index}
                      key={index}
                      onPressWishlist={() => {
                        dispatch(
                          wishlistAdd({
                            product_id: item.id,
                          }),
                        );
                      }}
                      onPressCart={() => {
                        setProductSlug(item.slug);
                        setCategorySlug(item.category_id);
                      }}
                    />
                  ))
                : null}
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </View>
  );
}
