import {
    SET_IS_LOADING,
    SET_DEPARTMENTS_CATEGORIES,
    SET_SELECTED_CATEGORY,
    SET_SELECTED_DEPARTMENT,
    SET_SHOW_CART,
    SET_SHIPPING_REGION,
    SET_AUTOCOMPLETE,
    SET_CATEGORIES,
    SET_CUSTOM_APP,
    SET_ATTRIBUTTES,
    SET_SELECTED_PRICE,
    SET_SELECTED_COLOR,
    SET_SELECTED_SIZE,
    SET_MIN_MAX_PRICE,
} from '../constants';

const INITIAL_STATE = {
    isLoading: true,
    departmentsCategories: [],
    categories: [],
    shippingRegion: [],
    selectedDepartment: null,
    selectedCategory: null,
    selectedColor: null,
    selectedSize: null,
    selectedPriceMin: null,
    selectedPriceMax: null,
    showCart: false,
    attributes: {},
    autoComplete: '',
    minPrice: 0,
    maxPrice: 0
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SET_MIN_MAX_PRICE:
            return {
                ...state,
                minPrice: payload.min,
                maxPrice: payload.max + 1
            }
        case SET_SELECTED_PRICE:
            return {
                ...state,
                selectedPriceMin: payload.min,
                selectedPriceMax: payload.max
            }
        case SET_SELECTED_COLOR:
            return {
                ...state,
                selectedColor: payload
            }
        case SET_SELECTED_SIZE:
            return {
                ...state,
                selectedSize: payload
            }
        case SET_ATTRIBUTTES:
            return {
                ...state,
                attributes: payload
            }
        case SET_CUSTOM_APP:
            return {
                ...state,
                [payload.key]: payload.value
            }
        case SET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
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
                selectedCategory: null,
                autoComplete: ''
            }
        case SET_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: payload ? payload.id : null,
                autoComplete: ''
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