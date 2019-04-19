import React, { PureComponent } from 'react';
import img from '../../images/tshirtshop.png';
import Icon from '../Icon';

export default (props) => {
    return <div>
        <nav className="navbar is-white" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item"
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
                    <TopBarItem

                        text={"Regional"}
                    />
                    <TopBarItem
                        text={"Nature"}
                    />
                    <TopBarItem
                        text={"Seasonal"}
                    />
                </div>

                <div className="navbar-end">
                    <TopBarItem>
                        <Icon
                            size={'is-large fa-2x'}
                            icon={"fa-shopping-cart"}
                        />
                    </TopBarItem>
                </div>
            </div>
        </nav>

        <nav className="is-secondary-nav" role="navigation" aria-label="main navigation">
            <div
                className={"is-50-percent"}
            >
                Hi,&nbsp;<a
                    onClick={() => props.push('/login')}
                >Sign in</a>&nbsp;or&nbsp;<a
                    onClick={() => props.push('/register')}
                >Register</a>
            </div>
            <div
                className={"is-50-percent is-right"}
            >
                Your bag: 0.00 $
            </div>
        </nav>

    </div>
}

const TopBarItem = ({ text, children, route, onClick }) => (<a
    className="navbar-item"
>
    {text || children}
</a>)