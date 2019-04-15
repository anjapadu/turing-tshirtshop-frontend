import React from 'react';

export default ({ children, style, className }) => {
    return <div
        className={"responsive-form" + (className ? ` ${className}` : '')}
        style={style || {}}
    >
        {children}
    </div>
}