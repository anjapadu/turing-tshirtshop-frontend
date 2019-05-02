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
    FETCH_AUTOCOMPLETE,
    SET_CUSTOM_APP,
    SET_SELECTED_COLOR,
    SET_SELECTED_SIZE,
    SET_SELECTED_PRICE
} from '../constants';

/***********************/
/******Start here*******/
/***********************/

export function* callFetchProducts({ payload } = {}) {
    try {
        yield put({
            type: SET_IS_LOADING_PRODUCTS,
            payload: true
        });
        const {
            offset,
            limit,
            categoryId,
            departmentId,
            minPrice,
            maxPrice,
            color,
            size,
            autoComplete
        } = payload || {};
        let query = `{
            products(
              categoryId: ${categoryId || null}
              departmentId: ${departmentId || null}
              paging: {offset: ${offset || 0}, limit: ${limit || 12}}
              color: ${color ? `"${color}"` : null}
              size: ${size ? `"${size}"` : null}
              minPrice: ${minPrice || null}
              maxPrice: ${maxPrice || null}
              autoComplete: ${autoComplete ? `"${autoComplete}"` : null} 
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
        yield put({
            type: SET_IS_LOADING_PRODUCTS,
            payload: false
        })
    } catch (e) {
        console.log("Error callFetchProducts", e);
        yield put({
            type: SET_IS_LOADING_PRODUCTS,
            payload: false
        })
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
        selectedCategory,
        autoComplete,
        selectedColor,
        selectedSize,
        selectedPriceMin,
        selectedPriceMax
    } = state.app;
    yield call(callFetchProducts, {
        payload: {
            departmentId: selectedDepartment ? selectedDepartment : null,
            categoryId: selectedCategory ? selectedCategory : null,
            offset: (payload - 1) * 12,
            autoComplete,
            minPrice: selectedPriceMin,
            maxPrice: selectedPriceMax,
            color: selectedColor,
            size: selectedSize
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

    const state = yield select();
    const {
        selectedColor,
        selectedPriceMax,
        selectedPriceMin,
        selectedSize
    } = state.app;
    switch (type) {
        case SET_SELECTED_DEPARTMENT:
            yield call(callFetchProducts, {
                payload: {
                    departmentId: payload || null,
                    minPrice: selectedPriceMin,
                    maxPrice: selectedPriceMax,
                    color: selectedColor,
                    size: selectedSize
                }
            });
            break;
        case SET_SELECTED_CATEGORY:
            const { id, departmentId } = payload || {}
            yield put({
                type: SET_CUSTOM_APP,
                payload: {
                    key: 'selectedDepartment',
                    value: departmentId
                }
            });
            yield call(callFetchProducts, {
                payload: {
                    departmentId,
                    categoryId: id,
                    minPrice: selectedPriceMin,
                    maxPrice: selectedPriceMax,
                    color: selectedColor,
                    size: selectedSize
                }
            });
            break;
        case SET_SELECTED_COLOR:
        case SET_SELECTED_SIZE:
        case SET_SELECTED_PRICE:
            yield call(callFetchProducts, {
                payload: {
                    departmentId,
                    categoryId: id,
                    minPrice: selectedPriceMin,
                    maxPrice: selectedPriceMax,
                    color: selectedColor,
                    size: selectedSize
                }
            });
            break;
    }
    yield put({
        type: SET_SELECTED_PAGE,
        payload: 1
    })

}

function* callFetchAutoComplete({ payload = {} }) {
    try {
        yield put({
            type: SET_IS_LOADING_PRODUCTS,
            payload: true
        })
        const state = yield select();
        const {
            autoComplete,
            selectedDepartment = {},
            selectedCategory = {},
            selectedColor,
            selectedSize,
            selectedPriceMin,
            selectedPriceMax
        } = state.app;
        const { paging } = payload;
        let query = `{
            products(
              autoComplete: "${autoComplete}"
              categoryId: ${selectedCategory || null}
              departmentId: ${selectedDepartment || null}
              color: ${selectedColor ? `"${selectedColor}"` : null}
              size: ${selectedSize ? `"${selectedSize}"` : null}
              minPrice: ${selectedPriceMin || null}
              maxPrice: ${selectedPriceMax || null}
              paging: {
                  offset: ${paging || 0}
                  limit: ${paging || 12}
              }
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

        yield put({
            type: SET_IS_LOADING_PRODUCTS,
            payload: false
        })
    } catch (e) {
        console.log('Errror callFetchAutoComplete', e)
        yield put({
            type: SET_IS_LOADING_PRODUCTS,
            payload: false
        })
    }
}


export default [
    takeLatest(FETCH_PRODUCTS_ON_PAGE, callFetchOnPaging),
    takeLatest(FETCH_PRODUCTS, callFetchProducts),
    takeLatest(SET_SELECTED_CATEGORY, callFetchOnFilter),
    takeLatest(SET_SELECTED_DEPARTMENT, callFetchOnFilter),
    takeLatest(SET_SELECTED_COLOR, callFetchOnFilter),
    takeLatest(SET_SELECTED_SIZE, callFetchOnFilter),
    takeLatest(SET_SELECTED_PRICE, callFetchOnFilter),
    takeLatest(SET_CUSTOM_APP, callFetchOnFilter),
    debounce(750, FETCH_AUTOCOMPLETE, callFetchAutoComplete)

];