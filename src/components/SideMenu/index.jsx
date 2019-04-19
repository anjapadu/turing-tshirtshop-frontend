import React from 'react';
import { connect } from 'react-redux';
import { appSelector } from '../../selectors/app';
import Input from '../Input';
import Divider from '../Divider';
import {
    setCategory,
    setDepartment
} from '../../actions';

class SideMenu extends React.PureComponent {
    _onSelectDepartment(id, index) {
        const { selectedDepartment } = this.props;
        if (!selectedDepartment || selectedDepartment.id != id)
            return this.props.setDepartment({ id, index })
        this.props.setDepartment(null)
    }
    _onSelectCategory(id, index) {
        const { selectedCategory } = this.props;
        if (!selectedCategory || selectedCategory.id != id)
            return this.props.setCategory({ id, index })
        this.props.setCategory(null)
    }
    _renderDepartments() {
        const { selectedDepartment, departmentsCategories } = this.props;
        return departmentsCategories.map((department, index) => {
            return <li
                className={selectedDepartment && selectedDepartment.id === department.id ? 'is-selected' : ''}
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
            departmentsCategories,
            selectedDepartment
        } = this.props;
        return departmentsCategories[selectedDepartment.index].categories.map((category, index) => {
            return <li
                className={`
                    is-category
                    ${selectedCategory && selectedCategory.id === category.id ? ' is-selected' : ''}
                `}
                key={`_${index}`}
                onClick={this._onSelectCategory.bind(this, category.id, index)}
            >
                <a>{category.name}</a>
            </li>
        })
    }
    render() {
        const {
            selectedDepartment
        } = this.props;
        return <aside className="left-menu">
            <Input
                icon={"fa-search"}
                placeholder={"Search a product"}
            />
            <Divider
                content={"Pick a department"}
            />
            <ul>
                {this._renderDepartments()}
            </ul>
            {selectedDepartment && <Divider
                content={"Pick a category"}
            />}
            {selectedDepartment && <ul>
                {this._renderCategories()}
            </ul>}
        </aside >
    }
}


const mapStateToProps = (state) => {
    const {
        departmentsCategories,
        selectedCategory,
        selectedDepartment
    } = appSelector(state);
    return {
        departmentsCategories,
        selectedCategory,
        selectedDepartment
    }
}

export default connect(mapStateToProps, {
    setCategory,
    setDepartment
})(SideMenu)