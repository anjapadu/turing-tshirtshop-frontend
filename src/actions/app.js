import {
    SET_IS_LOADING,
    SET_SELECTED_CATEGORY,
    SET_SELECTED_DEPARTMENT,
    SET_SHOW_CART,
    SET_AUTOCOMPLETE,
    FETCH_AUTOCOMPLETE,
    SIGN_OUT,
    SET_CUSTOM_APP,
    SET_SELECTED_SIZE,
    SET_SELECTED_COLOR,
    SET_SELECTED_PRICE
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

export const setCustomAppReducer = (payload) => ({
    type: SET_CUSTOM_APP,
    payload
})

export const setSelectedSize = (payload) => ({
    type: SET_SELECTED_SIZE,
    payload
})
export const setSelectedColor = (payload) => ({
    type: SET_SELECTED_COLOR,
    payload
})
export const setSelectedPrice = (payload) => ({
    type: SET_SELECTED_PRICE,
    payload
})