import {
    createSelector
} from 'reselect';

/*
const getStateVariable = state => state.checkout.stateVariable;
*/
const getFirstname = state => state.checkout.firstname;
const getLastname = state => state.checkout.lastname;
const getAddress_1 = state => state.checkout.address_1;
const getAddress_2 = state => state.checkout.address_2;
const getCity = state => state.checkout.city;
const getRegion = state => state.checkout.region;
const getPostal_code = state => state.checkout.postal_code;
const getCountry = state => state.checkout.country;
const getShipping_region_id = state => state.checkout.shipping_region_id;
const getTotal_amount = state => state.checkout.total_amount;
const getComments = state => state.checkout.comments;
const getShipping_id = state => state.checkout.shipping_id;

const checkoutSelector = createSelector(
    [getFirstname, getLastname, getAddress_1, getAddress_2, getCity, getRegion, getPostal_code, getCountry, getShipping_region_id, getTotal_amount, getComments, getShipping_id],
    (firstname, lastname, address_1, address_2, city, region, postal_code, country, shipping_region_id, total_amount, comments, shipping_id) => ({
        /*stateVariable*/
        firstname,
        lastname,
        address_1,
        address_2,
        city,
        region,
        postal_code,
        country,
        shipping_region_id,
        total_amount,
        comments,
        shipping_id
    })
);
/**
 * Validate delivery selector to validate from reducer
 */
const validationSelector = createSelector(
    [getFirstname, getLastname, getAddress_1, getAddress_2, getCity, getRegion, getPostal_code, getCountry, getShipping_region_id, getTotal_amount, getComments, getShipping_id],
    (firstname, lastname, address_1, address_2, city, region, postal_code, country, shipping_region_id, total_amount, comments, shipping_id) => {
        return {
            isValidDelivery: (firstname || '').trim() != '' && (lastname || '').trim() != '' && (address_1 || '').trim() != '' && (city || '').trim() != '' && (region || '').trim() != '' && (postal_code || '').trim() != '' && (country || '').trim() != '' && shipping_region_id && shipping_id
        }
    }
)
export {
    checkoutSelector,
    validationSelector
}