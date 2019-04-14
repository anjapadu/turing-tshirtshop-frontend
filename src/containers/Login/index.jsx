import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
    
class Login extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            <p>{"Login"}</p>
        </div>
    }
}

const mapStateToProps = (state) => {

    return {

    }
}
    
export default connect(mapStateToProps, {

})(Login)