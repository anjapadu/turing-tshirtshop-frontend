import React, { PureComponent } from 'react';


class Modal extends PureComponent {
    renderType() {
        const { error, message } = this.props
        if (error) {
            return (<article class="message is-danger">
                <div class="message-body">
                    {message}
                </div>
            </article>)
        }
    }
    render() {
        return (<div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content">
                {this.renderType()}
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
        </div>)
    }
}

export default Modal;