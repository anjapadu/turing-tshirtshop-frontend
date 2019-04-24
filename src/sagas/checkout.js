import {
  call,
  select,
  xtakeLatest,
  fork,
  put,
  all,
  takeLatest
} from 'redux-saga/effects';

import {
  SUBMIT_ORDER,
  CLEAR_CART
} from '../constants';
import { api } from '../apis';

/***********************/
/******Start here*******/
/***********************/
function* callSubmitOrder({ payload }) {
  try {
    const { card,
      errorCallback,
      successCallback
    } = payload;
    const state = yield select();
    const { cartItemsNow } = state.cart;
    const { token } = state.user;
    const { shippingRegion } = state.app;
    let detail = [];
    let total_amount = 0;

    Object.keys(cartItemsNow).forEach((keyItem) => {
      let item = cartItemsNow[keyItem];
      detail.push({
        product_id: item.id,
        attributes: `${item.selectedColor}, ${item.selectedSize}`,
        product_name: item.name,
        quantity: item.quantity || 1,
        unit_cost: item.discounted_price == 0 ? item.price : item.discounted_price
      })
      total_amount += item.discounted_price == 0 ? (item.price * (item.quantity || 1)) : (item.discounted_price * (item.quantity || 1))
    })
    const {
      address_1,
      address_2,
      city,
      country,
      firstname,
      lastname,
      postal_code,
      region,
      shipping_region_id,
      shipping_id,
    } = state.checkout;

    const { shipping_cost } = shippingRegion[parseInt(shipping_region_id.index) + 1].shipping[shipping_id.index];
    total_amount += shipping_cost;
    let query = `mutation{
      order(
        address_1: "${address_1}"
        address_2: "${address_2 || ''}"
        city: "${city}"
        country: "${country}"
        name: "${firstname + ' ' + lastname}"
        postal_code: "${postal_code}"
        region: "${region}"
        shipping_region_id: ${shipping_region_id.value}
        shipping_id: ${shipping_id.value}
        total_amount: ${total_amount}
        detail: ${JSON.stringify(detail).replace(/"([^(")"]+)":/g, "$1:")}
        card:{
          number: "${card.number}"
          exp_month: "${card.exp_month}"
          exp_year: "${card.exp_year}"
          cvc: "${card.cvc}"
        }
      ){
        id
      }
    }	`;
    const { data } = yield call(api, {
      query
    }, token);

    if (data.errors) {
      return errorCallback(data.errors[0]);
    }
    yield put({
      type: CLEAR_CART
    })
    return successCallback();
  } catch (e) {
    console.log(callSubmitOrder, e)
  }
}


export default [
  takeLatest(SUBMIT_ORDER, callSubmitOrder)
];