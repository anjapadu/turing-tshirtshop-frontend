import {
    call,
    select,
    fork,
    put,
    all,
    takeLatest
} from 'redux-saga/effects';

import { ADD_CART_ITEM } from '../constants';

/***********************/
/******Start here*******/
/***********************/
function* callAddItemToCart() {
    try {

    } catch (e) {
        console.log('callAddItemToCart', e);
    }
}

export default [
    // takeLatest(ADD_CART_ITEM)    
];