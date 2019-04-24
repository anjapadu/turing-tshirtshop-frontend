import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import ProductCard from '../../components/ProductCard';
import SideMenu from '../../components/SideMenu';
import Row from '../../components/Row';
import Col from '../../components/Col';
import { productsSelector } from '../../selectors/products';
import {
    fetchProductPage,
} from '../../actions'
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';

class Home extends PureComponent {
    _renderProducts() {
        if (this.props.productList.length === 0) {
            return <h2>We could not find products for this search :C</h2>
        }
        return this.props.productList.map((product, index) => {
            return <ProductCard
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
                        /> : <div
                            style={{
                                width: '100%'
                            }}
                        >
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
        selectedPage,

    }
}

export default connect(mapStateToProps, {
    fetchProductPage,
    push
})(Home);