import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import app from './app'
import user from './user'
import cart from './cart'
import products from './products'
import productDetail from './productDetail'
import checkout from './checkout'

export default (history) => combineReducers({
    router: connectRouter(history),
    app,
    user,
    cart,
    products,
    productDetail,
    checkout,
}); 