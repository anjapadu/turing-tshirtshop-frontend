import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Form from '../../components/Form';
import Row from '../../components/Row';
import Col from '../../components/Col';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
    setUser,
    login,
    register
} from "../../actions";
import { userSelector } from '../../selectors';
import { validateEmail } from '@utils';
import { GoogleLogin } from 'react-google-login';

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            errorUser: false,
            errorPassword: false,
            errorMessage: false
        }
    }
    _onChangePassword(password) {
        this.setState({
            password
        })
    }
    _onSubmit() {
        this._resetErrors();
        let errors = 0;
        const { email } = this.props;
        const { password } = this.state;
        if (!validateEmail(email)) {
            return this.setState({
                errorUser: true
            })
        }
        if (this.state.password.length < 8) {
            return this.setState({
                errorPassword: true
            })
        }
        this.props.login({
            password, callbackError: (errorMessage) => {
                return this.setState({
                    errorMessage
                })
            }
        })
    }
    _resetErrors() {
        this.setState({
            errorUser: false,
            errorPassword: false,
            errorMessage: false
        })
    }
    _renderErrorMessage() {
        if (this.state.errorUser) {
            return <small className={"has-text-danger"}>The user is wrong. Yoy must enter a valid email address.</small>
        }
        if (this.state.errorPassword) {
            return <small className={"has-text-danger"}>The password should have at least 8 characters.</small>
        }
        if (this.state.errorMessage) {
            let text = "";
            switch (this.state.errorMessage) {
                case 'WRONG_PASS':
                    text = "Wrong password";
                    break;
                case "USER_NOT_EXIST":
                    text = "User is not registered";
                    break;
                default:
                    text = "System error"
            }
            return <small className={"has-text-danger"}>{text}</small>
        }

    }
    responseGoogle(response) {
        if (response.profileObj) {
            const {
                familyName,
                givenName,
                email,
                googleId
            } = response.profileObj;
            this.props.setUser(email);
            this.props.login({
                password: googleId,
                callbackError: (errorMessage) => {
                    if (errorMessage === 'USER_NOT_EXIST') {
                        return this.props.register({
                            email,
                            firstname: givenName,
                            lastname: familyName,
                            password: googleId,
                            isGoogle: true,
                            callbackError: (errorMessage) => {
                                return this.setState({
                                    errorMessage
                                })
                            }
                        })
                    }
                    return this.setState({
                        errorMessage
                    })
                }
            })
        }

    }
    render() {
        return <React.Fragment>
            <Form
                className={"is-login-form"}
            >
                <br />
                <h1

                >{"Log in"}</h1>
                <br />
                <Row>
                    <Col>
                        <Input
                            autoComplete={"username"}
                            onChange={this.props.setUser}
                            isCenter
                            value={this.props.email}
                            isLarge
                            placeholder={"Email / Username"}
                            icon={'fa-user'}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Input
                            autoComplete={"current-password"}
                            type={"password"}
                            value={this.state.password}
                            onChange={this._onChangePassword.bind(this)}
                            isCenter
                            isLarge
                            placeholder={"Password"}
                            icon={'fa-lock'}
                        />
                        {this._renderErrorMessage()}
                    </Col>
                </Row>
                {/* <Row>
                    <Col>
                        {this._renderErrorMessage()}
                    </Col>
                </Row> */}
                <Row>
                    <Col
                        isResponsiveReverse
                    >
                        <Button
                            onClick={this._onSubmit.bind(this)}
                            color="green"
                            style={{
                                width: '100%'
                            }}
                            isFluid
                            isLarge
                            text={"Log In"}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col
                        isResponsiveReverse
                    >
                        <Button
                            style={{
                                width: '100%'
                            }}
                            isFluid
                            isLarge
                            onClick={() => this.props.push("/register")}
                            text={"Create account"}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <GoogleLogin
                            className={"google-login-btn"}
                            clientId="504841747662-7gjnq7un2akeq3k7ttjroiblbp3d9o97.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            // render={renderProps => (
                            //     <button
                            //         style={{
                            //             width: '100%',

                            //         }}
                            //         className={"button is-large"}
                            //         onClick={renderProps.onClick}
                            //         disabled={renderProps.disabled}
                            //     >This is my custom Google button</button>
                            // )}
                            style={{
                                background: 'red'
                            }}
                            onSuccess={this.responseGoogle.bind(this)}
                            onFailure={this.responseGoogle.bind(this)}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Col>
                </Row>
            </Form>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => {
    const {
        email,
    } = userSelector(state);
    return {
        email,
    }
}

export default connect(mapStateToProps, {
    push,
    login,
    setUser,
    register
})(Login)