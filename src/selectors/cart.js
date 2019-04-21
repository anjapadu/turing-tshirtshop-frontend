import {
    createSelector
} from 'reselect';

/*
const getStateVariable = state => state.cart.stateVariable;
*/

const getCartItemsNow = state => state.cart.cartItemsNow;
const getCartItemsLater = state => state.cart.cartItemsLater;

const cartSelector = createSelector(
    [getCartItemsNow, getCartItemsLater],
    (cartItemsNow, cartItemsLater) => ({
        cartItemsNow,
        cartItemsLater,
        subTotalCart: Object.keys(cartItemsNow).reduce((prev, curr) => {
            let item = cartItemsNow[curr];
            return prev + ((item.discounted_price == 0 ? (item.price) : item.discounted_price) * (item.quantity || 1))
        }, 0),
        // cartItemsLaterCount: Object.keys(cartItemsLater).reduce((prev, curr) => {
        //     return prev + (cartItemsLater[curr].discounted_price == 0 ? cartItemsLater[curr].price : cartItemsLater[curr].discounted_price)
        // }, 0),
        cartItemsNowCount: Object.keys(cartItemsNow).reduce((prev, curr) => {
            return prev + (cartItemsNow[curr].quantity || 1)
        }, 0),
        cartItemsLaterCount: Object.keys(cartItemsLater).reduce((prev, curr) => {
            return prev + (cartItemsLater[curr].quantity || 1)
        }, 0),
    })
);

export {
    cartSelector
}