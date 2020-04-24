import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map } from 'rxjs/operators';
import { AuthActionTypes } from './actions-types';
import { AuthStorage } from './auth-storage';
export class AuthEpics {
    static login(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(AuthActionTypes.LOGIN_PROG), switchMap(({ payload }) => {
            return ajaxPost('/User/signin/', payload.body).pipe(pluck('response'), map(obj => {
                AuthStorage.setToken(obj?.token);
                let { id, username, firstName, lastName } = obj;
                let user = { id, username, firstName, lastName };
                AuthStorage.setUser(user);
                return {
                    type: AuthActionTypes.LOGIN_SUCC,
                    payload: { user }
                };
            })
                , catchError((err) => {
                    return of({ type: AuthActionTypes.LOGIN_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                }));

        }));
    }
}