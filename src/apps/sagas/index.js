import {all} from 'redux-saga/effects';

// Auth
import {loginUser} from './auth/authLogin';
import {createUserAccount} from './auth/authRegister';
import {logoutUser} from './auth/authLogout';
import {forgotUserPassword} from './auth/authForgot';

import {userData, userData2} from './userData';

// Product
import {product} from './product/productIndex';
import {productDetails} from './product/productDetails';
import {productSlides} from './product/productSlides';
import {productNewArrival} from './product/productNewArrivals';
import {productTrending} from './product/productTrending';

import {category} from './category/categories';
import {categoryData} from './categoriesData';

import {cartCountData} from './cartCount';
import {cartAdd} from './cartAddItem';
import {cartData} from './cartData';

import {searchData} from './search';

// Wishlist
import {wishlistCountData} from './wishlistCount';
import {wishlistData} from './wishlistItemShow';
// user
import {userItemCountData} from './userItemCount';
import {userUpdateData} from './userUpdateData';

import {cartIncrement} from './cartIncrement';
import {cartDecrement} from './cartDecrement';

import {myProductDetails} from './product/myProduct';

import {changePassword} from './changepass';

import {getWishlist} from './wishlistAdd';
import {removeWishlist} from './wishlistRemove';

import {cartRemoveItemData} from './cartRemove';

import {checkoutItem} from './checkout';

import {ordersData} from './orders';

export default function* rootSaga() {
  yield all([
    // auth/login
    loginUser(),
    createUserAccount(),
    logoutUser(),
    forgotUserPassword(),

    // product
    product(),
    productDetails(),
    productSlides(),
    productNewArrival(),
    productTrending(),

    // category
    category(),
    categoryData(),

    // cart
    cartCountData(),
    cartAdd(),
    cartData(),

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

    cartIncrement(),
    cartDecrement(),

    myProductDetails(),
    changePassword(),
    getWishlist(),
    removeWishlist(),
    cartRemoveItemData(),

    checkoutItem(),
    ordersData(),
  ]);
}
