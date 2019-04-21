import React from 'react';

export default ({ content, style = {} }) => (<div style={style} className="is-divider" data-content={content || 'OR'}></div>)