import React, { PureComponent } from 'react';


class Select extends PureComponent {

    _renderOptions() {
        return this.props.options.map((option, index) => {
            return <option
                key={`_${index}`}
                value={option}
            >{option}</option>
        })
    }
    render() {
        return <div className="select is-rounded">
            <select>
                <option>{this.props.placeholder || 'Pick an option'}</option>
                {this._renderOptions()}
            </select>
        </div>
    }
}

export default Select;