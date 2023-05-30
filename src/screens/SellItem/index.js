import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../..';
import {Icons} from '../../apps/configs/icons';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {myProductsData} from '../../apps/reducers/product/myProduct';

export default function ({navigation}) {
  const data = useSelector(state => state.myProduct.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myProductsData());
  }, []);

  const renderHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}>
      <Text
        className="text-center text-sm"
        style={{fontWeight: 'bold', fontSize: 16, color: COLORS.textColor}}>
        Name
      </Text>
      <Text
        className="text-center text-sm"
        style={{fontWeight: 'bold', fontSize: 16, color: COLORS.textColor}}>
        Price
      </Text>
      <Text
        className="text-center text-sm"
        style={{fontWeight: 'bold', fontSize: 16, color: COLORS.textColor}}>
        Status
      </Text>
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
        // numberOfLines={2}
        className="text-center text-sm"
        style={{flex: 1, fontSize: 16, color: COLORS.textColor}}>
        {item.name}
      </Text>
      <Text
        className="text-center text-sm"
        style={{flex: 1, fontSize: 16, color: COLORS.textColor}}>
        ₱ {item.selling_price}
      </Text>

      {item.status === 0 ? (
        <Text
          className="text-green-500 text-center text-sm"
          style={{flex: 1, fontSize: 16}}>
          Verified
        </Text>
      ) : (
        <Text
          className="text-red-500 text-end text-sm"
          style={{flex: 1, fontSize: 16}}>
          Not Verified
        </Text>
      )}
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
            className="mx-4 text-2xl font-bold italic"
            style={{color: COLORS.textColor}}>
            My Products
          </Text>
        </View>

        <View style={{flex: 1, paddingTop: 50, paddingHorizontal: 20}}>
          <FlatList
            data={data}
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
