import React, { PureComponent } from 'react';


export default (props) => {
    return <React.Fragment>
        <nav className="navbar is-black" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" >
                    {/* <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, & modern CSS framework based on Flexbox" width="112" height="28" /> */}
                    TSHIRT SHOP
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

                {/* <div className="navbar-end">
                    <a className="navbar-item">
                        Login
</a>
                    <a className="navbar-item">
                        Register
</a>
                </div> */}
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

    </React.Fragment>
}

const TopBarItem = ({ text, route, onClick }) => (<a
    className="navbar-item"
>
    {text}
</a>)