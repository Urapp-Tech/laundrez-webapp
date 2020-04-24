import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, flatMap } from 'rxjs/operators';
import { AuthActionTypes } from './actions-types';
import { AuthStorage } from './auth-storage';
import { AuthActions } from './actions';
export class AuthEpics {
    static login(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(AuthActionTypes.LOGIN_PROG), switchMap(({ payload }) => {
            return ajaxPost('/User/signin/', payload.body).pipe(pluck('response'), flatMap(obj => {
                AuthStorage.setToken(obj?.token);
                // let { id, username, firstName, lastName } = obj;
                // let user = { id, username, firstName, lastName };
                // AuthStorage.setUser(user);
                return of(
                    {
                        type: AuthActionTypes.LOGIN_SUCC,
                    },
                    AuthActions.getProfile()
                );
            })
                , catchError((err) => {
                    return of({ type: AuthActionTypes.LOGIN_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                }));

        }));
    }

    static getProfile(action$, state$, { ajaxGet }) {
        return action$.pipe(ofType(AuthActionTypes.GET_PROFILE_PROG), switchMap(({ payload }) => {
            return ajaxGet('/User').pipe(pluck('response'), map(obj => {
                let { id, username, firstName, lastName, email, phoneNo, postalCode } = obj.result;
                let user = { id, username, firstName, lastName, email, phoneNo, postalCode };
                AuthStorage.setUser(user);
                return {
                    type: AuthActionTypes.GET_PROFILE_SUCC,
                    payload: { user }
                };
            })
                , catchError((err) => {
                    AuthStorage.clearStorage();
                    return of({ type: AuthActionTypes.GET_PROFILE_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                }));

        }));
    }

    static updateProfile(action$, state$, { ajaxPut }) {
        return action$.pipe(ofType(AuthActionTypes.UPDATE_PROFILE_PROG), switchMap(({ payload }) => {
            return ajaxPut('/User', payload.body).pipe(pluck('response'), map(obj => {
                let { id, username, firstName, lastName, email, phoneNo, postalCode } = obj.result;
                let user = { id, username, firstName, lastName, email, phoneNo, postalCode };
                AuthStorage.setUser(user);
                window.scrollTo(0, 0);
               
                return {
                    type: AuthActionTypes.UPDATE_PROFILE_SUCC,
                    payload: { user }
                };
            }), catchError((err) => {
                window.scrollTo(0, 0);
                return of({ type: AuthActionTypes.UPDATE_PROFILE_FAIL, payload: { err, message: err?.response?.message ? err?.response?.message : err?.response?.Message, status: err?.status } });
            }));

        }));
    }
}