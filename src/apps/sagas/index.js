import {all} from 'redux-saga/effects';

// Auth
import {loginUser} from './auth/authLogin';
import {createUserAccount} from './auth/authRegister';
import {logoutUser} from './auth/authLogout';

import {userData, userData2} from './userData';

// Product
import {product} from './product/productIndex';
import {productDetails} from './product/productDetails';

import {category} from './category/categories';
import {categoryData} from './categoriesData';

import {cartCountData} from './cartCount';
import {cartAdd} from './cartAddItem';

import {searchData} from './search';

// Wishlist
import {wishlistCountData} from './wishlistCount';
import {wishlistData} from './wishlistItemShow';
// user
import {userItemCountData} from './userItemCount';
import {userUpdateData} from './userUpdateData';

export default function* rootSaga() {
  yield all([
    // auth/login
    loginUser(),
    createUserAccount(),
    logoutUser(),

    // product
    product(),
    productDetails(),

    // category
    category(),
    categoryData(),

    // cart
    cartCountData(),
    cartAdd(),

    // search
    searchData(),

    // wishlist
    wishlistCountData(),
    wishlistData(),

    // user
    userItemCountData(),
    userData(),
    userData2(),
    userUpdateData(),
  ]);
}
