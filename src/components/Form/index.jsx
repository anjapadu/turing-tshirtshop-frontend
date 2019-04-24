import React from 'react';

export default ({ children, style, className }) => {
    return <form
        className={"responsive-form" + (className ? ` ${className}` : '')}
        style={style || {}}
    >
        {children}
    </form>
}