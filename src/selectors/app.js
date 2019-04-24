import {
    createSelector
} from 'reselect';

const getIsLoading = state => state.app.isLoading;
const getDepartmentsCategories = state => state.app.departmentsCategories;
const getSelectedCategory = state => state.app.selectedCategory;
const getSelectedDepartment = state => state.app.selectedDepartment;
const getShowCart = state => state.app.showCart;
const getShippingRegion = state => state.app.shippingRegion;

const getAutoComplete = state => state.app.autoComplete;

const appSelector = createSelector(
    [getIsLoading, getDepartmentsCategories, getSelectedCategory, getSelectedDepartment, getShowCart, getShippingRegion, getAutoComplete],
    (isLoading, departmentsCategories, selectedCategory, selectedDepartment, showCart, shippingRegion, autoComplete) => ({
        autoComplete,
        isLoading,
        departmentsCategories,
        selectedCategory,
        selectedDepartment,
        showCart,
        shippingRegion: shippingRegion.filter(i => i.id != 1).map((sr) => {
            return {
                value: sr.id,
                text: sr.shipping_region,
                shippingOptions: sr.shipping.map((shipping) => {
                    return {
                        value: shipping.id,
                        text: shipping.shipping_type,
                        shipping_cost: shipping.shipping_cost,
                        shipping_region_id: shipping.shipping_region_id

                    }
                })
            }
        })
    })
)

export {
    appSelector
}