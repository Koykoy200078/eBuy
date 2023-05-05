import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../..';
import {CheckBox} from '@rneui/themed';
import {Shadow} from 'react-native-shadow-2';

export default function () {
  const {width} = Dimensions.get('window');
  const [checkItem, setCheckItem] = useState(false);
  return (
    <View className="flex-1 relative" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex-1">
        <View className="my-1 space-y-2">
          <Text
            className="mx-4 text-2xl font-medium italic"
            style={{color: COLORS.textColor}}>
            My Cart
          </Text>
        </View>

        <ScrollView className="py-1" showsVerticalScrollIndicator={false}>
          <View
            className="px-2 space-y-2"
            style={{width: width, marginVertical: 10}}>
            <View className="my-2">
              <Shadow
                distance={5}
                startColor={COLORS.borderColor}
                style={{
                  borderRadius: 6,
                  width: width - 20,
                }}>
                <View className="flex flex-col justify-between">
                  <View className="flex flex-row mt-0 item-center justify-between h-10">
                    <CheckBox
                      containerStyle={{
                        marginLeft: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                      }}
                      title="Koykoy200078 Store"
                      checked={checkItem}
                      checkedColor="#1dd1a1"
                      onPress={() => setCheckItem(!checkItem)}
                    />

                    <TouchableOpacity>
                      <View className="flex justify-center items-center h-full mr-1">
                        <Text className="text-sm font-bold">Remove</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View className="flex flex-row ml-2 mt-0 mb-2 justify-start">
                    <CheckBox
                      containerStyle={{
                        marginLeft: 0,
                        marginRight: 0,
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                      }}
                      checked={checkItem}
                      checkedColor="#1dd1a1"
                      onPress={() => setCheckItem(!checkItem)}
                    />
                    <Image
                      source={{
                        uri: 'https://avatars.githubusercontent.com/u/31362410?v=4',
                      }}
                      style={{width: 100, height: 100, borderRadius: 6}}
                    />

                    <View className="flex flex-col items-start ml-2">
                      <Text className="text-lg font-bold">AAA</Text>
                      <Text className="text-sm font-bold">₱ 1000</Text>
                      <Text className="text-sm font-bold">
                        Product Quantity
                      </Text>
                    </View>
                  </View>

                  <View className="flex flex-row ml-2 mt-0 mb-2 justify-start">
                    <CheckBox
                      containerStyle={{
                        marginLeft: 0,
                        marginRight: 0,
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                      }}
                      checked={checkItem}
                      checkedColor="#1dd1a1"
                      onPress={() => setCheckItem(!checkItem)}
                    />
                    <Image
                      source={{
                        uri: 'https://avatars.githubusercontent.com/u/31362410?v=4',
                      }}
                      style={{width: 100, height: 100, borderRadius: 6}}
                    />

                    <View className="flex flex-col items-start ml-2">
                      <Text className="text-lg font-bold">AAA</Text>
                      <Text className="text-sm font-bold">₱ 1000</Text>
                      <Text className="text-sm font-bold">
                        Product Quantity
                      </Text>
                    </View>
                  </View>
                </View>
              </Shadow>
            </View>

            <View className="my-2">
              <Shadow
                distance={5}
                startColor={COLORS.borderColor}
                style={{
                  borderRadius: 6,
                  width: width - 20,
                }}>
                <View className="flex flex-col justify-between">
                  <View className="flex flex-row mt-0 item-center justify-between h-10">
                    <CheckBox
                      containerStyle={{
                        marginLeft: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                      }}
                      title="Koykoy200078 Store"
                      checked={checkItem}
                      checkedColor="#1dd1a1"
                      onPress={() => setCheckItem(!checkItem)}
                    />

                    <TouchableOpacity>
                      <View className="flex justify-center items-center h-full mr-1">
                        <Text className="text-sm font-bold">Remove</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View className="flex flex-row ml-2 mt-0 mb-2 justify-start">
                    <CheckBox
                      containerStyle={{
                        marginLeft: 0,
                        marginRight: 0,
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                      }}
                      checked={checkItem}
                      checkedColor="#1dd1a1"
                      onPress={() => setCheckItem(!checkItem)}
                    />
                    <Image
                      source={{
                        uri: 'https://avatars.githubusercontent.com/u/31362410?v=4',
                      }}
                      style={{width: 100, height: 100, borderRadius: 6}}
                    />

                    <View className="flex flex-col items-start ml-2">
                      <Text className="text-lg font-bold">AAA</Text>
                      <Text className="text-sm font-bold">₱ 1000</Text>
                      <Text className="text-sm font-bold">
                        Product Quantity
                      </Text>
                    </View>
                  </View>

                  <View className="flex flex-row ml-2 mt-0 mb-2 justify-start">
                    <CheckBox
                      containerStyle={{
                        marginLeft: 0,
                        marginRight: 0,
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                      }}
                      checked={checkItem}
                      checkedColor="#1dd1a1"
                      onPress={() => setCheckItem(!checkItem)}
                    />
                    <Image
                      source={{
                        uri: 'https://avatars.githubusercontent.com/u/31362410?v=4',
                      }}
                      style={{width: 100, height: 100, borderRadius: 6}}
                    />

                    <View className="flex flex-col items-start ml-2">
                      <Text className="text-lg font-bold">AAA</Text>
                      <Text className="text-sm font-bold">₱ 1000</Text>
                      <Text className="text-sm font-bold">
                        Product Quantity
                      </Text>
                    </View>
                  </View>
                </View>
              </Shadow>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
