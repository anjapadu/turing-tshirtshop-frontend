import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { cartSelector } from '../../selectors';
import Button from '../Button';
import Icon from '../Icon';
import Divider from '../Divider';
import {
    setShowCart,
    removeCartItem
} from '../../actions';


const ItemCart = ({ thumbnail, name, selectedColor, selectedSize, price, discounted_price, quantity, removeCartItem, productKey }) => {
    return <div
        className={"item-cart-container"}
    >
        <div
            className={"item-cart-left"}
        >
            <img
                src={`${IMG_ROUTE}` + thumbnail}
            />
        </div>
        <div
            className={"item-cart-right"}
        >
            <h3>{name} {quantity && quantity > 1 ? <span
                className={"has-text-danger"}
            >x{quantity}</span> : false}</h3>
            <p
                className={"detail"}
            >
                <b>Color: </b> <span
                    className={"capitalize"}
                >{selectedColor}</span>
                <br />
                <b>Size:</b> <span
                >{selectedSize}
                </span>
            </p>
            <Button
                onClick={() => removeCartItem(productKey)}
                className={"is-danger is-rounded is-small not-responsive"}
            >
                <Icon
                    style={{
                        marginRight: 10
                    }}
                    icon={"fa-times"}
                />
                Remove
        </Button>
        </div>
        <div
            className={"price"}
        >
            {discounted_price != 0 && <span
                className={"old-price"}
            >$ {price}</span>}
            $ {discounted_price !== 0 ? discounted_price : price}
        </div>

    </div>
}

class Cart extends PureComponent {
    state = {
        show: false
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                show: true,
                hide: false
            })
        }, 100)
    }
    _renderItems() {
        return Object.keys(this.props.cartItemsNow).map((cartItemKey, index) => {
            return <ItemCart
                key={`_${index}`}
                {...this.props.cartItemsNow[cartItemKey]}
                removeCartItem={this.props.removeCartItem}
            />

        })
    }
    _onCloseCart() {
        this.setState({
            hide: true
        }, () => {
            setTimeout(() => {
                this.props.setShowCart(false);
            }, 250)
        })
    }
    _removeItem() {

    }
    render() {
        const {
            cartItemsNow,
            cartItemsNowCount,
            subTotalCart
        } = this.props;
        return <div
            className={`shopping-cart-detail${this.state.show ? ' is-visible' : ''}${this.state.hide ? ' is-hide' : ''}`}
        >
            <Icon
                onClick={this._onCloseCart.bind(this)}
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    transform: "scale(0.75)"
                }}
                icon={"fa-times fa-2x"}
            />
            <h2>{cartItemsNowCount} Items in Your Cart</h2>
            <div
                className={"item-content"}
            >
                {this._renderItems()}
                {cartItemsNowCount === 0 && <h3
                    style={{
                        margin: '3rem 0px'
                    }}
                    className={"has-text-danger has-text-centered"}
                >You don't have any product yet.</h3>}
            </div>
            <Divider
                style={{
                    marginTop: 10,
                    marginBottom: 10
                }}
                content={" "}
            />
            <div
                className={"total-container"}
            >
                <div
                    className={"left"}
                >
                    <p>SubTotal:</p>
                    <p>Tax:</p>
                    <p>Total:</p>
                </div>
                <div
                    className={"right"}
                >
                    <p>$ {subTotalCart.toFixed(2)}</p>
                    <p>$ 12.52</p>
                    <p
                        className={"has-text-danger"}
                    >$ 132.52</p>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    const {
        cartItemsNow,
        cartItemsNowCount,
        subTotalCart
    } = cartSelector(state);
    return {
        cartItemsNow,
        cartItemsNowCount,
        subTotalCart
    }

}

export default connect(mapStateToProps, {
    setShowCart,
    removeCartItem
})(Cart);