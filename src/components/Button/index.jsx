import React, { PureComponent } from 'react';

class Button extends PureComponent {
    renderColor() {
        switch (this.props.color) {
            case 'green':
                return ' is-success'
            case 'blue':
                return ' is-link';
            default:
                return ''
        }
    }
    _onClick() {
        this.props.onClick && this.props.onClick();
    }
    render() {
        return <a
            disabled={this.props.disabled}
            onClick={this._onClick.bind(this)}
            className={`
            button
            ${this.props.isLarge ? ' is-large' : ''}
            ${this.renderColor()}
            ${this.props.className ? ` ${this.props.className}` : ''}`}
            style={{
                width: this.props.isFluid ? '100%' : null,
                ...(this.props.style || {})
            }}
        >{this.props.children || this.props.text}</a>
    }
}

export default Button;