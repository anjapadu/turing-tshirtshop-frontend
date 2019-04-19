import React from 'react';

export default ({ children, isRight, isResponsiveReverse, size }) => {
    return <div
        className={"column" + (isRight ? ' is-right' : '')}
        className={`column
        ${isRight ? ' is-right' : ''}
        ${isResponsiveReverse ? ' is-responsive-reverse' : ''}
        ${size ? ` ${size}` : ''} 
        `}
    >
        {children}
    </div>
}