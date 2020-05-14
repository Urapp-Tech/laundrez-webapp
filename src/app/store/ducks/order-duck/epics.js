import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, flatMap } from 'rxjs/operators';
import { OrderActionTypes } from './actions-types';
import { NotificationActions } from '../notification-duck/actions';
export class OrderEpics {
    static saveOrder(action$, state$, { ajaxPost }) {
        return action$.pipe(ofType(OrderActionTypes.SAVE_ORDER_PROG), switchMap(({ payload }) => {
            return ajaxPost('/Order', payload.body).pipe(pluck('response'), flatMap(obj => {
                window.scrollTo(0, 0);
                return of(
                    {
                        type: OrderActionTypes.SAVE_ORDER_SUCC,
                        payload: { address: obj.result }
                    },
                    NotificationActions.showSuccessNotification('Order saved successfully')
                );
            })
                , catchError((err) => {

                    window.scrollTo(0, 0);
                    return of(
                        { type: OrderActionTypes.SAVE_ORDER_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },
                        NotificationActions.showErrorNotification(err?.response?.message || err?.response?.Message)
                    );
                }));

        }));
    }

    static getOrders(action$, state$, { ajaxGet }) {
        return action$.pipe(ofType(OrderActionTypes.GET_ORDERS_PROG), switchMap(() => {
            return ajaxGet('/Order/getallbycustomer').pipe(pluck('response'), flatMap(obj => {
                return of(
                    {
                        type: OrderActionTypes.GET_ORDERS_SUCC,
                        payload: { addresses: obj.result }
                    },
                );
            })
                , catchError((err) => {
                    return of({ type: OrderActionTypes.GET_ORDERS_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },
                        NotificationActions.showErrorNotification(err?.response?.message || err?.response?.Message)
                    );
                }));

        }));
    }

    static updateOrder(action$, state$, { ajaxPut }) {
        return action$.pipe(ofType(OrderActionTypes.UPDATE_ORDER_PROG), switchMap(({ payload }) => {
            return ajaxPut('/Order', payload.body).pipe(pluck('response'), flatMap(obj => {
                return of(
                    {
                        type: OrderActionTypes.UPDATE_ORDER_SUCC,
                        payload: { address: obj.result, index: payload.index }
                    },
                    NotificationActions.showSuccessNotification('Order Updated successfully')
                );
            })
                , catchError((err) => {
                    return of({ type: OrderActionTypes.UPDATE_ORDER_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },
                        NotificationActions.showErrorNotification(err?.response?.message || err?.response?.Message)
                    );
                }));

        }));
    }

    static deleteOrder(action$, state$, { ajaxDel }) {
        return action$.pipe(ofType(OrderActionTypes.DELETE_ORDER_PROG), switchMap(({ payload }) => {
            return ajaxDel(`/Order/${payload.id}`).pipe(pluck('response'), flatMap(() => {
                return of(
                    {
                        type: OrderActionTypes.DELETE_ORDER_SUCC,
                        payload: { index: payload.index }
                    },
                );
            })
                , catchError((err) => {
                    return of({ type: OrderActionTypes.DELETE_ORDER_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                }));

        }));
    }
}