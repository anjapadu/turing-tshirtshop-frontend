import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Home extends PureComponent {
    render() {
        return <React.Fragment>
            <h2>HOME</h2>
        </React.Fragment>
    }
}

const mapStateToProps = state => {

    return {

    }
}

export default connect(mapStateToProps, {

})(Home);