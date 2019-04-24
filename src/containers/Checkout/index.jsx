import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Row from '../../components/Row';
import Col from '../../components/Col';
import Form from '../../components/Form';
import Input from '../../components/Input';
import { appSelector } from '../../selectors';

class Checkout extends PureComponent {
    constructor(props) {
        super(props);
       
    }
    render() {
        return <React.Fragment>
            <Form>
                <br />
                <h1
                >{"Checkout"}</h1>
                <br />
                <Row>
                    <Col>
                        <div className="steps is-small">
                            <div className="step-item is-completed">
                                <div className="step-marker">
                                    <span className="icon">
                                        <i className="fa fa-check"></i>
                                    </span>
                                </div>
                                <div className="step-details">
                                    <p className="step-title">Auth</p>
                                </div>
                            </div>
                            <div className="step-item is-active">
                                <div className="step-marker">2</div>
                                <div className="step-details">
                                    <p className="step-title">Delivery</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-marker">3</div>
                                <div className="step-details">
                                    <p className="step-title">Confirm</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-marker">
                                    4
                        {/* <span className="icon">
                            <i className="fa fa-flag"></i>
                        </span> */}
                                </div>
                                <div className="step-details">
                                    <p className="step-title">Payment</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-marker">
                                    4
                        {/* <span className="icon">
                            <i className="fa fa-flag"></i>
                        </span> */}
                                </div>
                                <div className="step-details">
                                    <p className="step-title">Finish</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
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
                            placeholder={"Address"}
                            icon={'fa-user'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            isLarge
                            placeholder={"Address 2"}
                            icon={'fa-user'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            isLarge
                            placeholder={"City"}
                            icon={'fa-user'}
                        />
                    </Col>
                    <Col>
                        <Input
                            isLarge
                            placeholder={"State"} //Region
                            icon={'fa-user'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            isLarge
                            placeholder={"Country"}
                            icon={'fa-user'}
                        />
                    </Col>
                    <Col>
                        <Input
                            isLarge
                            placeholder={"Zip code"}
                            icon={'fa-user'}
                        />
                    </Col>
                </Row>
            </Form>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => {
    const {
        shippingRegion
    } = appSelector(state);
    return {
        shippingRegion
    }
}

export default connect(mapStateToProps, {

})(Checkout)