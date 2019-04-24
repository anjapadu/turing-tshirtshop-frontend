import React, { PureComponent } from 'react';


class Input extends PureComponent {
    _onChange(e) {
        this.props.onChange && this.props.onChange(e.target.value);
    }
    render() {
        const {
            icon,
            placeholder,
            value,
            type,
            isCenter,
            isLarge,
            autoComplete
        } = this.props;
        return <div className="field">
            <div className={`control${
                icon ? ' has-icons-left' : ''
                }`}
            >
                <input
                    onFocus={this.props.onFocus || null}
                    autoComplete={autoComplete || null}
                    type={this.props.type || 'text'}
                    className={`input${
                        isLarge ? ' is-medium' : ''
                        }${
                        isCenter ? ' is-center' : ''
                        }`}
                    placeholder={placeholder || "Placeholder"}
                    value={value || ""}
                    onChange={this._onChange.bind(this)}

                />
                {icon ? <span className="icon is-small is-left">
                    <i className={`fas ${icon} fa-xs`}></i>
                </span> : false}
            </div>
        </div>

    }
}

export default Input;