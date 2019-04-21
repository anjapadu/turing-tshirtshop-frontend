import {
    call,
    select,
    fork,
    put,
    all,
    takeLatest
} from 'redux-saga/effects';
import { api } from '../apis';
import {
    FETCH_PRODUCT_DETAIL,
    SET_PRODUCT_DETAIL,
    SET_IS_LOADING_PRODUCT_DETAILS,
    FETCH_PRODUCT_RECOMMENDATIONS,
    SET_RECOMMENDATION_LIST
} from '../constants';

/***********************/
/******Start here*******/
/***********************/
function* callFetchProductDetail({ payload }) {
    try {
        let query = `{
            products(
              id: ${payload}
            ){
              data{
                id
                name
                description
                image
                image_2
                thumbnail
                price
                discounted_price
                colors
                sizes
                categoryName
                departmentName	
                departmentId
                categoryId
              }
            }
          }	`;
        const { data } = yield call(api, {
            query
        })

        yield put({
            type: SET_PRODUCT_DETAIL,
            payload: data.data.products.data[0]
        })
        console.log(data.data.products.data[0])
        yield fork(callFetchRecommendations, {
            payload: data.data.products.data[0]
        })
        yield put({
            type: SET_IS_LOADING_PRODUCT_DETAILS,
            payload: false
        })

    } catch (e) {
        console.log('Error callFetchProductDetail', e)
    }
}

function* callFetchRecommendations({ payload }) {
    try {
        const { categoryId, departmentId, id } = payload;
        let query = `{
            products(
              notId: ${id}
              categoryId: ${categoryId}
              departmentId: ${departmentId}
              paging: {
                  limit: 10
              }
            ){
              data{
                id
                name
                description
                image
                image_2
                thumbnail
                price
                discounted_price
                colors
                sizes
                categoryName
                departmentName	
                departmentId
                categoryId
              }
            }
          }`;
        const { data } = yield call(api, {
            query
        })
        yield put({
            type: SET_RECOMMENDATION_LIST,
            payload: data.data.products.data
        })
    } catch (e) {
        console.log('Error callFetchRecommendations', e);
    }
}


export default [
    takeLatest(FETCH_PRODUCT_DETAIL, callFetchProductDetail),
    takeLatest(FETCH_PRODUCT_RECOMMENDATIONS, callFetchRecommendations)
];