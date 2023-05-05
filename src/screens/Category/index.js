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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, IMAGES, Search} from '../..';
import {Icons} from '../../apps/configs/icons';
import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch} from 'react-redux';
import {selectedCategoryData} from '../../apps/reducers/categoriesData';
import Card from '../../components/Card';
import {productSearch, resetProductSearch} from '../../apps/reducers/search';
import {Shadow} from 'react-native-shadow-2';
import {showSuccess} from '../../apps/others/helperFunctions';

export default function () {
  const getCategory = useSelector(state => state.category.categoriesData);
  const getData = useSelector(state => state.category_data.selectedData);
  const getSearchData = useSelector(state => state.search);

  const getCategData =
    getCategory && getCategory.categories.map(index => index.id);
  const getCategDataFinal = getCategData[0];

  const [activeCategory, setActiveCategory] = useState(getCategDataFinal);
  const [slug, setSlug] = useState(null);

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

  // selectedData
  const dispatch = useDispatch();

  useEffect(() => {
    if (query !== null) {
      if (getSearchLength) {
        showSuccess({message: 'Product Found'});
      } else {
        showSuccess({message: 'Product Not Found'});
      }
    }
  }, [activeCategory, getSearchLength]);

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

            <ScrollView className="py-2" showsVerticalScrollIndicator={false}>
              {getSearchData.data.searchResults.data.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      // setProductSlug(item.slug);
                      // setCategorySlug(item.category_id);
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

                          <View className="w-[217] h-[160]">
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
                                  {item.quantity}
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
                  ? 'text-base tracking-widest font-bold'
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
              showsHorizontalScrollIndicator={false}>
              {getData && getData.data.length > 0
                ? getData.data.map((item, index) => (
                    <Card item={item} index={index} key={index} />
                  ))
                : null}
            </ScrollView>
          </>
        )}
      </SafeAreaView>
    </View>
  );
}
