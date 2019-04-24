import { SET_CHECKOUT_REDUCER_VALUE, SIGN_OUT, SET_USER_DATA } from '../constants'

const INITIAL_STATE = {
    firstname: '',
    lastname: '',
    address_1: '',
    address_2: '',
    city: '',
    region: '',
    postal_code: '',
    country: '',
    shipping_region_id: null,
    total_amount: '',
    comments: '',
    shipping_id: ''
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...payload,
            }
        case SIGN_OUT:
            return {
                ...state,
                ...INITIAL_STATE
            }
        case SET_CHECKOUT_REDUCER_VALUE:
            return {
                ...state,
                [payload.name]: payload.value
            }
        default:
            return state;
    }
}
