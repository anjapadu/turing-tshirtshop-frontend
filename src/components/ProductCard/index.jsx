import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Button from '../Button';
import ColorPicker from '../ColorPicker';
import Select from '../Select';
import {
    addProductToCart,
    setProductDetail
} from '../../actions'

const BackFace = ({ children }) => {
    return (<div
        className={"card-backface"}
    >
        <div className={"overlay"} />
        <div
            className={"backface-content"}
        >
            {children}
        </div>

    </div>)
}
class ProductCard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedSize: ''
        }
    }
    _renderPrice() {
        const {
            price,
            discounted_price
        } = this.props.product;
        if (discounted_price === 0) {
            return <p
                className={"has-text-danger price"}
            >
                <span>
                    $ {price || "00.00"}
                </span>
            </p>
        }
        return <p>
            <span
                className={"price disabled"}
            >$ {price}</span>
            <br />
            <span
                className={"hast-text-danger price"}
            >$ {discounted_price}</span>
        </p>
    }
    _onSelectItem() {
        const { selected: selectedColor } = this._colorPicker.state;
        const { selectedSize } = this.state;
        const { id } = this.props.product;
        this.props.addProductToCart({
            ...this.props.product,
            productKey: `${id}_${selectedColor}_${selectedSize}`,
            selectedColor,
            selectedSize
        })
    }
    _onChangeSize(selectedSize) {
        this.setState({
            selectedSize
        })
    }
    _onViewDetails() {
        this.props.setProductDetail({
            ...this.props.product
        })
        this.props.push(`/product/${this.props.product.id}`)
    }
    render() {
        const {
            product: {
                name,
                description,
                price,
                discounted_price,
                image,
                image_2,
                thumbnail,
                display,
                categoryName,
                categoryId,
                departmentId,
                departmentName,
                sizes,
                colors
            }
        } = this.props;
        return (<div className="card is-product">
            <div className="card-image">
                <figure className="image">
                    <img src={`${IMG_ROUTE}${image}`} alt="Placeholder image" />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content has-text-centered">
                        <p className="title is-4">{name || "Product Name"}</p>
                    </div>
                </div>

                <div className="content has-text-centered">
                    {this._renderPrice()}
                </div>
            </div>

            <BackFace>
                <h2>{name || "Product Name"}</h2>
                <h2
                    className={"has-text-danger is-size-4"}
                >$ {discounted_price === 0 ? price : discounted_price}</h2>


                <div
                    className={"is-flex-column"}
                >
                    <ColorPicker
                        onRef={ref => this._colorPicker = ref}
                        colors={colors}
                    />
                    <div>
                        <Select
                            onChange={this._onChangeSize.bind(this)}
                            placeholder={"Size"}
                            options={sizes.split(',')}
                        />
                        <Button
                            style={{
                                marginLeft: 10
                            }}
                            text={"Buy now"}
                            className={"is-danger is-rounded"}
                        />
                    </div>
                </div>
                <div>
                    <Button
                        onClick={this._onSelectItem.bind(this)}
                        text={"Add to cart"}
                        className={"is-danger is-rounded is-outlined"}
                    />
                    <Button
                        onClick={this._onViewDetails.bind(this)}
                        style={{
                            marginLeft: 10
                        }}
                        text={"More"}
                        className={"is-danger is-rounded"}
                    />
                </div>
            </BackFace>
        </div>)
    }
}

export default connect(undefined, {
    addProductToCart,
    setProductDetail,
    push
})(ProductCard);