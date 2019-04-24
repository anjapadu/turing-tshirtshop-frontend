import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Row from '../../components/Row';
import Col from '../../components/Col';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Input from '../../components/Input';
import { appSelector, validationSelector } from '../../selectors';
import Select from '../../components/Select'
import DeliveryForm from './DeliveryForm';
import ConfirmationPurchase from './ConfirmationPurchase';

class Checkout extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            step: 3,
            error: false
        }
    }

    _renderDeliveryForm() {
        return <DeliveryForm />;
    }
    _renderStep() {
        switch (this.state.step) {
            case 2:
                return <DeliveryForm
                    {...this.props}
                />
            case 3:
                return <ConfirmationPurchase
                    {...this.props}
                />
        }
    }
    _renderClass(step) {
        if (this.state.step > step) {
            return ' is-completed';
        }
        if (step == this.state.step) {
            return ' is-active';
        }
        return '';
    }
    _onNextStep() {
        this.setState({
            error: false
        }, () => {

            let passNextStep = false;
            switch (this.state.step) {
                case 2:
                    if (this.props.isValidDelivery)
                        passNextStep = true
                    else
                        this.setState({
                            error: 'DELIVERY'
                        })
                    break;
                default:
                    break;
            }
            if (passNextStep)
                this.setState({
                    step: this.state.step + 1
                })
        })
    }
    _renderError() {
        switch (this.state.error) {
            case 'DELIVERY':
                return <p className={"has-text-danger"}>You must fill all the obligatory fiels. (All except address 2 are obligatories)</p>
            default:
                return false;
        }
    }
    render() {
        return <React.Fragment>
            <Form>
                <br />
                <h1
                >{"Checkout"}</h1>
                <br />
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
                            <div className={`step-item${this._renderClass(2)}`}>
                                <div className="step-marker">2</div>
                                <div className="step-details">
                                    <p className="step-title">Delivery</p>
                                </div>
                            </div>
                            <div className={`step-item${this._renderClass(3)}`}>
                                <div className="step-marker">3</div>
                                <div className="step-details">
                                    <p className="step-title">Confirm</p>
                                </div>
                            </div>
                            <div className={`step-item${this._renderClass(4)}`}>
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
                <br />
                {this._renderStep()}
                {this._renderError()}
                <br />
                <Button
                    text={"Continue"}
                    className={"is-large is-fullwidth is-danger"}
                    onClick={this._onNextStep.bind(this)}
                />
            </Form>
        </React.Fragment>
    }
}

const mapStateToProps = (state) => {
    const {
        shippingRegion
    } = appSelector(state);
    const {
        isValidDelivery
    } = validationSelector(state);
    return {
        shippingRegion,
        isValidDelivery
    }
}

export default connect(mapStateToProps, {

})(Checkout)