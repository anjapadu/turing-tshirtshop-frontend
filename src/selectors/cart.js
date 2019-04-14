import {
    createSelector
} from 'reselect';

/*
const getStateVariable = state => state.cart.stateVariable;
*/

const cartSelector = createSelector(
    [/*getStateVariable*/],
    (/*stateVariable*/) => ({
        /*stateVariable*/
    })
);
    
export {
    cartSelector
}