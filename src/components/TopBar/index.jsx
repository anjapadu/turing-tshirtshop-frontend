import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import img from '../../images/tshirtshop.png';
import Icon from '../Icon';
import CartItem from '../CartItem';
import { cartSelector } from '../../selectors/cart';
import { setShowCart, signOut } from '../../actions';
import { userSelector } from '../../selectors';
import { capitalize } from '@utils';

const mapStateToProps = state => {
    const {
        subTotalCart
    } = cartSelector(state);
    const {
        name,
        isLogged
    } = userSelector(state)
    return {
        name,
        isLogged,
        subTotalCart
    }
}

export default connect(mapStateToProps, {
    setShowCart,
    signOut
})(({ subTotalCart, setShowCart, push, isLogged, name, signOut }) => {
    return <div>
        <nav className="navbar is-white" role="navigation" aria-label="main navigation">
            <div
                className="navbar-brand"
                onClick={() => push('/')}
            >
                <a
                    className="navbar-item"
                    style={{
                        paddingTop: 0,
                        paddingBottom: 0
                    }}
                >
                    <img
                        src={img}
                        alt="Bulma: Free, open source, & modern CSS framework based on Flexbox" height={'100%'}
                        style={{
                            maxHeight: 'unset'
                        }}
                    />
                    {/* <img /> */}
                </a>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">

                </div>

                <div className="navbar-end">
                    <TopBarItem
                        onClick={() => setShowCart(true)}
                    >
                        <Icon
                            size={'is-large fa-2x'}
                            icon={"fa-shopping-cart"}
                        />
                        <CartItem />
                    </TopBarItem>
                    {isLogged && <TopBarItem
                        onClick={() => signOut()}
                    >
                        <Icon

                            size={'is-large fa-2x'}
                            icon={"fa-sign-out-alt"}
                        />
                    </TopBarItem>}
                </div>
            </div>
        </nav>

        <nav className="is-secondary-nav" role="navigation" aria-label="main navigation">
            <div
                className={"is-50-percent"}
            >

                {!isLogged ? < React.Fragment >
                    Hi,&nbsp; <a
                        onClick={() => push('/login')}
                    >Sign in</a>&nbsp;or&nbsp;<a
                        onClick={() => push('/register')}
                    >Register</a>
                </React.Fragment> : <React.Fragment>
                        Hi, {`${capitalize(name)}`}
                    </React.Fragment>}
            </div>
            <div
                className={"is-50-percent is-right"}
            >
                Your bag: {subTotalCart.toFixed(2)} $
            </div>
        </nav>

    </div >
})

const TopBarItem = ({ text, children, route, onClick }) => (<a
    className="navbar-item"
    onClick={onClick}
>
    {text || children}
</a>)