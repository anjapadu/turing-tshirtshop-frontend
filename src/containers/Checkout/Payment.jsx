import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { submitOrder } from '../../actions'
import Cards from 'react-credit-cards';
import Input from '../../components/Input';
import Row from '../../components/Row';
import Col from '../../components/Col';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { replace } from 'connected-react-router';


class Payment extends PureComponent {
    state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        focused: '',
        month: '',
        year: '',
        error: false

    }
    _renderErrors() {
        switch (this.state.error) {
            case 'WRONG_CARD':
                return <p className={"has-text-danger"} style={{ marginBottom: 15 }}>Credit card information wrong</p>
            case 'WRONG_DATE':
                return <p className={"has-text-danger"} style={{ marginBottom: 15 }}>Credit card expiration date is wrong</p>
            case 'WRONG_NAME':
                return <p className={"has-text-danger"} style={{ marginBottom: 15 }}>Insert credit card owner</p>
            case 'PAYMENT_FAILED':
                return <p className={"has-text-danger"} style={{ marginBottom: 15 }}>Payment has been rejected</p>
            default:
                return false;
        }
    } S
    _onChange(key, value) {
        this.setState({
            [key]: value,
            focused: key
        }, () => {
            if (key == 'month' || key == 'year') {
                this.setState({
                    expiry: `${this.state.month}/${this.state.year}`
                })
            }

        })

    }
    _onSubmitOrder() {
        this.setState({
            error: false
        }, () => {
            const { number, name, month, year, cvc } = this.state;
            if (number.trim().length < 16) {
                return this.setState({
                    error: 'WRONG_CARD'
                })
            }
            if (month.trim() === '' || year.trim() === '' || parseInt(month) < 1 || parseInt(month) > 12) {
                return this.setState({
                    error: 'WRONG_DATE'
                })
            }
            if (name.trim() == '') {
                return this.setState({
                    error: 'WRONG_NAME'
                })
            }
            this.props.activeLoading(true);
            this.props.submitOrder({
                card: {
                    number: number,
                    exp_month: month,
                    exp_year: year,
                    cvc,
                    name
                },
                errorCallback: (error) => {
                    this.props.activeLoading(false);
                    this.setState({
                        error
                    })
                },
                successCallback: () => {
                    this.props.activeLoading(false);
                    this.props.replace('/success/purchase')

                }
            })
        })
    }
    render() {
        const {
            number,
            name,
            expiry,
            month,
            year,
            cvc
        } = this.state;
        if (this.props.isLoading) {
            return <Loader
                style={{
                    background: 'none'
                }}
                text={"We are processing your payment...  Please wait a few seconds."}
                isPartialLoader
            />
        }
        return <React.Fragment>
            <Cards
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={''}
            />
            <br />
            <br />
            <p
                style={{
                    textAlign: 'center'
                }}
            >
                Card number: 4242424242424242
            </p>
            <br />
            <Row>
                <Col>
                    <Input
                        isLarge
                        value={number}
                        onChange={this._onChange.bind(this, 'number')}
                        placeholder={"Credit Card Number"}
                        icon={'fa-credit-card'}
                        pattern="[\d| ]{16,22}"
                    />
                </Col>

            </Row>
            <Row>
                <Col>
                    <Input
                        isLarge
                        placeholder={"Name shown on card"}
                        icon={'fa-user'}
                        value={name}
                        onChange={this._onChange.bind(this, 'name')}
                    />
                </Col>
            </Row>
            <Row>
                <Col />
                <Col
                    size={"is-3"}
                >
                    <Input
                        isLarge
                        isCenter
                        placeholder={"MM"}
                        value={month}
                        onChange={this._onChange.bind(this, 'month')}
                    />
                </Col>
                <Col
                    size={"is-4"}
                >
                    <Input
                        isLarge
                        isCenter
                        placeholder={"YYYY"}
                        value={year}
                        onChange={this._onChange.bind(this, 'year')}
                    />

                </Col>
            </Row>
            <Row>
                <Col>
                    {this._renderErrors()}
                    <Button
                        onClick={this._onSubmitOrder.bind(this)}
                        text={"Pay and finish purchase"}
                        className={"is-fullwidth is-danger is-large"}
                    />
                </Col>
            </Row>
        </React.Fragment>
    }
}


const mapStateToProps = (state) => {

    return {
    }
}


export default connect(mapStateToProps, {
    submitOrder,
    replace
})(Payment)