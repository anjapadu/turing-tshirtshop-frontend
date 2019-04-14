import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
    
class Register extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            <p>{"Register"}</p>
        </div>
    }
}

const mapStateToProps = (state) => {

    return {

    }
}
    
export default connect(mapStateToProps, {

})(Register)