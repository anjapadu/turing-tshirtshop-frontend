import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Card from '../../components/Card';
import SideMenu from '../../components/SideMenu'
import Row from '../../components/Row';
import Col from '../../components/Col';
import { productsSelector } from '../../selectors/products';

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
        return <React.Fragment>
            <Row>
                <Col
                    size={"is-3"}
                >
                    <SideMenu />
                </Col>
                <Col>
                    <div
                        className={"home-container"}
                    >
                        {this._renderProducts()}
                    </div>
                </Col>
            </Row>

        </React.Fragment>
    }
}

const mapStateToProps = state => {
    const { productList } = productsSelector(state);
    return {
        productList
    }
}

export default connect(mapStateToProps, {

})(Home);