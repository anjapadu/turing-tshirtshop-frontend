import React from 'react';

export default ({ children, isRight, isResponsiveReverse, size, className }) => {
    return <div
        className={`column
        ${isRight ? ' is-right' : ''}
        ${isResponsiveReverse ? ' is-responsive-reverse' : ''}
        ${size ? ` ${size}` : ''} 
        ${className ? ` ${className}` : ''}
        `}
    >
        {children}
    </div>
}