import {
    call,
    select,
    fork,
    put,
    all,
    delay,
    takeLatest,
    debounce
} from 'redux-saga/effects';
import { api } from '../apis'
import { isCorrect } from '@utils';
import {
    FETCH_PRODUCTS,
    SET_PRODUCTS,
    SET_SELECTED_CATEGORY,
    SET_SELECTED_DEPARTMENT,
    SET_IS_LOADING_PRODUCTS,
    SET_PRODUCTS_COUNT,
    FETCH_PRODUCTS_ON_PAGE,
    SET_SELECTED_PAGE,
    FETCH_AUTOCOMPLETE
} from '../constants';

/***********************/
/******Start here*******/
/***********************/

export function* callFetchProducts({ payload } = {}) {
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
              paging: {offset: ${offset || 0}, limit: ${limit || 12}}
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
            yield put({
                type: SET_PRODUCTS_COUNT,
                payload: data.data.products.count
            })
        }
    } catch (e) {
        console.log("Error callFetchProducts", e);
    }
}

function* callFetchOnPaging({ payload }) {
    yield put({
        type: SET_IS_LOADING_PRODUCTS,
        payload: true
    })

    const state = yield select();
    const {
        selectedDepartment,
        selectedCategory
    } = state.app;
    yield call(callFetchProducts, {
        payload: {
            departmentId: selectedDepartment ? selectedDepartment.id : null,
            categoryId: selectedCategory ? selectedCategory.id : null,
            offset: (payload - 1) * 9
        }
    })
    yield put({
        type: SET_SELECTED_PAGE,
        payload
    })
    yield put({
        type: SET_IS_LOADING_PRODUCTS,
        payload: false
    })

}

function* callFetchOnFilter({ type, payload }) {
    yield put({
        type: SET_IS_LOADING_PRODUCTS,
        payload: true
    })
    const { id } = payload || {}
    switch (type) {
        case SET_SELECTED_DEPARTMENT:
            yield call(callFetchProducts, {
                payload: {
                    departmentId: id
                }
            });
            break;
        case SET_SELECTED_CATEGORY:
            const state = yield select();
            const { selectedDepartment } = state.app;
            yield call(callFetchProducts, {
                payload: {
                    departmentId: selectedDepartment.id,
                    categoryId: id
                }
            });
    }
    yield put({
        type: SET_SELECTED_PAGE,
        payload: 1
    })
    yield put({
        type: SET_IS_LOADING_PRODUCTS,
        payload: false
    })
}

function* callFetchAutoComplete() {
    try {
        const state = yield select();
        const { autoComplete } = state.app;
        if (autoComplete === "") {
            yield put({
                type: SET_SELECTED_DEPARTMENT,
                payload: null
            })
            return yield call(callFetchProducts, {

            })
        }

        let query = `{
            products(
              autoComplete: "${autoComplete}"
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
            yield put({
                type: SET_PRODUCTS_COUNT,
                payload: data.data.products.count
            })
        }
    } catch (e) {
        console.log('Errror callFetchAutoComplete', e)
    }
}

export default [
    takeLatest(FETCH_PRODUCTS_ON_PAGE, callFetchOnPaging),
    takeLatest(FETCH_PRODUCTS, callFetchProducts),
    takeLatest(SET_SELECTED_CATEGORY, callFetchOnFilter),
    takeLatest(SET_SELECTED_DEPARTMENT, callFetchOnFilter),
    debounce(750, FETCH_AUTOCOMPLETE, callFetchAutoComplete)

];