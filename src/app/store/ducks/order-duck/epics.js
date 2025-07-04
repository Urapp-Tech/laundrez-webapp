import { of, defer } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, flatMap } from 'rxjs/operators';
import { OrderActionTypes } from './actions-types';
import { NotificationActions } from '../notification-duck/actions';
import { MyBasketActions } from '../mybasket-duck/actions';
import { OrderActions } from './actions';
export class OrderEpics {
    static postOrder(action$, state$, { ajaxPost, history, getRefreshToken }) {
        return action$.pipe(ofType(OrderActionTypes.POST_ORDER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/order', payload.body);
            }).pipe(pluck('response'), flatMap(obj => {
                window.scrollTo(0, 0);
                history.push('/paymentdetails');
                return of(
                    {
                        type: OrderActionTypes.POST_ORDER_SUCC,
                        payload: { order: obj.result }
                    },
                    // NotificationActions.showSuccessNotification('Order placed successfully'),
                    // MyBasketActions.clearBasket()
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        window.scrollTo(0, 0);
                        return of(
                            { type: OrderActionTypes.POST_ORDER_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },
                            NotificationActions.showErrorNotification(err?.response?.message || err?.response?.Message)
                        );
                    }
                }));

        }));
    }
    static updateOrder(action$, state$, { ajaxPut, history, getRefreshToken }) {
        return action$.pipe(ofType(OrderActionTypes.UPDATE_ORDER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut('/Order', payload.body);
            }).pipe(pluck('response'), flatMap(obj => {
                window.scrollTo(0, 0);
                history.push('/paymentdetails');
                return of(
                    {
                        type: OrderActionTypes.UPDATE_ORDER_SUCC,
                        payload: { order: obj.result, }
                    },
                    NotificationActions.showSuccessNotification('Order Updated successfully')
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        return of({ type: OrderActionTypes.UPDATE_ORDER_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },
                            NotificationActions.showErrorNotification(err?.response?.message || err?.response?.Message)
                        );
                    }
                }));

        }));
    }


    static getOrderDetail(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(OrderActionTypes.GET_ORDER_DETAIL_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/order/${payload.orderId}`);
            }).pipe(pluck('response'), flatMap(obj => {
                return of(
                    {
                        type: OrderActionTypes.GET_ORDER_DETAIL_SUCC,
                        payload: { orderDetail: obj?.result }
                    },
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {

                        return of({ type: OrderActionTypes.GET_ORDER_DETAIL_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },
                            NotificationActions.showErrorNotification(err?.response?.message || err?.response?.Message)
                        );
                    }
                }));

        }));
    }

    static getOrders(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(OrderActionTypes.GET_ORDERS_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/order/history?page[number]=${payload?.page}&page[size]=${payload?.pageSize}`);
            })
                .pipe(pluck('response'), flatMap(obj => {
                    return of(
                        {
                            type: OrderActionTypes.GET_ORDERS_SUCC,
                            payload: obj
                        },
                    );
                })
                    , catchError((err, source) => {
                        if (err.status === 401) {
                            return getRefreshToken(action$, state$, source);
                        }
                        else {

                            return of({ type: OrderActionTypes.GET_ORDERS_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },
                                NotificationActions.showErrorNotification(err?.response?.message || err?.response?.Message)
                            );
                        }
                    }));

        }));
    }

    static getActiveOrders(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(OrderActionTypes.GET_ACTIVE_ORDERS_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxGet(`/order/active?page[number]=${payload?.page}&page[size]=${payload?.pageSize}`);
            }).pipe(pluck('response'), flatMap(obj => {
                return of(
                    {
                        type: OrderActionTypes.GET_ACTIVE_ORDERS_SUCC,
                        payload: obj
                    },
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        return of({ type: OrderActionTypes.GET_ACTIVE_ORDERS_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },
                            NotificationActions.showErrorNotification(err?.response?.message || err?.response?.Message)
                        );
                    }
                }));

        }));
    }


    static cancelOrder(action$, state$, { ajaxPut, history, getRefreshToken }) {
        return action$.pipe(ofType(OrderActionTypes.CANCEL_ORDER_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPut(`/Order/cancel/${payload.id}`);
            }).pipe(pluck('response'), flatMap(() => {
                history.replace('/dashboard');
                return of(
                    {
                        type: OrderActionTypes.CANCEL_ORDER_SUCC,
                    },
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        return of({ type: OrderActionTypes.CANCEL_ORDER_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                    }
                }));

        }));
    }

    static makePayment(action$, state$, { ajaxPost, history, getRefreshToken }) {
        return action$.pipe(ofType(OrderActionTypes.MAKE_PAYMENT_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/Order/makepayment', payload.body);
            }).pipe(pluck('response'), flatMap(() => {
                history.replace('/dashboard');
                return of(
                    {
                        type: OrderActionTypes.MAKE_PAYMENT_SUCC,
                    },
                    MyBasketActions.clearBasket(),
                    MyBasketActions.clearCoupon(),
                    OrderActions.clearOrder(),
                    NotificationActions.showSuccessNotification('Order placed successfully'),
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        window.scrollTo(0, 0);
                        return of(
                            NotificationActions.showErrorNotification('Payment unsuccessful'),
                            { type: OrderActionTypes.MAKE_PAYMENT_FAIL, payload: { err, message: err?.response?.message, status: err?.status } }
                        );
                    }
                }));

        }));
    }

    static checkSelectedPickupSlot(action$, state$, { ajaxPost, getRefreshToken }) {
        return action$.pipe(ofType(OrderActionTypes.CHECK_SELECTED_PICKUP_SLOT_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/Order/validatetimeslot', payload.body);
            }).pipe(pluck('response'), flatMap((obj) => {
                return of(
                    {
                        type: OrderActionTypes.CHECK_SELECTED_PICKUP_SLOT_SUCC,
                        payload: obj
                    }
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        window.scrollTo(0, 0);
                        return of(
                            { type: OrderActionTypes.CHECK_SELECTED_PICKUP_SLOT_FAIL, payload: { err, message: err?.response?.message || err?.response?.Message, status: err?.status } }
                        );
                    }
                }));

        }));
    }
    static checkSelectedDropoffSlot(action$, state$, { ajaxPost, getRefreshToken }) {
        return action$.pipe(ofType(OrderActionTypes.CHECK_SELECTED_DROPOFF_SLOT_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/Order/validatetimeslot', payload.body);
            }).pipe(pluck('response'), flatMap((obj) => {
                return of(
                    {
                        type: OrderActionTypes.CHECK_SELECTED_DROPOFF_SLOT_SUCC,
                        payload: obj
                    }
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        window.scrollTo(0, 0);
                        return of(
                            { type: OrderActionTypes.CHECK_SELECTED_DROPOFF_SLOT_FAIL, payload: { err, message: err?.response?.message || err?.response?.Message, status: err?.status } }
                        );
                    }
                }));

        }));
    }
}