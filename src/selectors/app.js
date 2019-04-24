import {
    createSelector
} from 'reselect';

const getIsLoading = state => state.app.isLoading;
const getDepartmentsCategories = state => state.app.departmentsCategories;
const getSelectedCategory = state => state.app.selectedCategory;
const getSelectedDepartment = state => state.app.selectedDepartment;
const getShowCart = state => state.app.showCart;
const getShippingRegion = state => state.app.shippingRegion;

const appSelector = createSelector(
    [getIsLoading, getDepartmentsCategories, getSelectedCategory, getSelectedDepartment, getShowCart, getShippingRegion],
    (isLoading, departmentsCategories, selectedCategory, selectedDepartment, showCart, shippingRegion) => ({
        isLoading,
        departmentsCategories,
        selectedCategory,
        selectedDepartment,
        showCart,
        shippingRegion
    })
)

export {
    appSelector
}