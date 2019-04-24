import React from 'react';
import Icon from '../Icon';

export default class QuantityPicker extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || 1
        }
        this.props.onChange && this.props.onChange(this.state.value);
        if (this.props.onRef) {
            this.props.onRef(this)
        }
    }
    _onChangeValue(num) {
        if (this.props.value)
            return this.props.onChange && this.props.onChange(this.props.value + num)

        this.setState({
            value: this.state.value + num
        }, () => {
            this.props.onChange && this.props.onChange(this.state.value)
        })
    }
    _onChange({ target }) {
        let value = target.value == '' ? 1 : parseInt(target.value.replace(/[^0-9]+/g, ''));

        if (this.props.value)
            return this.props.onChange && this.props.onChange(value)

        this.setState({
            value
        }, () => {
            this.props.onChange && this.props.onChange(this.state.value)
        })
    }
    render() {
        const { value } = this.state;
        const { isSmall } = this.props;
        return <div
            className={`quantity-picker`}
        >
            <div
                onClick={(this.props.value || value) > 1 ? this._onChangeValue.bind(this, -1) : null}
                className={`_button${(this.props.value || value) <= 1 ? ' disabled' : ''}${isSmall ? ' small' : ''}`}
            >
                <Icon
                    icon={"fa-minus"}
                />
            </div>
            <input
                className={`${isSmall ? 'small' : ''}`}
                onChange={this._onChange.bind(this)}
                value={this.props.value || value}
            />
            <div
                onClick={this._onChangeValue.bind(this, 1)}
                className={`_button${isSmall ? ' small' : ''}`}
            // onClick={}
            >
                <Icon
                    icon={"fa-plus"}
                />
            </div>
        </div >
    }
}