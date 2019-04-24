import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import success from '../../images/success.jpg'
import Button from '../../components/Button';
class SuccessPurchase extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return <div
            style={{
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                flex: '1 1',
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                textAlign: 'center'
            }}
        >
            <h2>Congratulations!!!</h2>

            <br />
            <img
                style={{
                    maxWidth: '100%',
                    width: 400
                }}
                src={success}
            />
            <br />
            <h3>You have purchase correctly. We've sent and email with the order confirmation and resume to your email.<br />Please fell free to contact us if there is any problem or doubt</h3>
            <br />
            <Button
                className={"is-large is-rounded is-danger"}
                text={"Go to catalog"}
                onClick={() => {
                    this.props.push('/')
                }}
            />
        </div>
    }
}

const mapStateToProps = (state) => {

    return {

    }
}

export default connect(mapStateToProps, {
    push
})(SuccessPurchase)     