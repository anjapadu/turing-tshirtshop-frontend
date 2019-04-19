import React from 'react';

export default ({ icon, size }) => {
    return <span className={`icon${size ? ` ${size}` : ''}`}>
        <i className={`fas ${icon || 'fa-home'}`}></i>
    </span>
}