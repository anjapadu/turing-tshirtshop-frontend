import React from 'react';
import Notification from 'react-bulma-notification';
export const isCorrect = (data) => {
    let errors = data.errors;
    if (Array.isArray(errors) && errors.length > 0) {
        return false;
    }
    return true;
}

export const NotificationAddProduct = (data) => Notification.error(<div
    style={{
        display: 'flex',
        flexDirection: 'row',
    }}
>
    <div
        style={{
            padding: 10
        }}
    >
        <img
            style={{
                width: "5rem"
            }}
            src={`${IMG_ROUTE}${data.image}`}
        />
    </div>
    <div
        style={{
            padding: 10,

        }}
    >
        <h3
            className={"has-text-white"}
        >{data.name} has been added to your cart!</h3>

    </div>

</div>, {
        duration: 5,
        style: {
            // position: 'absolute',
            // top: "5rem",
            // right: 5,
            // zIndex: 999999,
            // width: 400

        }
    });

export const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const capitalize = text => {
    text = text.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
}