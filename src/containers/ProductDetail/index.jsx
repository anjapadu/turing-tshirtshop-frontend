import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Row from '../../components/Row';
import Col from '../../components/Col';
import { goBack } from 'connected-react-router'
import { productDetailSelector } from '../../selectors/productDetail';
import {
    fetchProductDetail,
    fetchRecommendations
} from '../../actions';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import ColorPicker from '../../components/ColorPicker';
import ImageViewer from '../../components/ImageViewer';
import SizePicker from '../../components/SizePicker';
import Input from '../../components/Input';
import QuantityPicker from '../../components/QuantityPicker';
import Reviews from '../../components/Reviews';
import ProductRecomendations from '../../components/ProductRecomendations';

class ProductDetail extends PureComponent {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //Only fetch product if product is != previous product or if it does not exist (i.e. when you load an url of a product as first page.)
        const {
            productDetail,
            fetchProductDetail
        } = this.props;
        const { id } = this.props.match.params;
        if (!productDetail || productDetail.id != id) {
            fetchProductDetail(id);
        }
    }
    renderPrice() {
        const { price, discounted_price } = this.props.productDetail
        if (discounted_price == 0) {
            return <h2
                className={"has-text-danger"}
            >$ {price}</h2>
        }
        return <h2
            className={"has-text-danger"}
        ><span
            className={"is-gray"}
            style={{
                textDecorationLine: 'line-through'
            }}
        >{price}</span> $ {discounted_price}</h2>
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
                        {this.renderPrice()}
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
                        />
                        <h2
                            className={"is-gray"}
                        >Size</h2>
                        <SizePicker
                            sizes={sizes}
                        />
                        <br />
                        <h2
                            className={"is-gray"}
                        >Quantity</h2>
                        <QuantityPicker />

                        <br />
                        <br />
                        <Button
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
    fetchProductDetail,
    goBack,
    fetchRecommendations
})(ProductDetail)