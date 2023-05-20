import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getOrders} from '../../apps/reducers/orders';

import moment from 'moment';

const Orders = () => {
  const data = useSelector(state => state.orders.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <View style={styles.separator} />
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.headerCell, {width: 20}]}>Order ID</Text>
          <Text style={styles.headerCell}>Tracking No</Text>
          <Text style={styles.headerCell}>Order Date</Text>

          <Text style={styles.headerCell}>Status</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data && data.orders ? (
            data.orders.data.map(item => {
              return (
                <View key={item.id} style={styles.row}>
                  <Text style={[styles.cell, {width: 20}]}>{item.id}</Text>
                  <Text style={styles.cell}>{item.tracking_no}</Text>
                  <Text style={styles.cell}>
                    {moment(item.created_at).format('DD-MM-YYYY')}
                  </Text>
                  <Text style={styles.cell}>{item.status_message}</Text>
                </View>
              );
            })
          ) : (
            <View style={styles.row}>
              <Text style={styles.noOrders}>No Orders available</Text>
            </View>
          )}
        </ScrollView>
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
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  viewButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: 5,
    padding: 5,
  },
  noOrders: {
    flex: 1,
    textAlign: 'center',
  },
});

export default Orders;
