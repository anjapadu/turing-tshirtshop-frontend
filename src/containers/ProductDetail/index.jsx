import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Row from '../../components/Row';
import Col from '../../components/Col';
import { goBack, push } from 'connected-react-router'
import { productDetailSelector } from '../../selectors/productDetail';
import {
    fetchProductDetail,
    addProductToCart,
    fetchRecommendations
} from '../../actions';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import ColorPicker from '../../components/ColorPicker';
import ImageViewer from '../../components/ImageViewer';
import SizePicker from '../../components/SizePicker';
import QuantityPicker from '../../components/QuantityPicker';
import Reviews from '../../components/Reviews';
import ProductRecomendations from '../../components/ProductRecomendations';
import { NotificationAddProduct } from '@utils';
class ProductDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            color: null,
            size: null,
            quantity: null
        }
    }
    componentDidMount() {
        //Only fetch product if product is != previous product or if it does not exist (i.e. when you load an url of a product as first page.)
        const {
            productDetail,
            fetchProductDetail,
            fetchRecommendations
        } = this.props;
        const { id } = this.props.match.params;
        if (!productDetail || productDetail.id != id) {
            fetchProductDetail(id);
        } else {
            fetchRecommendations({
                categoryId: productDetail.categoryId,
                departmentId: productDetail.departmentId,
                id: productDetail.id,
            })
        }
    }
    _renderPrice() {
        const { price, discounted_price } = this.props.productDetail
        if (discounted_price == 0) {
            return <h2
                className={"has-text-danger"}
            >$ {price.toFixed(2)}</h2>
        }
        return <h2
            className={"has-text-danger"}
        ><span
            className={"is-gray"}
            style={{
                textDecorationLine: 'line-through'
            }}
        >$ {price.toFixed(2)}</span> $ {discounted_price.toFixed(2)}</h2>
    }
    _onAddToCart() {
        const {
            color,
            size,
            quantity
        } = this.state;

        this.props.addProductToCart({
            ...this.props.productDetail,
            productKey: `${this.props.productDetail.id}_${color}_${size}`,
            selectedColor: color,
            selectedSize: size,
            quantity
        })
        NotificationAddProduct(this.props.productDetail)
        this.props.push('/')
    }
    _onPickColor(color) {
        this.setState({
            color
        })
    }
    _onPickSize(size) {
        this.setState({
            size
        })
    }
    _onChangeQuantity(quantity) {
        this.setState({
            quantity
        })
    }
    render() {
        const {
            isLoadingProductDetails,
            productDetail,
            recommendationList
        } = this.props;
        if (isLoadingProductDetails) {
            return <Loader
                style={{
                    height: '100%'
                }}
                isPartialLoader
            />
        }
        if (!productDetail) {
            return <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <h2
                    className={"has-text-danger"}
                >We are sorry we could not find the product you are looking for.</h2>
                <br />
                <Button
                    onClick={this.props.goBack}
                    className={"is-danger is-rounded is-medium"}
                >
                    <Icon
                        style={{
                            marginRight: 10
                        }}
                        icon={"fa-arrow-left"}
                    />
                    Go back
                </Button>
            </div>
        }
        const {
            image,
            image_2,
            description,
            colors,
            name,
            sizes
        } = this.props.productDetail;
        return <React.Fragment>
            <div
                style={{
                    background: '#fff',
                    // height: '100%',
                    width: '95%',
                    margin: "1% 2.5%",
                    paddingBottom: 100,
                    boxShadow: '0px 0px 0px 2px rgba(0,0,0,0.05)'
                }}
            >
                <Row
                    noGap
                >
                    <Col
                        size={"is-4"}
                    >
                        <ImageViewer
                            images={[image, image_2]}
                        />
                    </Col>
                    <Col
                        size={"is-8"}
                    >
                        <h2
                            className={"is-size-2"}
                        >{name}</h2>
                        <p
                            className={"is-size-5"}
                        >{description}</p>
                        <br />
                        {this._renderPrice()}
                        <br />
                        <h2
                            className={"is-gray"}
                        >Color</h2>
                        <ColorPicker
                            style={{
                                justifyContent: 'flex-start',
                                paddingLeft: 0,
                                paddingRight: 0
                            }}
                            colors={colors}
                            onPickColor={this._onPickColor.bind(this)}
                        />
                        <h2
                            className={"is-gray"}
                        >Size</h2>
                        <SizePicker
                            sizes={sizes}
                            onPickSize={this._onPickSize.bind(this)}
                        />
                        <br />
                        <h2
                            className={"is-gray"}
                        >Quantity</h2>
                        <QuantityPicker
                            onChange={this._onChangeQuantity.bind(this)}
                        />

                        <br />
                        <br />
                        <Button
                            onClick={this._onAddToCart.bind(this)}
                            className={"is-rounded is-danger is-large"}
                            text={"Add to Cart"}
                        />
                    </Col>
                </Row>
                <div
                    className={"is-gray-background"}
                    style={{
                        padding: '3rem 1rem'
                    }}
                >
                    <Row
                        noGap
                    >
                        <Col>
                            <h2
                                className={"is-size-2"}
                            >Product Reviews</h2>
                            <Reviews />
                        </Col>
                    </Row>
                </div>
                <div
                    style={{
                        padding: '3rem 1rem'
                    }}
                >
                    <h2
                        className={"is-size-2"}
                    >You may also like</h2>
                    <div>
                        <ProductRecomendations
                            products={recommendationList}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => {
    const {
        isLoadingProductDetails,
        productReview,
        productDetail,
        recommendationList
    } = productDetailSelector(state);
    return {
        isLoadingProductDetails,
        productReview,
        productDetail,
        recommendationList
    }
}

export default connect(mapStateToProps, {
    addProductToCart,
    fetchProductDetail,
    fetchRecommendations,
    goBack,
    push
})(ProductDetail)