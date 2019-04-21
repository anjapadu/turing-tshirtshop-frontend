import {

} from '../constants'
import {
    FETCH_PRODUCT_DETAIL,
    FETCH_PRODUCT_REVIEW,
    SET_PRODUCT_DETAIL,
    FETCH_PRODUCT_RECOMMENDATIONS
} from '../constants/productDetail';

export const fetchProductDetail = (payload) => ({
    type: FETCH_PRODUCT_DETAIL,
    payload
})

export const fetchProductReview = (payload) => ({
    type: FETCH_PRODUCT_REVIEW,
    payload
})

export const setProductDetail = (payload) => ({
    type: SET_PRODUCT_DETAIL,
    payload
})

export const fetchRecommendations = (payload) => ({
    type: FETCH_PRODUCT_RECOMMENDATIONS,
    payload
})