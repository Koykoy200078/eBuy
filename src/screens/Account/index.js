import {View, Text, Button} from 'react-native';
import React from 'react';
import {userLogout} from '../../apps/reducers/auth/authLogout';
import {useSelector, useDispatch} from 'react-redux';
import {resetLogin} from '../../apps/reducers/auth/authLogin';
import {resetRegister} from '../../apps/reducers/auth/authRegister';
import {resetProductData} from '../../apps/reducers/product/productIndex';
import {resetCategoryData} from '../../apps/reducers/category/categories';
import {resetProductDetailsData} from '../../apps/reducers/product/productDetails';
import {resetCartCount} from '../../apps/reducers/cartCount';
import {resetSelectedCategoryData} from '../../apps/reducers/categoriesData';

export default function () {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(userLogout());
    dispatch(resetLogin());
    dispatch(resetRegister());
    dispatch(resetProductData());
    dispatch(resetCategoryData());
    dispatch(resetProductDetailsData());
    dispatch(resetSelectedCategoryData());
    dispatch(resetCartCount());
  };

  return (
    <View>
      <Button title="Logout" onPress={() => onLogout()} />
    </View>
  );
}
