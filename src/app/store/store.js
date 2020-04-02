import { applyMiddleware, compose, createStore } from "redux";
import { persistStore } from "redux-persist";
import { createLogger } from 'redux-logger';


import { rootReducer } from "./rootDuck";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const loggerMiddleware = createLogger();

//TODO: create epic middleware here
// const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(loggerMiddleware))
);

/**
 * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
 * @see https://github.com/rt2zz/redux-persist#persistor-object
 */
// export const persistor = persistStore(store);
//TODO: run root epic here
// sagaMiddleware.run(rootSaga);

export default store;
