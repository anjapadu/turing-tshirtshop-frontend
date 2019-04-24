import React from 'react';
import {
    Switch,
    Route,
    Redirect
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
    ProductDetail,
    Checkout,
} from './asyncRoutes';
import { appSelector, userSelector } from '../selectors';
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
                    component={Home}
                    exact
                />
                <NotLoggedOnlyRoutes
                    path={"/login"}
                    component={Login}
                    isLogged={this.props.isLogged}
                    exact
                />
                <NotLoggedOnlyRoutes
                    isLogged={this.props.isLogged}
                    path={"/register"}
                    component={Register}
                    exact
                />
                <Route
                    path={"/product/:id"}
                    component={ProductDetail}
                    exact
                />
                <ProtectedRoute
                    isLogged={this.props.isLogged}
                    path={"/checkout"}
                    component={Checkout}
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


/**
 * Redirect to home if is already logged
 */
const NotLoggedOnlyRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                return (!rest.isLogged) ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
            }
            }
        />
    )
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
    /**
     * It's posible to handle Roles.
     * var regex = new RegExp(rest.roles, 'g');
     * let hasScope = rest.requiredScope.match(regex) !== null;
     */
    return (
        <Route
            {...rest}
            render={props => {
                return rest.isLogged ?
                    (<Component
                        {...props}
                    />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location }
                            }}
                        />
                    )
            }}
        />
    )
}

const mapStateToProps = (state) => {
    const {
        isLoading,
        showCart,
    } = appSelector(state);
    const {
        isLogged
    } = userSelector(state);
    return {
        isLoading,
        showCart,
        isLogged
    }
}

export default (connect(mapStateToProps, {
    push
})(RouterApp))