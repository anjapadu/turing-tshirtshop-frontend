import React from 'react';

export default ({ icon, size, style = {}, onClick = null }) => {
    return <span
        onClick={onClick}
        className={`icon${size ? ` ${size}` : ''}`}
        style={style}
    >
        <i className={`fas ${icon || 'fa-home'}`}></i>
    </span>
}