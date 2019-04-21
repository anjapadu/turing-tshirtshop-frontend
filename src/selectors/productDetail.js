import {
    createSelector
} from 'reselect';

const getIsLoadingProductDetails = state => state.productDetail.isLoadingProductDetails;
const getProductDetail = state => state.productDetail.productDetail;
const getProductReview = state => state.productDetail.productReview;
const getRecommendationList = state => state.productDetail.recommendationList;

const productDetailSelector = createSelector(
    [getIsLoadingProductDetails, getProductDetail, getProductReview, getRecommendationList],
    (isLoadingProductDetails, productDetail, productReview, recommendationList) => ({
        isLoadingProductDetails,
        productDetail,
        productReview,
        recommendationList
    })
);

export {
    productDetailSelector
}