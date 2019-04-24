import React, { PureComponent } from 'react';


class Select extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        if (!this.props.disableAutoselect)
            this.props.onChange && this.props.onChange(this.props.options[0])
    }
    _renderOptions() {
        return this.props.options.map((option, index) => {

            if (this.props.isObjectOptions) {
                return <option
                    key={`_${index}`}
                    value={option.value}
                    index={index}
                >{option.text}</option>
            }
            return <option
                key={`_${index}`}
                value={option}
            >{option}</option>
        })
    }
    _onChange(e) {
        if (this.props.isObjectOptions) {
            return this.props.onChange && this.props.onChange({
                value: e.target.value,
                index: e.target.selectedOptions[0].getAttribute('index')
            })
        }
        this.props.onChange && this.props.onChange(e.target.value);
    }
    render() {
        return <div className={`select ${this.props.isRounded ? ' is-rounded' : ''}${this.props.isForm ? ' is-form' : ''}`}>
            <select
                onChange={this._onChange.bind(this)}
                value={this.props.value || undefined}
            >
                {this.props.hasSelectOption && <option unselectable={"on"}>Select option</option>}
                {this._renderOptions()}
            </select>
        </div>
    }
}

export default Select;