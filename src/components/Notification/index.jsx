import React, { PureComponent } from 'react';

export default ({ children, content }) => {
    return <div class="notification is-danger">
        <button class="delete"></button>
        {children}
    </div>
}