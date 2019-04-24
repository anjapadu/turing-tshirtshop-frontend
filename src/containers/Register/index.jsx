import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Form from '../../components/Form';
import Row from '../../components/Row';
import Col from '../../components/Col';
import { validateEmail } from '@utils';
import {
    register
} from '../../actions'

class Register extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            repeatPassword: '',
            errorFirstname: false,
            errorLastname: false,
            errorEmail: false,
            errorPassword: false,
            errorMessage: false
        }
    }
    _onChangeInput(key, value) {
        this.setState({
            [key]: value
        })
    }
    _resetErrors() {
        this.setState({
            errorFirstname: false,
            errorLastname: false,
            errorEmail: false,
            errorPassword: false,
            errorMessage: false
        })
    }
    _renderErrorMessage() {
        if (this.state.errorFirstname) {
            return <small className={"has-text-danger"}>Firstname can't be empty</small>
        }
        if (this.state.errorLastname) {
            return <small className={"has-text-danger"}>Lastname can't be empty</small>
        }
        if (this.state.errorEmail) {
            return <small className={"has-text-danger"}>Wrong email format</small>
        }
        if (this.state.errorPassword) {
            return <small className={"has-text-danger"}>The passwords must be at least 8 letters or numbers and match in both fields</small>
        }
        if (this.state.errorMessage) {
            let text = "";
            switch (this.state.errorMessage) {
                case 'USER_EXISTS':
                    text = "This email is already registered";
                    break;
                default:
                    text = "System error"
            }
            return <small className={"has-text-danger"}>{text}</small>
        }

    }
    _onSubmit() {
        this._resetErrors();
        const { password, email, firstname, lastname, repeatPassword } = this.state;
        if (firstname.trim().length === 0) {
            return this.setState({
                errorFirstname: true
            })
        }
        if (lastname.trim().length === 0) {
            return this.setState({
                errorLastname: true
            })
        }
        if (!validateEmail(email)) {
            return this.setState({
                errorEmail: true
            })
        }
        if (password.length < 8 || password !== repeatPassword) {
            return this.setState({
                errorPassword: true
            })
        }
        this.props.register({
            password,
            email,
            firstname,
            lastname,
            callbackError: (errorMessage) => {
                return this.setState({
                    errorMessage
                })
            }
        })
    }
    render() {
        const {
            password,
            repeatPassword,
            firstname,
            lastname,
            email
        } = this.state;
        return <React.Fragment>
            <Form>
                <br />
                <h1

                >{"Registration"}</h1>
                <br />
                <Row>
                    <Col>
                        <Input
                            value={firstname}
                            onChange={this._onChangeInput.bind(this, 'firstname')}
                            isLarge
                            placeholder={"Name"}
                            icon={'fa-user'}
                        />
                    </Col>
                    <Col>
                        <Input
                            value={lastname}
                            onChange={this._onChangeInput.bind(this, 'lastname')}
                            isLarge
                            placeholder={"Lastname"}
                            icon={'fa-user'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            autoComplete={"username"}
                            onChange={this._onChangeInput.bind(this, 'email')}
                            isLarge
                            value={email}
                            placeholder={"Email"}
                            icon={'fa-envelope'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            autoComplete={"new-password"}
                            type={"password"}
                            value={password}
                            onChange={this._onChangeInput.bind(this, 'password')}
                            isCenter
                            isLarge
                            placeholder={"Password"}
                            icon={'fa-lock'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            autoComplete={"new-password"}
                            type={"password"}
                            value={repeatPassword}
                            onChange={this._onChangeInput.bind(this, 'repeatPassword')}
                            isCenter
                            isLarge
                            placeholder={"Repeat password"}
                            icon={'fa-lock'}
                        />
                        {this._renderErrorMessage()}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Please register an account to be able to purchase and save your preferences. Remember that you need to activate your account by visiting the link sent to yout email.</h3>
                    </Col>
                </Row>
                <Row>
                    <Col
                        isResponsiveReverse
                        isRight
                    >
                        <Button
                            isLarge
                            // className={"form-responsive-button"}
                            onClick={() => this.props.push('/login')}
                            color={"green"}
                            text={"I've an account"}
                        />
                        <Button
                            onClick={this._onSubmit.bind(this)}
                            // className={"form-responsive-button"}
                            isLarge
                            text={"Register"}
                        />
                    </Col>
                </Row>


            </Form >

        </React.Fragment >
    }
}

const mapStateToProps = (state) => {

    return {

    }
}

export default connect(mapStateToProps, {
    push,
    register
})(Register)