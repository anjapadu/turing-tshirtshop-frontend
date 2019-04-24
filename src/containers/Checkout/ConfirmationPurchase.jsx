import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { cartSelector, appSelector } from '../../selectors';
import { capitalize } from '@utils';
import Button from '../../components/Button';
import QuantityPicker from '../../components/QuantityPicker';
import { checkoutSelector } from '../../selectors/checkout';
import {
    changeProductQuantity,
    removeCartItem
} from '../../actions';

class ConfirmationPurchase extends PureComponent {
    _onChangeQuantity(key, value) {
        this.props.changeProductQuantity({
            productKey: key,
            value
        })
    }
    renderItems() {
        return Object.keys(this.props.cartItemsNow).map((cartItem, index) => {

            let item = this.props.cartItemsNow[cartItem];
            const { price, discounted_price } = item;
            let _price = (price * (item.quantity || 1)).toFixed(2);
            let _discounted_price = (discounted_price * (item.quantity || 1)).toFixed(2)
            return <div
                className={"confirmation-item"}
                key={`_${index}`}
            >
                <div
                    className={"left"}
                >
                    <img
                        src={`${IMG_ROUTE}${item.thumbnail}`}
                    />
                </div>
                <div
                    className={"center"}
                >
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p
                    >
                        <b>Color:</b>
                        {capitalize(item.selectedColor)}
                    </p>
                    <p>
                        <b>Size:</b>
                        {item.selectedSize}
                    </p>
                </div>
                <div
                    className={"right"}
                >

                    <h3
                        className={"has-text-danger"}
                    >$ {item.discounted_price != 0 ? _discounted_price : _price}</h3>
                    <QuantityPicker
                        value={item.quantity || 1}
                        isSmall
                        onChange={this._onChangeQuantity.bind(this, cartItem)}
                    />
                    <Button
                        disabled={Object.keys(this.props.cartItemsNow).length == 1}
                        onClick={() => {
                            if (Object.keys(this.props.cartItemsNow).length > 1)
                                this.props.removeCartItem(cartItem)
                        }}
                        text={"Remove"}
                        className={"is-danger is-rounded is-small"}
                    />
                </div>
            </div>
        })
    }
    renderTotal() {

    }
    render() {
        const {
            shippingRegion,
            shipping_id,
            shipping_region_id,
            subTotalCart,
        } = this.props;
        const { shipping_cost } = shippingRegion[shipping_region_id.index].shippingOptions[shipping_id.index];
        return <React.Fragment>
            {this.renderItems()}
            <div
                className={"resume-container"}
            >
                <div
                    className={"total-item"}
                >
                    <h2>SubTotal: </h2>
                    <h2
                    >$ {subTotalCart.toFixed(2)} </h2>
                </div>
                <div
                    className={"total-item"}
                >
                    <h2>Shipping: </h2>
                    <h2
                    >$ {shipping_cost.toFixed(2)} </h2>
                </div>
                <hr />
                <div
                    className={"total-item"}
                >
                    <h2>Total: </h2>
                    <h2
                        className={"has-text-danger"}
                    >$ {(subTotalCart + shipping_cost).toFixed(2)} </h2>
                </div>
            </div>
        </React.Fragment>
    }
}


const mapStateToProps = (state) => {
    const {
        cartItemsNow,
        subTotalCart,
        cartItemsNowCount
    } = cartSelector(state);
    const {
        shippingRegion
    } = appSelector(state);
    const {
        shipping_id,
        shipping_region_id
    } = checkoutSelector(state);
    return {
        cartItemsNowCount,
        cartItemsNow,
        subTotalCart,
        shippingRegion,
        shipping_id,
        shipping_region_id
    }
}


export default connect(mapStateToProps, {
    changeProductQuantity,
    removeCartItem
})(ConfirmationPurchase)