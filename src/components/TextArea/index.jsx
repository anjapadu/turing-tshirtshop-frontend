import React, { PureComponent } from 'react';


class TextArea extends PureComponent {
    _onChange() {

    }
    render() {
        const {
            icon,
            placeholder,
            value,
            type,
            isCenter,
            isLarge
        } = this.props;
        return <div className="field">
            <div className={`control${
                icon ? ' has-icons-left' : ''
                }`}
            >
                <textarea

                    className={`input${
                        isLarge ? ' is-medium' : ''
                        }${
                        isCenter ? ' is-center' : ''
                        }`}
                    type={type || "text"}
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

export default TextArea;