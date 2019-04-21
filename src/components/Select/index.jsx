import React, { PureComponent } from 'react';


class Select extends PureComponent {
    componentDidMount() {
        this.props.onChange && this.props.onChange(this.props.options[0])
    }
    _renderOptions() {
        return this.props.options.map((option, index) => {
            return <option
                key={`_${index}`}
                value={option}
            >{option}</option>
        })
    }
    _onChange(e) {
        this.props.onChange && this.props.onChange(e.target.value);
    }
    render() {
        return <div className="select is-rounded">
            <select
                onChange={this._onChange.bind(this)}
            >
                {this._renderOptions()}
            </select>
        </div>
    }
}

export default Select;