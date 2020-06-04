import { of, defer } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, flatMap } from 'rxjs/operators';
import { FaqActionTypes } from './actions-types';
export class FaqEpics {
    static getFaqs(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(FaqActionTypes.FAQS_PROG), switchMap(() => {
            return defer(() => {
                return ajaxGet('/FAQ/general?page[number]=1&page[size]=1000');
            }).pipe(pluck('response'), flatMap(obj => {

                return of(
                    {
                        type: FaqActionTypes.FAQS_SUCC,
                        payload: { faqs: obj.result }
                    },

                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        return of({ type: FaqActionTypes.FAQS_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                    }
                }));

        }));
    }
}