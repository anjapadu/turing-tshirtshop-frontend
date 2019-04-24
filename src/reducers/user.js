import { SET_USER_DATA, SET_EMAIL, SET_PASSWORD } from '../constants'

const INITIAL_STATE = {
    id: null,
    name: null,
    email: null,
    credit_card: null,
    address_1: null,
    address_2: null,
    city: null,
    region: null,
    postal_code: null,
    country: null,
    shippingRegionId: null,
    shippingRegionName: null,
    day_phone: null,
    eve_phone: null,
    mob_phone: null,
    token: null,
    password: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SET_EMAIL:
            return {
                ...state,
                email: payload
            }
        case SET_PASSWORD:
            return {
                ...state,
                password: payload
            }
        case SET_USER_DATA:
            return {
                ...state,
                ...payload,
            }
        default:
            return state;
    }
}
