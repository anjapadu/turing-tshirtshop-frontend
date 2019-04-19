import {
    SET_PRODUCTS,
    SET_IS_LOADING_PRODUCTS,
    SET_PRODUCTS_COUNT,
    SET_SELECTED_PAGE
} from '../constants'

const INITIAL_STATE = {
    productList: [],
    productsCount: 0,
    isLoadingProducts: false,
    selectedPage: 1
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SET_SELECTED_PAGE:
            return {
                ...state,
                selectedPage: payload
            }
        case SET_PRODUCTS_COUNT:
            return {
                ...state,
                productsCount: payload
            }
        case SET_IS_LOADING_PRODUCTS:
            return {
                ...state,
                isLoadingProducts: payload
            }
        case SET_PRODUCTS:
            return {
                ...state,
                productList: payload,
                isLoadingProducts: false
            }
        default:
            return state;
    }
}
