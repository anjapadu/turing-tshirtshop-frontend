import { appSelector } from '../app';

describe('app selector', () => {
    it('it should select correct fields', () => {
        expect(appSelector({
            app: {
                isLoading: true,
                departmentsCategories: [],
                shippingRegion: [],
                selectedDepartment: null,
                selectedCategory: null,
                showCart: false,
                autoComplete: ''
            }
        })).toEqual({
            isLoading: true,
            departmentsCategories: [],
            shippingRegion: [],
            selectedDepartment: null,
            selectedCategory: null,
            showCart: false,
            autoComplete: ''
        })
    })

})