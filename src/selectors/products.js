import {
    createSelector
} from 'reselect';

/*
const getStateVariable = state => state.products.stateVariable;
*/

const productsSelector = createSelector(
    [/*getStateVariable*/],
    (/*stateVariable*/) => ({
        /*stateVariable*/
    })
);
    
export {
    productsSelector
}