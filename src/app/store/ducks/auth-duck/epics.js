import { of, defer, /* merge */ } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, map, flatMap, mergeMap } from 'rxjs/operators';
import { AuthActionTypes } from './actions-types';
import { AuthStorage } from './auth-storage';
import { AuthActions } from './actions';
import { NotificationActions } from '../notification-duck';
export class AuthEpics {
    static login(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(AuthActionTypes.LOGIN_PROG), switchMap(({ payload }) => {
            return ajaxPost('/User/signin/', payload.body).pipe(pluck('response'), flatMap(obj => {
                AuthStorage.setToken(obj?.token);
                AuthStorage.setRefreshToken(obj?.refreshToken);
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
        return action$.pipe(ofType(AuthActionTypes.GET_PROFILE_PROG), switchMap(() => {
            return ajaxGet('/User').pipe(pluck('response'), map(obj => {
                let { id, username, firstName, lastName, email, phoneNo, postalCode, referralCode } = obj.result;
                let user = { id, username, firstName, lastName, email, phoneNo, postalCode, referralCode };
                AuthStorage.setUser(user);
                return {
                    type: AuthActionTypes.GET_PROFILE_SUCC,
                    payload: { user }
                };
            })
                , catchError((err) => {
                    AuthStorage.clearStorage();
                    return of({ type: AuthActionTypes.GET_PROFILE_FAIL, payload: { err, message: err?.response?.message ? err?.response?.message : err?.response?.Message, status: err?.status } });
                }));

        }));
    }

    static updateProfile(action$, state$, { ajaxPut, getRefreshToken }) {
        return action$.pipe(ofType(AuthActionTypes.UPDATE_PROFILE_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut('/User', payload.body);
            }).pipe(pluck('response'), flatMap(obj => {
                let { id, username, firstName, lastName, email, phoneNo, postalCode } = obj.result;
                let user = { id, username, firstName, lastName, email, phoneNo, postalCode };
                AuthStorage.setUser(user);
                window.scrollTo(0, 0);

                return of({
                    type: AuthActionTypes.UPDATE_PROFILE_SUCC,
                    payload: { user }
                }, NotificationActions.showSuccessNotification('Profile updated successfully'));
            }), catchError((err, source) => {
                if (err.status === 401) {
                    // let body = {
                    //     token: AuthStorage.getRefreshToken(),
                    //     email: state$?.value?.auth?.user?.email
                    // };
                    // return action$.pipe(
                    //     ofType(AuthActionTypes.GET_NEW_ACCESS_TOKEN_SUCC),
                    //     takeUntil(
                    //         action$.pipe(
                    //             ofType(AuthActionTypes.GET_NEW_ACCESS_TOKEN_FAIL)
                    //         )
                    //     ),
                    //     take(1),
                    //     mergeMap(() => source),
                    //     merge(of(AuthActions.getNewAccessToken(body))),
                    // );
                    return getRefreshToken(action$, state$, source);

                }
                else {
                    window.scrollTo(0, 0);

                    return of(
                        {
                            type: AuthActionTypes.UPDATE_PROFILE_FAIL,
                            payload: {
                                err,
                                message: err?.response?.message ? err?.response?.message : err?.response?.Message,
                                status: err?.status
                            }
                        },
                        NotificationActions.showErrorNotification(err?.response?.message ? err?.response?.message : err?.response?.Message)
                    );
                }
            }));

        }));
    }
    static getNewAccessToken(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(AuthActionTypes.GET_NEW_ACCESS_TOKEN_PROG), mergeMap(({ payload }) => {
            return ajaxPost('/user/refreshtoken', payload.body).pipe(pluck('response'), map((obj) => {
                AuthStorage.setToken(obj?.token);
                AuthStorage.setRefreshToken(obj?.refreshToken);
                return {
                    type: AuthActionTypes.GET_NEW_ACCESS_TOKEN_SUCC,

                };
            }), catchError(err => {
                return of({ type: AuthActionTypes.GET_NEW_ACCESS_TOKEN_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
            }));
        }));
    }
}