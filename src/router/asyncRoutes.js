import React from 'react';
import Loadable from 'react-loadable';

const withLoader = (loader) => ({
    ...loader,
    loading: () => <div className="pageloader is-active is-dark"><span className="title">Loading...</span></div>
})

export const Home = Loadable(
    withLoader({
        loader: () => import(/* webpackChunkName: "home" */'../containers/Home')
    })
)

export const Login = Loadable(
    withLoader({
        loader: () => import(/* webpackChunkName: "login" */'../containers/Login')
    })
)

export const Register = Loadable(
    withLoader({
        loader: () => import(/* webpackChunkName: "register" */'../containers/Register')
    })
)

export const ProductDetail = Loadable(
    withLoader({
        loader: () => import(/* webpackChunkName: "productdetail" */'../containers/ProductDetail')
    })
)