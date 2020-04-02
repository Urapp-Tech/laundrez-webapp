import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map } from 'rxjs/operators';
import { AuthActionTypes } from './actions-types';
import * as utils from "../../../../_metronic/utils/utils";
export class AuthEpics {
    static login(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(AuthActionTypes.LOGIN_PROG), switchMap(({ payload }) => {
            return ajaxPost('/User/signin/', payload.body).pipe(pluck('response'), map(obj => {
                utils.setToken(obj?.token);
                let { id, username, firstName, lastName } = obj;
                let user = { id, username, firstName, lastName };
                utils.setUser(user);
                return {
                    type: AuthActionTypes.LOGIN_SUCC,
                    payload: { user }
                };
            })
                , catchError((err) => {
                    return of({ type: AuthActionTypes.LOGIN_FAIL, payload: { message: err?.response?.message, status: err?.status } });
                }));

        }));
    }
}