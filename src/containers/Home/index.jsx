import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ProductCard from '../../components/ProductCard';
import SideMenu from '../../components/SideMenu';
import Row from '../../components/Row';
import Col from '../../components/Col';
import { productsSelector } from '../../selectors/products';
import {
    fetchProductPage,
    addProductToCart
} from '../../actions'
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';

class Home extends PureComponent {
    _onAddProduct(product) {
        this.props.addProductToCart({
            ...product,
        });
    }
    _renderProducts() {
        return this.props.productList.map((product, index) => {
            return <ProductCard
                onClickAdd={this._onAddProduct.bind(this)}
                key={`_${index}`}
                product={product}
            />
        })
    }
    render() {
        const {
            isLoadingProducts,
            selectedPage,
            productsCount
        } = this.props;
        return <React.Fragment>
            <Row
                noGap
            >
                <Col
                    size={"is-3 is-hidden-mobile"}
                >
                    <SideMenu />
                </Col>
                <Col>
                    <div
                        className={"home-container"}
                    >
                        {isLoadingProducts ? <Loader
                            isPartialLoader
                        /> : <div>
                                <Pagination
                                    page={selectedPage}
                                    onChangePage={this.props.fetchProductPage}
                                    pages={Math.ceil(productsCount / 12)}
                                />
                                <br />
                                <div
                                    className={"products-container"}
                                >
                                    {this._renderProducts()}
                                </div>
                            </div>}

                    </div>
                </Col>
            </Row>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    const {
        productList,
        productsCount,
        isLoadingProducts,
        selectedPage
    } = productsSelector(state);
    return {
        isLoadingProducts,
        productList,
        productsCount,
        selectedPage
    }
}

export default connect(mapStateToProps, {
    fetchProductPage,
    addProductToCart
})(Home);