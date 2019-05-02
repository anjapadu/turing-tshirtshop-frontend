import React, { PureComponent } from 'react';
import Icon from '../Icon';

class ColorPicker extends PureComponent {
    constructor(props) {
        super(props);
        this.colors = this.props.colors.split(',');
        this.state = {
            selected: this.props.hasNoneSelector ? null : this.colors[0]
        }
        this.props.onPickColor && !this.props.hasNoneSelector && this.props.onPickColor(this.colors[0]);
        if (this.props.onRef) {
            this.props.onRef(this)
        }
    }
    _onPickColor(selected) {
        let itsSame;
        if (this.props.controlled)
            itsSame = (selected == this.props.value) && this.props.hasNoneSelector;
        else
            itsSame = (selected == this.state.selected) && this.props.hasNoneSelector;
        this.setState({
            selected: itsSame ? null : selected
        }, () => {
            this.props.onPickColor && this.props.onPickColor(itsSame ? null : this.state.selected)
        })
    }
    _renderColors() {
        const { selected } = this.state;
        return (this.colors).map((color, index) => {
            let className;
            if (this.props.controlled) {
                className = `${(color.toUpperCase() === this.props.value) ? ' selected' : ''}`;
            } else {
                className = `${(color === this.state.selected) ? ' selected' : ''}`;
            }
            return <div
                key={`_${index}`}
                onClick={this._onPickColor.bind(this, color)}
                className={`color-item${className}`}
            >
                <Icon
                    icon={`fa-circle ${color.toLowerCase()}`}
                />
            </div>
        })
    }
    render() {
        return <div
            style={this.props.style || {}}
            className={"color-picker"}
        >
            {this._renderColors()}
        </div>
    }
}

export default ColorPicker;