import {
    createSelector
} from 'reselect';

const getIsLoading = state => state.app.isLoading;
const getDepartmentsCategories = state => state.app.departmentsCategories;
const getSelectedCategory = state => state.app.selectedCategory;
const getSelectedDepartment = state => state.app.selectedDepartment;

const appSelector = createSelector(
    [getIsLoading, getDepartmentsCategories, getSelectedCategory, getSelectedDepartment],
    (isLoading, departmentsCategories, selectedCategory, selectedDepartment) => ({
        isLoading,
        departmentsCategories,
        selectedCategory,
        selectedDepartment
    })
)

export {
    appSelector
}