import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, flatMap } from 'rxjs/operators';
import { AddressActionTypes } from './actions-types';
export class AddressEpics {
    static saveAddress(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(AddressActionTypes.SAVE_ADDRESS_PROG), switchMap(({ payload }) => {
            return ajaxPost('/Address', payload.body).pipe(pluck('response'), flatMap(obj => {
                return of(
                    {
                        type: AddressActionTypes.SAVE_ADDRESS_SUCC,
                        payload: obj
                    },
                );
            })
                , catchError((err) => {
                    return of({ type: AddressActionTypes.SAVE_ADDRESS_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                }));

        }));
    }

    static getAddresses(action$, state$, { ajaxGet }) {
        return action$.pipe(ofType(AddressActionTypes.GET_ADDRESSES_PROG), switchMap(({ payload }) => {
            return ajaxGet('/Address/all').pipe(pluck('response'), flatMap(obj => {
                return of(
                    {
                        type: AddressActionTypes.GET_ADDRESSES_SUCC,
                        payload: { addresses: obj.result }
                    },
                );
            })
                , catchError((err) => {
                    return of({ type: AddressActionTypes.GET_ADDRESSES_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                }));

        }));
    }

    static updateAddress(action$, state$, { ajaxPut }) {
        return action$.pipe(ofType(AddressActionTypes.UPDATE_ADDRESS_PROG), switchMap(({ payload }) => {
            return ajaxPut('/Address').pipe(pluck('response'), flatMap(obj => {
                return of(
                    {
                        type: AddressActionTypes.UPDATE_ADDRESS_SUCC,
                        payload: { addresses: obj.result }
                    },
                );
            })
                , catchError((err) => {
                    return of({ type: AddressActionTypes.UPDATE_ADDRESS_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                }));

        }));
    }
}