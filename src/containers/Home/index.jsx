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
    setSelectedColor,
    setSelectedPrice,
    setSelectedSize
} from '../../actions'
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import { filtersSelectors } from '../../selectors/app';
import Icon from '../../components/Icon';

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
                                {this.props.isActiveFilters && <div
                                    style={{
                                        marginLeft: 20,
                                        marginBottom: 20
                                    }}
                                >
                                    <h3
                                        className={"has-text-danger"}
                                    >Filters:</h3>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',

                                        }}
                                    >
                                        {this.props.selectedColor && <div
                                            className={"filter-helper"}
                                        >
                                            {this.props.selectedColor}
                                            <Icon
                                                icon="fa-times"
                                                onClick={() => this.props.setSelectedColor(null)}
                                            />
                                        </div>}
                                        {this.props.selectedSize && <div
                                            className={"filter-helper"}
                                        >
                                            {this.props.selectedSize}
                                            <Icon
                                                icon="fa-times"
                                                onClick={() => this.props.setSelectedSize(null)}
                                            />
                                        </div>}
                                        {this.props.selectedPriceMin && <div
                                            className={"filter-helper"}
                                        >
                                            {`$${this.props.selectedPriceMin}.00 - $${this.props.selectedPriceMax}.00`}
                                            <Icon
                                                icon="fa-times"
                                                onClick={() => this.props.setSelectedPrice({
                                                    min: null,
                                                    max: null
                                                })}
                                            />
                                        </div>}

                                    </div>
                                </div>}
                                {productsCount > 0 && < Pagination
                                    page={selectedPage}
                                    onChangePage={this.props.fetchProductPage}
                                    pages={Math.ceil(productsCount / 12)}
                                />}
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

const mapStateToProps = (state, props) => {
    // console.log({ props })
    const {
        productList,
        productsCount,
        isLoadingProducts,
        selectedPage
    } = productsSelector(state);

    const {
        selectedPriceMin,
        selectedPriceMax,
        selectedSize,
        selectedColor,
        isActiveFilters
    } = filtersSelectors(state);

    return {
        isLoadingProducts,
        productList,
        productsCount,
        selectedPage,
        isActiveFilters,
        selectedPriceMin,
        selectedPriceMax,
        selectedSize,
        selectedColor
    }
}

export default connect(mapStateToProps, {
    fetchProductPage,
    setSelectedColor,
    setSelectedPrice,
    setSelectedSize,
    push
})(Home);