import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Card from '../../components/Card';
import SideMenu from '../../components/SideMenu'
import Row from '../../components/Row';
import Col from '../../components/Col';
import { productsSelector } from '../../selectors/products';
import {
    fetchProductPage
} from '../../actions'
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';

class Home extends PureComponent {

    _renderProducts() {
        return this.props.productList.map((product, index) => {
            return <Card
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
                style={{
                    marginTop: 50
                }}
            >
                <Col
                    size={"is-3"}
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
                                    pages={Math.ceil(productsCount / 9)}
                                    style={{
                                        marginLeft: 20
                                    }}
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
    fetchProductPage
})(Home);