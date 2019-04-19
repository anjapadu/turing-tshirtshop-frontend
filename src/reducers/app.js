import {
    SET_IS_LOADING,
    SET_DEPARTMENTS_CATEGORIES,
    SET_SELECTED_CATEGORY,
    SET_SELECTED_DEPARTMENT
} from '../constants';

const INITIAL_STATE = {
    isLoading: true,
    departmentsCategories: [],
    selectedDepartment: null,
    selectedCategory: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
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