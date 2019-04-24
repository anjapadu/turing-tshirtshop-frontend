import React from 'react';
import Icon from '../Icon';

export default class QuantityPicker extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        }
        this.props.onChange && this.props.onChange(this.state.value);
        if (this.props.onRef) {
            this.props.onRef(this)
        }
    }
    _onChangeValue(num) {
        this.setState({
            value: this.state.value + num
        }, () => {
            this.props.onChange && this.props.onChange(this.state.value)
        })
    }
    _onChange({ target }) {
        this.setState({
            value: target.value == '' ? 1 : parseInt(target.value.replace(/[^0-9]+/g, ''))
        }, () => {
            this.props.onChange && this.props.onChange(this.state.value)
        })
    }
    render() {
        const { value } = this.state;
        return <div
            className={"quantity-picker"}
        >
            <div
                onClick={value > 1 ? this._onChangeValue.bind(this, -1) : null}
                className={`_button${value <= 1 ? ' disabled' : ''}`}
            >
                <Icon
                    icon={"fa-minus"}
                />
            </div>
            <input
                onChange={this._onChange.bind(this)}
                value={this.props.value || value}
            />
            <div
                onClick={this._onChangeValue.bind(this, 1)}
                className={"_button"}
            // onClick={}
            >
                <Icon
                    icon={"fa-plus"}
                />
            </div>
        </div >
    }
}