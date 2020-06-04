import { of, defer } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, flatMap } from 'rxjs/operators';
import { CardActionTypes } from './actions-types';
import { NotificationActions } from '../notification-duck/actions';
import { CardActions } from '.';
export class CardEpics {
    static saveCard(action$, state$, { ajaxPost, getRefreshToken }) {
        return action$.pipe(ofType(CardActionTypes.SAVE_CARD_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxPost('/Card', payload.body);
            }).pipe(pluck('response'), flatMap(() => {
                window.scrollTo(0, 0);
                return of(
                    {
                        type: CardActionTypes.SAVE_CARD_SUCC,
                    },
                    CardActions.getCards()
                    ,
                    NotificationActions.showSuccessNotification('Card saved successfully')
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        window.scrollTo(0, 0);
                        return of(
                            { type: CardActionTypes.SAVE_CARD_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },
                            NotificationActions.showErrorNotification(err?.response?.message || err?.response?.Message)
                        );
                    }
                }));

        }));
    }

    static getCards(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(CardActionTypes.GET_CARDS_PROG), switchMap(() => {
            return defer(() => {
                return ajaxGet('/Card/all');
            }).pipe(pluck('response'), flatMap(obj => {
                return of(
                    {
                        type: CardActionTypes.GET_CARDS_SUCC,
                        payload: { cards: obj.result }
                    },
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {
                        return of({ type: CardActionTypes.GET_CARDS_FAIL, payload: { err, message: err?.response?.message, status: err?.status } },
                            NotificationActions.showErrorNotification(err?.response?.message || err?.response?.Message)
                        );
                    }
                }));

        }));
    }

    static deleteCard(action$, state$, { ajaxDel, getRefreshToken }) {
        return action$.pipe(ofType(CardActionTypes.DELETE_CARD_PROG), switchMap(({ payload }) => {
            return defer(() => {
                return ajaxDel(`/Card/${payload.id}`);
            }).pipe(pluck('response'), flatMap(() => {
                return of(
                    {
                        type: CardActionTypes.DELETE_CARD_SUCC,
                        payload: { index: payload.index }
                    },
                );
            })
                , catchError((err, source) => {
                    if (err.status === 401) {
                        return getRefreshToken(action$, state$, source);
                    }
                    else {

                        return of({ type: CardActionTypes.DELETE_CARD_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                    }
                }));

        }));
    }
}