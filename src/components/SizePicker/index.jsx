import React, { PureComponent } from 'react';


export default class SizePicker extends PureComponent {
    constructor(props) {
        super(props);
        this.sizes = this.props.sizes.split(',');
        this.state = {
            selected: this.sizes[0]
        }
        if (this.props.onRef) {
            this.props.onRef(this)
        }
    }
    _onPickSize(selected) {
        this.setState({
            selected
        }, () => {
            this.props.onPickSize && this.props.onPickSize(this.state.selected)
        })
    }
    _renderSizes() {
        return this.sizes.map((size, index) => {
            return <div
                key={`_${index}`}
                className={`size-item${size === this.state.selected ? ' selected' : ''}`}
                onClick={this._onPickSize.bind(this, size)}
            >
                {size}
            </div>
        })
    }
    render() {
        return <div
            className={"size-picker"}
        >
            {this._renderSizes()}
        </div>
    }
}