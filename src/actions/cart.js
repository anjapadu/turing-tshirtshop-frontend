import {
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    CHANGE_PRODUCT_QUANTITY
} from '../constants'

/*export const setVariableState = (payload) => ({
    type: SET_VARIABLE_STATE,
    payload
});*/

export const addProductToCart = (payload) => ({
    type: ADD_CART_ITEM,
    payload
})

export const removeCartItem = (payload) => ({
    type: REMOVE_CART_ITEM,
    payload
})

export const changeProductQuantity = (payload) => ({
    type: CHANGE_PRODUCT_QUANTITY,
    payload
})