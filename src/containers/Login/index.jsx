import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Form from '../../components/Form';
import Row from '../../components/Row';
import Col from '../../components/Col';
import Input from '../../components/Input';
import Button from '../../components/Button';

class Login extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return <React.Fragment>
            <Form
                className={"is-login-form"}
            >
                <br />
                <h1

                >{"Sign In"}</h1>
                <br />
                <Row>
                    <Col>
                        <Input
                            isCenter
                            isLarge
                            placeholder={"Email / Username"}
                            icon={'fa-user'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            isCenter
                            isLarge
                            placeholder={"Password"}
                            icon={'fa-lock'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col
                        isResponsiveReverse
                    >
                        <Button
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
            </Form>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => {

    return {

    }
}

export default connect(mapStateToProps, {
    push
})(Login)