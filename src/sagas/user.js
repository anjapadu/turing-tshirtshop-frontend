import {
    call,
    select,
    fork,
    put,
    all,
    takeLatest
} from 'redux-saga/effects';
import { api } from '../apis';
import { LOGIN, SET_USER_DATA, REGISTER } from '../constants';

/***********************/
/******Start here*******/
/***********************/

function* callLogin({ payload }) {

    const { password, callbackError } = payload;
    const { email } = (yield select()).user;
    try {
        const query = `{
            customerLogin(
              email: "${email.trim().toLowerCase()}"
              password: "${password}"
            ){
              name
              email
              credit_card
              address_1
              address_2
              city
              region
              postal_code
              country
              shippingRegionId
              shippingRegionName
              day_phone
              eve_phone
              mob_phone
              token
            }
          }`;

        const { data } = yield call(api, {
            query
        })
        console.log({ data })
        if (!data.errors)
            yield put({
                type: SET_USER_DATA,
                payload: data.data.customerLogin
            })
        else
            callbackError(data.errors.join('|'))

    } catch (e) {
        console.log('Error callLogin', e);
    }
}

function* callRegister({ payload }) {
    try {
        const { email, firstname, lastname, password, isGoogle = false, callbackError } = payload;
        const query = `mutation{
            registerCustomer(
              email: "${email}"
              firstname:"${firstname}"
              lastname: "${lastname}"
              password: "${password}"
              isGoogle: ${isGoogle}
            ){
                name
                email
                credit_card
                address_1
                address_2
                city
                region
                postal_code
                country
                shippingRegionId
                shippingRegionName
                day_phone
                eve_phone
                mob_phone
                token
            }
          }`;
        const { data } = yield call(api, {
            query
        });
        if (!data.errors)
            yield put({
                type: SET_USER_DATA,
                payload: data.data.customerLogin
            })
        else
            callbackError(data.errors.join('|'))

    } catch (e) {
        console.log('Error callRegister', e)
    }
}

export default [
    takeLatest(LOGIN, callLogin),
    takeLatest(REGISTER, callRegister)
];