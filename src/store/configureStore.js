import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from "redux-saga";
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import reducers from '../reducers';
import { routerMiddleware } from 'connected-react-router';

import { composeWithDevTools } from "redux-devtools-extension";
import { SET_SELECTED_PAGE } from '../constants';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        "router",
        "app",
        "productDetail"
    ]
}
export const history = createBrowserHistory();
// const routerMwre = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, reducers(history))

export default () => {
    let store = createStore(
        persistedReducer,
        {},
        /* istanbul ignore next */
        IS_DEV ? composeWithDevTools(
            applyMiddleware(sagaMiddleware),
            applyMiddleware(
                routerMiddleware(
                    history
                )
            )
        ) : compose(
            applyMiddleware(sagaMiddleware),
            applyMiddleware(
                routerMiddleware(
                    history
                )
            )
        )
    )
    let persistor = persistStore(store, null, () => {
        store.dispatch({
            type: SET_SELECTED_PAGE,
            payload: 1
        })
    })
    return { store, persistor, sagaMiddleware, history }
};