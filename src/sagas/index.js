import { all } from 'redux-saga/effects';
import app from './app';
import userSaga from './user'
import cartSaga from './cart'
import productsSaga from './products'

export default function* rootSaga() {
    yield all([
        ...app,
        ...userSaga,
        ...cartSaga,
        ...productsSaga,
    ])
}