import { FETCH_PRODUCTS_ON_PAGE } from '../constants'

/*export const setVariableState = (payload) => ({
    type: SET_VARIABLE_STATE,
    payload
});*/

export const fetchProductPage = (payload) => ({
    type: FETCH_PRODUCTS_ON_PAGE,
    payload
})