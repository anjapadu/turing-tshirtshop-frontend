import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Form from '../../components/Form';
import Row from '../../components/Row';
import Col from '../../components/Col';

class Register extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return <React.Fragment>
            <Form>
                <br />
                <h1

                >{"Registration"}</h1>
                <br />
                <Row>
                    <Col>
                        <Input
                            isLarge
                            placeholder={"Name"}
                            icon={'fa-user'}
                        />
                    </Col>
                    <Col>
                        <Input
                            isLarge
                            placeholder={"Lastname"}
                            icon={'fa-user'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            isLarge
                            placeholder={"Email"}
                            icon={'fa-envelope'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            type={"password"}
                            isLarge
                            placeholder={"Password"}
                            icon={'fa-lock'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            type={"password"}
                            isLarge
                            placeholder={"Repeat password"}
                            icon={'fa-lock'}
                        />
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
    push
})(Register)