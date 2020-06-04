import { of, defer } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, flatMap, debounceTime } from 'rxjs/operators';
import { MyBasketActionTypes } from './actions-types';
export class MyBasketEpics {

    static validatePromoCoupon(action$, state$, { ajaxPost, getRefreshToken }) {
        return action$.pipe(ofType(MyBasketActionTypes.VALIDATE_PROMO_COUPON_PROG), debounceTime(1000), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/coupon/validatepromo', payload.body);
            }).pipe(pluck('response'), flatMap((obj) => {
                return of(
                    {
                        type: MyBasketActionTypes.VALIDATE_PROMO_COUPON_SUCC,
                        payload: { promo: obj?.result }
                    },
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        return of({ type: MyBasketActionTypes.VALIDATE_PROMO_COUPON_FAIL, payload: { err, message: err?.response?.message || err?.response?.Message, status: err?.status } });
                    }
                }));

        }));
    }

    static validateReferralCoupon(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(MyBasketActionTypes.VALIDATE_REFERRAL_COUPON_PROG), switchMap(() => {
            return defer(() => {
                return ajaxGet('/coupon/validatereferral');
            }).pipe(pluck('response'), flatMap((obj) => {
                return of(
                    {
                        type: MyBasketActionTypes.VALIDATE_REFERRAL_COUPON_SUCC,
                        payload: { referral: obj?.result[0]?.coupon }
                    },
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        return of({ type: MyBasketActionTypes.VALIDATE_REFERRAL_COUPON_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                    }
                }));

        }));
    }

}