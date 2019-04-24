import { SET_CHECKOUT_REDUCER_VALUE } from '../constants'

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
        case SET_CHECKOUT_REDUCER_VALUE:
            return {
                ...state,
                [payload.name]: payload.value
            }
        default:
            return state;
    }
}
