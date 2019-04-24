import React, { PureComponent } from 'react';
import Icon from '../Icon';

class ColorPicker extends PureComponent {
    constructor(props) {
        super(props);
        this.colors = this.props.colors.split(',');
        this.state = {
            selected: this.colors[0]
        }
        this.props.onPickColor && this.props.onPickColor(this.colors[0]);
        if (this.props.onRef) {
            this.props.onRef(this)
        }
    }
    _onPickColor(selected) {
        this.setState({
            selected
        }, () => {
            this.props.onPickColor && this.props.onPickColor(this.state.selected)
        })
    }
    _renderColors() {
        const { selected } = this.state;
        return (this.colors).map((color, index) => {
            return <div
                key={`_${index}`}
                onClick={this._onPickColor.bind(this, color)}
                className={`color-item${selected === color ? ' selected' : ''}`}
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