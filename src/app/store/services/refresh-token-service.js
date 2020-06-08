import { ofType } from 'redux-observable';
import { AuthActionTypes } from '../ducks/auth-duck/actions-types';
import { takeUntil, take, mergeMap, merge } from 'rxjs/operators';
import { of, iif } from 'rxjs';
import { AuthStorage } from '../ducks/auth-duck/auth-storage';
import { AuthActions } from '../ducks/auth-duck/actions';

export class RefreshTokenService {
    static getRefreshToken(action$, state$, source) {
        let user = AuthStorage.getUser();
        let body = {
            token: AuthStorage.getRefreshToken(),
            email: user?.email
        };
        let isProgressRefreshToken = state$?.value?.auth?.isProgressRefreshToken;
        return action$.pipe(
            ofType(AuthActionTypes.GET_NEW_ACCESS_TOKEN_SUCC),
            takeUntil(
                action$.pipe(
                    ofType(AuthActionTypes.GET_NEW_ACCESS_TOKEN_FAIL)
                )
            ),
            take(1),
            mergeMap(() => source),
            merge(
                iif(() => isProgressRefreshToken, of(), of(AuthActions.getNewAccessToken(body))),
            ),
        );

    }
}