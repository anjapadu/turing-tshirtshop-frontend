import {
    call,
    select,
    fork,
    put,
    all,
    takeLatest
} from 'redux-saga/effects';
import { api } from '../apis'
import { isCorrect } from '@utils';
import { FETCH_PRODUCTS, SET_PRODUCTS } from '../constants';

/***********************/
/******Start here*******/
/***********************/

function* callFetchProducts({ payload } = {}) {
    try {
        const {
            offset,
            limit,
            categoryId,
            departmentId
        } = payload || {};
        let query = `{
            products(
              categoryId: ${categoryId || null}
              departmentId: ${departmentId || null}
              paging: {offset: ${offset || 0}, limit: ${limit || 20}}
            ){
                data{
                    id
                    name
                    description
                    price
                    discounted_price
                    image
                    image_2
                    thumbnail
                    display
                    categoryName	
                    categoryId
                    departmentId
                    departmentName
                    sizes
                    colors
                    }
                    count
            }
          }`;

        const { data } = yield call(api, {
            query
        });
        if (isCorrect(data)) {
            yield put({
                type: SET_PRODUCTS,
                payload: data.data.products.data
            })
        }


    } catch (e) {
        console.log("Error callFetchProducts", e);
    }
}


export default [
    fork(callFetchProducts),
    takeLatest(FETCH_PRODUCTS, callFetchProducts)
];