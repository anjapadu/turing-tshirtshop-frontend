import {
    createSelector
} from 'reselect';

const getToken = state => state.user.token;
const getEmail = state => state.user.email;
const getPassword = state => state.user.password;
const getName = state => state.user.name;

const userSelector = createSelector(
    [getToken, getEmail, getPassword, getName],
    (token, email, password, name) => ({
        token,
        isLogged: token !== null,
        email,
        name,
        password
    })
);

export {
    userSelector
}