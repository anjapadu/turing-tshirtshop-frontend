import React from 'react';

export default ({ children, style = {}, noGap }) => {
    const _getClassName = () => {
        let className = "columns is-fullwidth";
        if (noGap) {
            className += " is-gapless"
        }
        return className;
    }
    return (<div
        style={style}
        className={_getClassName()}
    >
        {children}
    </div>)
}