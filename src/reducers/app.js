import {
    SET_IS_LOADING,
    SET_DEPARTMENTS_CATEGORIES,
    SET_SELECTED_CATEGORY,
    SET_SELECTED_DEPARTMENT,
    SET_SHOW_CART,
    SET_SHIPPING_REGION,
    SET_AUTOCOMPLETE
} from '../constants';

const INITIAL_STATE = {
    isLoading: true,
    departmentsCategories: [],
    shippingRegion: [],
    selectedDepartment: null,
    selectedCategory: null,
    showCart: false,
    autoComplete: ''
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SET_AUTOCOMPLETE:
            return {
                ...state,
                autoComplete: payload
            }
        case SET_SHIPPING_REGION:
            return {
                ...state,
                shippingRegion: payload
            }
        case SET_SHOW_CART:
            return {
                ...state,
                showCart: payload
            }
        case SET_SELECTED_DEPARTMENT:
            return {
                ...state,
                selectedDepartment: payload,
                selectedCategory: null
            }
        case SET_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: payload
            }
        case SET_DEPARTMENTS_CATEGORIES:
            return {
                ...state,
                departmentsCategories: payload
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: payload
            }
        default:
            return state
    }
}