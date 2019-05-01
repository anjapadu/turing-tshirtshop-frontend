// import sinon from 'sinon';
// import {
//     callLogin
// } from '../user'
// import { expectSaga } from 'redux-saga-test-plan';
// import userReducer from '../../reducers/user';

// import { call } from 'redux-saga/effects'
// import {
//     api
// } from '../../apis'
// import { SET_USER_DATA, SET_EMAIL } from '../../constants';
// import { combineReducers } from 'redux'
// const reducer = combineReducers({
//     user: userReducer
// })



// describe('Login', () => {
//     it('Should return successCallback if login correct', async () => {
//         const fakeData = {
//             data: {
//                 token: '12345678',
//                 id: 1
//             }
//         }
//         return expectSaga(callLogin, {
//             payload: {
//                 password: '123456',
//                 callbackError: () => { },
//                 isGoogle: false,
//                 successCallback: () => { }
//             }
//         })
//             .withReducer(reducer)
//             .provide([
//                 [call(api), fakeData]
//             ])
//             .put({
//                 type: SET_USER_DATA,
//                 payload: fakeData
//             })
//             .run()

//     });
// });