import {
    takeLatest,
    call,
    put,
    fork
} from 'redux-saga/effects';
import {
    FETCH_DEPARTMENTS_CATEGORIES,
    SET_DEPARTMENTS_CATEGORIES
} from '../constants/app';
import { api } from '../apis';
import { isCorrect } from '@utils';

function* getDepartmentsCategories() {
    try {
        const query = `{
            departments{
            id
            name
            description
            categories{
              id
              name
              description
            }
          }
        }`;
        const { data } = yield call(api, {
            query
        })
        if (isCorrect(data)) {
            yield put({
                type: SET_DEPARTMENTS_CATEGORIES,
                payload: data.data.departments
            })
        }
    } catch (e) {
        console.log('Error getDepartmentsCategories', e);
    }
}

export default [
    fork(getDepartmentsCategories),
    takeLatest(FETCH_DEPARTMENTS_CATEGORIES, getDepartmentsCategories)
];