import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { HttpService } from './services/http-service';


import { rootReducer, rootEpic } from './rootDuck';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const loggerMiddleware = createLogger();

const epicMiddleware = createEpicMiddleware({
    dependencies: {
        ajaxGet: HttpService.get,
        ajaxPost: HttpService.post,
        ajaxPut: HttpService.put,
        ajaxDel: HttpService.delete,
    }
});
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware, loggerMiddleware))
);

/**
 * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
 * @see https://github.com/rt2zz/redux-persist#persistor-object
 */
// export const persistor = persistStore(store);
epicMiddleware.run(rootEpic);

export default store;
