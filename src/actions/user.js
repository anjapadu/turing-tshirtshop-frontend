import {
    SET_PASSWORD,
    SET_EMAIL,
    LOGIN,
    REGISTER
} from '../constants'

export const setPassword = (payload) => ({
    type: SET_PASSWORD,
    payload
});

export const setUser = (payload) => ({
    type: SET_EMAIL,
    payload
})


export const login = (payload) => ({
    type: LOGIN,
    payload
})

export const register = (payload) => ({
    type: REGISTER,
    payload
})