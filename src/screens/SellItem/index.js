import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLORS, ROUTES} from '../..';
import {Icons} from '../../apps/configs/icons';
import {FlatList} from 'react-native';

export default function ({navigation}) {
  const [items, setItems] = useState([
    {id: '1', name: 'aaaaaaaaaaaaaaaa 1', price: 10.99, status: 'Verified'},
    {id: '2', name: 'bbbbbbbbbbbbbbbb 2', price: 5.99, status: 'Verified'},
    {id: '3', name: 'cccccccccccccccc 3', price: 2.99, status: 'Not Verified'},
  ]);

  const addItem = () => {
    const newItem = {
      id: Math.random().toString(),
      name: `Item ${items.length + 1}`,
      price: 0,
      status: 'In Stock',
    };
    setItems([newItem, ...items]);
  };

  const renderHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>Name</Text>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>Price</Text>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>Status</Text>
      <Text style={{fontWeight: 'bold', fontSize: 16}}>Action</Text>
    </View>
  );

  const renderItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}
      className="space-x-2">
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{flex: 1, fontSize: 16}}>
        {item.name}
      </Text>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{flex: 1, fontSize: 16}}>
        ₱ {item.price}
      </Text>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{flex: 1, fontSize: 16}}>
        {item.status}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#2196F3',
          borderRadius: 5,
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          Edit
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 relative" style={{backgroundColor: COLORS.BGColor}}>
      <SafeAreaView className="flex-1">
        <View className="my-1 space-y-2 flex-row">
          <TouchableOpacity
            onPress={() => {
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
            My Products
          </Text>
        </View>

        <View style={{flex: 1, paddingTop: 50, paddingHorizontal: 20}}>
          <TouchableOpacity
            className="p-2 absolute top-3 right-3 rounded-md bg-blue-500"
            onPress={() => navigation.navigate(ROUTES.SELL_FORM)}>
            <Text className="font-bold" style={{color: COLORS.textWhite}}>
              Add
            </Text>
          </TouchableOpacity>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListHeaderComponent={renderHeader}
            stickyHeaderIndices={[0]}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
