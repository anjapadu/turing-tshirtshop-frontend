import {
    takeLatest,
    call,
    put,
    fork
} from 'redux-saga/effects';
import {
    FETCH_DEPARTMENTS_CATEGORIES,
    SET_DEPARTMENTS_CATEGORIES,
    SET_IS_LOADING,
    FETCH_SHIPPING_REGION,
    SET_SHIPPING_REGION,
    SET_CATEGORIES,
    SET_ATTRIBUTTES,
    SET_MIN_MAX_PRICE
} from '../constants/app';
import { api } from '../apis';
import { isCorrect } from '@utils';
import { callFetchProducts } from './products'


function* callFetchShippingRegion() {
    try {
        let query = `{
            shippingRegion{
              id
              shipping_region
              shipping{
                id
                shipping_type
                shipping_cost
                shipping_region_id
              }
            }
          }`;
        const { data } = yield call(api, {
            query
        })
        if (!data.errors) {
            yield put({
                type: SET_SHIPPING_REGION,
                payload: data.data.shippingRegion
            })
        }
    } catch (e) {
        console.log('Error callFetchShippingRegion', e)
    }
}

function* callMinMaxPrice() {
    try {
        const query = `{
            maxMinPrice{
              min
              max
            }
          }	`;
        const { data } = yield call(api, {
            query
        })
        if (isCorrect(data))
            yield put({
                type: SET_MIN_MAX_PRICE,
                payload: data.data.maxMinPrice
            })
    } catch (e) {
        console.log('error callMinMaxPrice', e);
    }
}

function* callFetchAttributes() {
    try {
        const query = `{
            attributes{
              name
              attributeValues 
            }	
          }	`;
        const { data } = yield call(api, {
            query
        })
        if (isCorrect(data)) {
            yield put({
                type: SET_ATTRIBUTTES,
                payload: data.data.attributes.reduce((prev, curr) => {
                    prev[curr.name.toLowerCase()] = (curr.attributeValues.toUpperCase() || '')
                    return prev;
                }, {})
            })
        }
    } catch (e) {
        console.log('Error callFetchAttributes', e)
    }
}

function* callFetchDepartmentsCategories() {
    try {
        const query = `{
            departments{
            id
            name
            description
            categories{
              id
              name
              description
            }
          }
        }`;
        const { data } = yield call(api, {
            query
        })
        if (isCorrect(data)) {
            yield put({
                type: SET_DEPARTMENTS_CATEGORIES,
                payload: data.data.departments
            })
            yield put({
                type: SET_CATEGORIES,
                payload: data.data.departments.reduce((prev, curr) => {

                    curr.categories.forEach((itemCategory) => {
                        prev.push({
                            ...itemCategory,
                            departmentId: curr.id
                        });
                    })
                    return prev;
                }, [])
            })
        }
    } catch (e) {
        console.log('Error callFetchDepartmentsCategories', e);
    }
}

function* loadInitial() {
    yield call(callFetchProducts);
    yield call(callFetchDepartmentsCategories);
    yield call(callFetchShippingRegion)
    yield call(callFetchAttributes)
    yield call(callMinMaxPrice)
    yield put({
        type: SET_IS_LOADING,
        payload: false
    })
}
function* onUpdateRoute() {
    window.scrollTo(0, 0);
}

export default [
    fork(loadInitial),
    takeLatest(FETCH_DEPARTMENTS_CATEGORIES, callFetchDepartmentsCategories),
    takeLatest("@@router/LOCATION_CHANGE", onUpdateRoute),
    takeLatest(FETCH_SHIPPING_REGION, callFetchShippingRegion)
];