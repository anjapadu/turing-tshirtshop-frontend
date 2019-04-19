import {
    createSelector
} from 'reselect';

/*
const getStateVariable = state => state.products.stateVariable;
*/
const getProducts = state => state.products.productList;

const productsSelector = createSelector(
    [getProducts],
    (productList) => ({
        productList
    })
);

export {
    productsSelector
}