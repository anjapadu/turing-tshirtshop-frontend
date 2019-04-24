import {
    SET_CHECKOUT_REDUCER_VALUE,
    SUBMIT_ORDER
} from '../constants'

/*export const setVariableState = (payload) => ({
    type: SET_VARIABLE_STATE,
    payload
});*/

export const setCheckoutReducerValue = (payload) => ({
    type: SET_CHECKOUT_REDUCER_VALUE,
    payload
})

export const submitOrder = (payload) => ({
    type: SUBMIT_ORDER,
    payload
})