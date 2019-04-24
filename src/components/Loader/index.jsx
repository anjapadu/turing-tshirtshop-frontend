import React from 'react';
import loader from '../../images/loader.gif';

export default ({ style = {}, isPartialLoader = false, text = "Loading ..." }) => {
    if (isPartialLoader) {
        return <div
            style={{
                minHeight: 100,
                background: '#FFF',
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                ...style
            }}
        >
            <img
                style={{
                    width: 150,
                    height: 150
                }}
                src={loader}
            />
            <h3
                className={"has-text-danger"}
            >{text}</h3>
        </div>
    }
    return (
        <div
            className="pageloader is-active is-white"
            style={style}
        >
            <span className="title">{text}</span>
        </div>)
};