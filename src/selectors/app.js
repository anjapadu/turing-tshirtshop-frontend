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
const getCategories = state => state.app.categories;

const getAttributes = state => state.app.attributes
const getSelectedColor = state => state.app.selectedColor;
const getSelectedSize = state => state.app.selectedSize;
const getSelectedPriceMin = state => state.app.selectedPriceMin;
const getSelectedPriceMax = state => state.app.selectedPriceMax;


const getMin = state => state.app.minPrice;
const getMax = state => state.app.maxPrice;

const maxMinSelector = createSelector(
    [getMin, getMax],
    (minPrice, maxPrice) => ({
        minPrice,
        maxPrice
    })
)

const filtersSelectors = createSelector(
    [getSelectedColor, getSelectedSize, getSelectedPriceMax, getSelectedPriceMin],
    (selectedColor, selectedSize, selectedPriceMax, selectedPriceMin) => ({
        selectedColor,
        selectedSize,
        selectedPriceMax,
        selectedPriceMin,
        isActiveFilters: (selectedColor || selectedSize || selectedPriceMax || selectedPriceMin) != null
    })
)

const appSelector = createSelector(
    [getIsLoading, getDepartmentsCategories, getSelectedCategory, getSelectedDepartment, getShowCart, getShippingRegion, getAutoComplete, getCategories, getAttributes],
    (isLoading, departmentsCategories, selectedCategory, selectedDepartment, showCart, shippingRegion, autoComplete, categories, attributes) => ({
        autoComplete,
        isLoading,
        departmentsCategories,
        selectedCategory,
        selectedDepartment,
        showCart,
        categories,
        attributes,
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
    appSelector,
    maxMinSelector,
    filtersSelectors
}