import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
    withRouter
} from 'react-router-dom';
import { } from '../actions';
import { push } from 'connected-react-router';
import {
    Home,
    Login,
    Register,
} from './asyncRoutes';
import { appSelector } from '../selectors';
import TopBar from '../components/TopBar';
import Loader from '../components/Loader';
import Cart from '../components/Cart';

class RouterApp extends React.Component {
    render() {
        return (<Layout
            {...this.props}
        >
            <Switch>
                <Route
                    path={"/"}
                    component={() => <Home />}
                    exact
                />
                <Route
                    path={"/login"}
                    component={() => <Login />}
                    exact
                />
                <Route
                    path={"/register"}
                    component={() => <Register />}
                    exact
                />
            </Switch>
            {this.props.showCart && <Cart />}
        </Layout >)
    }
}

export const Layout = withRouter((props) => {
    return (<React.Fragment>
        <TopBar
            push={props.push}
        />

        <div
            className={'route-container'}
            style={{
                flex: 1,
                flexDirection: 'column',
                height: '100%',
                display: 'flex',
                alignItems: 'flex-start'
            }}
        >
            {props.isLoading ? <Loader /> : props.children}
        </div>
    </React.Fragment >)
})

const mapStateToProps = (state) => {
    const {
        isLoading,
        showCart
    } = appSelector(state);
    return {
        isLoading,
        showCart
    }
}

export default (connect(mapStateToProps, {
    push
})(RouterApp))