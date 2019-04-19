import {
    createSelector
} from 'reselect';

/*
const getStateVariable = state => state.products.stateVariable;
*/
const getProducts = state => state.products.productList;
const getIsLoadingProducts = state => state.products.isLoadingProducts;
const getProductsCount = state => state.products.productsCount;
const getSelectedPage = state => state.products.selectedPage;

const productsSelector = createSelector(
    [getProducts, getIsLoadingProducts, getProductsCount, getSelectedPage],
    (productList, isLoadingProducts, productsCount, selectedPage) => ({
        productList,
        isLoadingProducts,
        productsCount,
        selectedPage
    })
);

export {
    productsSelector
}