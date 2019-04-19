import { SET_PRODUCTS } from '../constants'

const INITIAL_STATE = {
    productList: []
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SET_PRODUCTS:
            return {
                ...state,
                productList: payload
            }
        default:
            return state;
    }
}
