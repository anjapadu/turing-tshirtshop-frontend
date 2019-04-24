import {
    ADD_CART_ITEM,
    REMOVE_CART_ITEM,
    ADD_CART_ITEM_LATER,
    REMOVE_CART_ITEM_LATER,
    SWAP_CART_ITEM,
    CHANGE_PRODUCT_QUANTITY
} from '../constants'

const INITIAL_STATE = {
    cartItemsNow: {},
    cartItemsLater: {}
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case CHANGE_PRODUCT_QUANTITY:
            return {
                ...state,
                cartItemsNow: {
                    ...state.cartItemsNow,
                    [payload.productKey]: {
                        ...state.cartItemsNow[payload.productKey],
                        quantity: payload.value
                    }
                }
            }
        case ADD_CART_ITEM_LATER:
            return {
                ...state,
                cartItemsLater: {
                    ...state.cartItemsLater,
                    [payload.productKey]: payload
                }
            }
        case ADD_CART_ITEM:
            return state.cartItemsNow[payload.productKey] ? {
                ...state,
                cartItemsNow: {
                    ...state.cartItemsNow,
                    [payload.productKey]: {
                        ...state.cartItemsNow[payload.productKey],
                        quantity: (state.cartItemsNow[payload.productKey].quantity || 1) + 1
                    }
                }
            } : {
                    ...state,
                    cartItemsNow: {
                        ...state.cartItemsNow,
                        [payload.productKey]: payload
                    }
                }
        case REMOVE_CART_ITEM:
            let cartItemsNow = {
                ...state.cartItemsNow
            }
            delete cartItemsNow[payload]
            return {
                ...state,
                cartItemsNow
            }
        case REMOVE_CART_ITEM_LATER:
            let cartItemsLater = {
                ...state.cartItemsLater
            }
            delete cartItemsLater[payload]
            return {
                ...state,
                cartItemsLater
            }
        default:
            return state;
    }
}
