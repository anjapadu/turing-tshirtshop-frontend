import {
} from '../constants'
import {
    SET_PRODUCT_DETAIL,
    SET_IS_LOADING_PRODUCT_DETAILS,
    SET_PRODUCT_REVIEW,
    SET_RECOMMENDATION_LIST
} from '../constants/productDetail';

const INITIAL_STATE = {
    isLoadingProductDetails: true,
    productDetail: null,
    productReview: null,
    recommendationList: []
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SET_RECOMMENDATION_LIST:
            return {
                ...state,
                recommendationList: payload
            }
        case SET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: payload,
                isLoadingProductDetails: false
            }
        case SET_IS_LOADING_PRODUCT_DETAILS:
            return {
                ...state,
                isLoadingProductDetails: payload
            }
        case SET_PRODUCT_REVIEW:
            return {
                ...state,
                productReview: payload
            }
        default:
            return state;
    }
}
