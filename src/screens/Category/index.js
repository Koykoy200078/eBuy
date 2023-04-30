import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../..';
import {Icons} from '../../apps/configs/icons';
import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch} from 'react-redux';
import {selectedCategoryData} from '../../apps/reducers/categoriesData';
import Card from '../../components/Card';

export default function () {
  const getCategory = useSelector(state => state.category.categoriesData);
  const getData = useSelector(state => state.category_data.selectedData);

  const [activeCategory, setActiveCategory] = useState(1);
  const [slug, setSlug] = useState(null);

  // selectedData
  const dispatch = useDispatch();

  useEffect(() => {}, [activeCategory]);

  return (
    <View className="flex-1 relative" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex-1">
        <View className="my-12 space-y-2">
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

        <View className="mx-4 flex-row justify-between items-center space-x-3">
          <View
            className="flex-row flex-1 p-2 rounded-2xl items-center w-[150] h-[50]"
            style={{backgroundColor: COLORS.borderColor}}>
            <Icons.Feather name="search" size={24} color={COLORS.textColor} />
            <TextInput
              placeholder="Search"
              className="ml-2 w-[210] h-10"
              style={{color: COLORS.textColor}}
            />
          </View>

          <TouchableOpacity
            className="rounded-2xl p-4"
            style={{backgroundColor: COLORS.borderColor}}>
            <Icons.Feather name="sliders" size={20} color={COLORS.textColor} />
          </TouchableOpacity>
        </View>

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
                  <Text className={textClass} style={{color: COLORS.textColor}}>
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
      </SafeAreaView>
    </View>
  );
}
