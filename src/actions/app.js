import {
    SET_IS_LOADING,
    SET_SELECTED_CATEGORY,
    SET_SELECTED_DEPARTMENT,
    SET_SHOW_CART
} from '../constants';

export const setIsLoading = (payload) => ({
    type: SET_IS_LOADING,
    payload
});
export const setCategory = (payload) => ({
    type: SET_SELECTED_CATEGORY,
    payload
});
export const setDepartment = (payload) => ({
    type: SET_SELECTED_DEPARTMENT,
    payload
});

export const setShowCart = (payload) => ({
    type: SET_SHOW_CART,
    payload
})
