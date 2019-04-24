import {
    SET_IS_LOADING,
    SET_SELECTED_CATEGORY,
    SET_SELECTED_DEPARTMENT,
    SET_SHOW_CART,
    SET_AUTOCOMPLETE,
    FETCH_AUTOCOMPLETE,
    SIGN_OUT
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


export const setAutoComplete = (payload) => ({
    type: SET_AUTOCOMPLETE,
    payload
})
export const fetchAutoComplete = () => ({
    type: FETCH_AUTOCOMPLETE
})

export const signOut = () => ({
    type: SIGN_OUT
})