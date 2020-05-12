import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, flatMap } from 'rxjs/operators';
import { AddressActionTypes } from './actions-types';
import { NotificationActions } from '../notification-duck/actions';
export class AddressEpics {
    static saveAddress(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(AddressActionTypes.SAVE_ADDRESS_PROG), switchMap(({ payload }) => {
            return ajaxPost('/Address', payload.body).pipe(pluck('response'), flatMap(obj => {
                window.scrollTo(0, 0);
                return of(
                    {
                        type: AddressActionTypes.SAVE_ADDRESS_SUCC,
                        payload: { address: obj.result }
                    },
                    NotificationActions.showSuccessNotification('Address saved successfully')
                );
            })
                , catchError((err) => {

                    window.scrollTo(0, 0);
                    return of(
                        { type: AddressActionTypes.SAVE_ADDRESS_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },
                        NotificationActions.showErrorNotification(err?.response?.message || err?.response?.Message)
                    );
                }));

        }));
    }

    static getAddresses(action$, state$, { ajaxGet }) {
        return action$.pipe(ofType(AddressActionTypes.GET_ADDRESSES_PROG), switchMap(() => {
            return ajaxGet('/Address/getallbycustomer').pipe(pluck('response'), flatMap(obj => {
                return of(
                    {
                        type: AddressActionTypes.GET_ADDRESSES_SUCC,
                        payload: { addresses: obj.result }
                    },
                );
            })
                , catchError((err) => {
                    return of({ type: AddressActionTypes.GET_ADDRESSES_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },
                        NotificationActions.showErrorNotification(err?.response?.message || err?.response?.Message)
                    );
                }));

        }));
    }

    static updateAddress(action$, state$, { ajaxPut }) {
        return action$.pipe(ofType(AddressActionTypes.UPDATE_ADDRESS_PROG), switchMap(({ payload }) => {
            return ajaxPut('/Address', payload.body).pipe(pluck('response'), flatMap(obj => {
                return of(
                    {
                        type: AddressActionTypes.UPDATE_ADDRESS_SUCC,
                        payload: { address: obj.result, index: payload.index }
                    },
                    NotificationActions.showSuccessNotification('Address Updated successfully')
                );
            })
                , catchError((err) => {
                    return of({ type: AddressActionTypes.UPDATE_ADDRESS_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },
                        NotificationActions.showErrorNotification(err?.response?.message || err?.response?.Message)
                    );
                }));

        }));
    }

    static deleteAddress(action$, state$, { ajaxDel }) {
        return action$.pipe(ofType(AddressActionTypes.DELETE_ADDRESS_PROG), switchMap(({ payload }) => {
            return ajaxDel(`/Address/${payload.id}`).pipe(pluck('response'), flatMap(() => {
                return of(
                    {
                        type: AddressActionTypes.DELETE_ADDRESS_SUCC,
                        payload: { index: payload.index }
                    },
                );
            })
                , catchError((err) => {
                    return of({ type: AddressActionTypes.DELETE_ADDRESS_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                }));

        }));
    }
}