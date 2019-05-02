import React, { PureComponent } from 'react';


export default class SizePicker extends PureComponent {
    constructor(props) {
        super(props);
        this.sizes = this.props.sizes.split(',');
        this.state = {
            selected: this.props.hasNoneSelector ? null : this.sizes[0]
        }
        this.props.onPickSize && !this.props.hasNoneSelector && this.props.onPickSize(this.sizes[0]);
        if (this.props.onRef) {
            this.props.onRef(this)
        }
    }
    _onPickSize(selected) {

        let itsSame;
        if (this.props.controlled)
            itsSame = (selected == this.props.value) && this.props.hasNoneSelector;
        else
            itsSame = (selected == this.state.selected) && this.props.hasNoneSelector;
        this.setState({
            selected: itsSame ? null : selected
        }, () => {
            this.props.onPickSize && this.props.onPickSize(itsSame ? null : this.state.selected)
        })
    }
    _renderSizes() {
        return this.sizes.map((size, index) => {

            let className;
            if (this.props.controlled) {
                className = `${(size === this.props.value) ? ' selected' : ''}`;
            } else {
                className = `${(size === this.state.selected) ? ' selected' : ''}`;
            }
            return <div
                key={`_${index}`}
                className={`size-item${className}`}
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