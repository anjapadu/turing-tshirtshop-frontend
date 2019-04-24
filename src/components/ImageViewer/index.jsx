import React, { PureComponent } from 'react';

export default class ImageViewer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            tall: false
        }
    }
    _onChangeImage(selected) {
        this.setState({
            selected
        })
    }
    _onLoadImage({ target }) {
        this.setState({
            tall: target.naturalWidth / target.naturalHeight > 1 ? false : true
        })
    }
    render() {
        const { images } = this.props;
        return <div
            className={"image-viewer-container"}
        >
            <div
                className={"image-show"}
            >
                <img
                    className={`${this.state.tall ? ' tall' : ' wide'}`}
                    src={`${IMG_ROUTE}${images[this.state.selected]}`}
                    onLoad={this._onLoadImage.bind(this)}
                />
            </div>
            <div
                className={"image-list"}
            >
                {images.map((item, index) => {
                    return <div
                        onClick={this._onChangeImage.bind(this, index)}
                        className={`image-item${this.state.selected === index ? ' selected' : ''}`}
                        key={`_${index}`}
                    >
                        <img
                            src={`${IMG_ROUTE}${item}`}
                        />
                    </div>
                })}
            </div>
        </div>
    }
}   