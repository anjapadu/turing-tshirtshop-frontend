import React from 'react';
import { connect } from 'react-redux';
import { cartSelector } from '../../selectors/cart';

const mapStateToProps = (state) => {
    const {
        cartItemsNowCount
    } = cartSelector(state);
    return {
        cartItemsNowCount
    };
}

export default connect(mapStateToProps)(({ cartItemsNowCount }) => (<div
    className={"cart-helper" + (cartItemsNowCount === 0 ? ' hide' : '')}
>
    {cartItemsNowCount}
</div>))