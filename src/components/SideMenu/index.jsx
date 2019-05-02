import React from 'react';
import { connect } from 'react-redux';
import { appSelector, maxMinSelector, filtersSelectors } from '../../selectors/app';
import Input from '../Input';
import Divider from '../Divider';
import {
    setCategory,
    setDepartment,
    setAutoComplete,
    setSelectedPrice,
    setSelectedColor,
    setSelectedSize,
    fetchAutoComplete
} from '../../actions';
import ColorPicker from '../ColorPicker';
import SizePicker from '../SizePicker';
import InputRange from 'react-input-range';

class SideMenu extends React.PureComponent {
    state = {
        price: {
            min: this.props.minPrice,
            max: this.props.maxPrice
        }
    }
    _onSelectDepartment(id, index) {
        const { selectedDepartment } = this.props;
        if (!selectedDepartment || selectedDepartment != id)
            return this.props.setDepartment(id)
        this.props.setDepartment(null)
    }
    _onSelectCategory(id, departmentId) {
        const { selectedCategory } = this.props;
        if (!selectedCategory || selectedCategory != id)
            return this.props.setCategory({ id, departmentId })
        this.props.setCategory({ id: null, departmentId })
    }
    _renderDepartments() {
        const { selectedDepartment, departmentsCategories } = this.props;
        return departmentsCategories.map((department, index) => {
            return <li
                className={selectedDepartment && selectedDepartment == department.id ? 'is-selected' : ''}
                key={`_${index}`}
                onClick={this._onSelectDepartment.bind(this, department.id, index)}
            >
                <a>{department.name}</a>
            </li>
        })
    }
    _renderCategories() {
        const {
            selectedCategory,
            categories,
            selectedDepartment
        } = this.props;
        return categories.map((category, index) => {
            return <li
                className={`
                    is-category
                    ${selectedDepartment && selectedDepartment == category.departmentId ? ' selected-department' : ''}
                    ${selectedCategory && selectedCategory == category.id ? ' is-selected' : ''}
                `}
                key={`_${index}`}
                onClick={this._onSelectCategory.bind(this, category.id, category.departmentId)}
            >
                <a>{category.name}</a>
            </li>
        })
    }
    _onAutoComplete(value) {
        this.props.setAutoComplete(value);
        if (value.length >= 3 || value.length === 0) {
            this.props.fetchAutoComplete()
        }
    }
    _onPickColor(value) {
        this.props.setSelectedColor(value)
    }
    _onPickSize(value) {
        this.props.setSelectedSize(value)
    }
    _onChangeComplete({ min, max }) {
        this.props.setSelectedPrice({
            min,
            max
        })
    }
    render() {
        const {
            attributes,
            autoComplete,
            maxPrice,
            minPrice
        } = this.props;
        return <aside className="left-menu">
            <Input
                value={autoComplete || ''}
                onChange={this._onAutoComplete.bind(this)}
                icon={"fa-search"}
                placeholder={"Search a product"}
            />

            <Divider
                content={"Departments"}
            />
            <ul>
                {this._renderDepartments()}
            </ul>
            <Divider
                content={"Categories"}
            />
            <ul>
                {this._renderCategories()}
            </ul>
            <Divider
                content={"Other filters"}
            />
            <small
                style={{
                    fontFamily: 'Montserrat'
                }}
            >Choose a color:</small>
            <ColorPicker
                controlled
                style={{
                    background: '#f7f7f7',
                    marginTop: 10
                }}
                colors={attributes["color"]}
                hasNoneSelector
                onPickColor={this._onPickColor.bind(this)}
                value={this.props.selectedColor}
            />
            <br />
            <small
                style={{
                    fontFamily: 'Montserrat'
                }}
            >Choose a Size:</small>
            <SizePicker
                controlled
                value={this.props.selectedSize}
                onPickSize={this._onPickSize.bind(this)}
                hasNoneSelector
                sizes={attributes["size"]}
            />
            <br />
            <small
                style={{
                    fontFamily: 'Montserrat'
                }}
            >Price range:</small>
            <br />
            <br />
            <InputRange
                maxValue={maxPrice}
                minValue={minPrice}
                formatLabel={value => `$${value}`}
                value={this.state.price}
                onChange={value => this.setState({ price: value })}
                onChangeComplete={this._onChangeComplete.bind(this)} />
            <br />
            <br />
            <br />
        </aside >
    }
}


const mapStateToProps = (state) => {
    const {
        departmentsCategories,
        selectedCategory,
        selectedDepartment,
        categories,
        autoComplete,
        attributes
    } = appSelector(state);
    const {
        maxPrice,
        minPrice
    } = maxMinSelector(state)
    const {
        selectedColor,
        selectedSize,
        selectedPriceMax,
        selectedPriceMin
    } = filtersSelectors(state)
    return {
        autoComplete,
        departmentsCategories,
        selectedCategory,
        categories,
        selectedDepartment,
        attributes,
        maxPrice,
        minPrice,
        selectedColor,
        selectedSize,
        selectedPriceMax,
        selectedPriceMin
    }
}

export default connect(mapStateToProps, {
    setCategory,
    setDepartment,
    setAutoComplete,
    fetchAutoComplete,
    setSelectedPrice,
    setSelectedColor,
    setSelectedSize,
})(SideMenu)