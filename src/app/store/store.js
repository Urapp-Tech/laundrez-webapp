import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { HttpService } from './services/http-service';
import { rootReducer, rootEpic } from './rootDuck';
import { history } from '../router/RouterHistory';
import { RefreshTokenService } from './services/refresh-token-service';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const loggerMiddleware = createLogger();

const epicMiddleware = createEpicMiddleware({
    dependencies: {
        ajaxGet: HttpService.get,
        ajaxPost: HttpService.post,
        ajaxPut: HttpService.put,
        ajaxDel: HttpService.delete,
        history,
        getRefreshToken: RefreshTokenService.getRefreshToken
    }
});
let middlewares = process.env.NODE_ENV === 'production' ? applyMiddleware(epicMiddleware) : applyMiddleware(epicMiddleware, loggerMiddleware);
const store = createStore(
    rootReducer,
    composeEnhancers(middlewares)
);

epicMiddleware.run(rootEpic);

export default store;
