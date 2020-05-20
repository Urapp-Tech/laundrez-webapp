import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, flatMap, debounceTime } from 'rxjs/operators';
import { MyBasketActionTypes } from './actions-types';
export class MyBasketEpics {
    static validateCoupon(action$, state$, { ajaxGet }) {
        return action$.pipe(ofType(MyBasketActionTypes.VALIDATE_COUPON_PROG), debounceTime(700), switchMap(({ payload }) => {
            return ajaxGet(`/coupon/validate/${payload.code}`).pipe(pluck('response'), flatMap((obj) => {
                return of(
                    {
                        type: MyBasketActionTypes.VALIDATE_COUPON_SUCC,
                        payload: { coupon: obj?.result }
                    },
                );
            })
                , catchError((err) => {
                    return of({ type: MyBasketActionTypes.VALIDATE_COUPON_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                }));

        }));
    }

}