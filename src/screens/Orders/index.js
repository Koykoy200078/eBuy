import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getOrders} from '../../apps/reducers/orders';

import moment from 'moment';
import {COLORS} from '../..';
import {Icons} from '../../apps/configs/icons';

const Orders = ({navigation}) => {
  const getData = useSelector(state => state.orders.data);
  const getLoading = useSelector(state => state.orders.isLoading);
  const getError = useSelector(state => state.orders.error);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getOrders(page));
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  if (getLoading && !getData) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  if (getError) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        className="rounded-bl-2xl space-x-2 flex-row items-center mb-2">
        <Icons.Ionicons name="arrow-undo" size={30} color={COLORS.textColor} />
        <Text className="text-base font-bold" style={{color: COLORS.textColor}}>
          My Orders
        </Text>
      </TouchableOpacity>

      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.headerCell}>Tracking No</Text>
          <Text style={styles.headerCell}>Order Date</Text>

          <Text style={styles.headerCell}>Status</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} className="h-[570]">
          {getData && getData.orders ? (
            getData.orders.data.map(item => {
              let status;
              let color;

              switch (item.status_message) {
                case 'in progress':
                  status = 'In Progress';
                  color = COLORS.textColor;
                  break;
                case 'completed':
                  status = 'Completed';
                  color = '#2ecc71';
                  break;
                case 'cancelled':
                  status = 'Cancelled';
                  color = '#e74c3c';
                  break;
                default:
                  break;
              }

              return (
                <View
                  key={item.id}
                  className="flex-row items-center justify-center rounded-b space-x-2 p-2"
                  style={{borderColor: '#ccc', borderBottomWidth: 1}}>
                  <Text
                    className="flex-1 text-center text-xs"
                    style={{color: COLORS.textColor}}>
                    {item.tracking_no}
                  </Text>
                  <Text
                    className="flex-1 text-center text-xs"
                    style={{color: COLORS.textColor}}>
                    {moment(item.created_at).format('DD-MM-YYYY')}
                  </Text>
                  <Text
                    className="flex-1 text-center text-xs"
                    style={{color: color}}>
                    {status}
                  </Text>
                  {/* <View className="flex-1 text-center text-xs">
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('OrderDetails', {order: item});
                        }}>
                        <Text style={styles.viewButton}>View</Text>
                      </TouchableOpacity>
                    </View> */}
                </View>
              );
            })
          ) : (
            <View style={styles.row}>
              <Text style={styles.noOrders}>No Orders available</Text>
            </View>
          )}
        </ScrollView>
        {/* end of scroll view */}
        <View style={styles.separator} />
        <View style={styles.row}>
          <Text style={styles.cell}>Total Orders</Text>
          <Text style={styles.cell}>
            {getData && getData.orders ? getData.orders.total : 0}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  table: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
  viewButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: 5,
    padding: 5,
    textAlign: 'center',
  },
  noOrders: {
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
});

export default Orders;
