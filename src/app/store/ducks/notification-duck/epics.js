// import { of } from 'rxjs';
// import { ofType, } from 'redux-observable';
// import { switchMap, pluck, catchError, flatMap } from 'rxjs/operators';
// import { MyBasketActionTypes } from './actions-types';
export class NotificationEpics {
    // static getServices(action$, state$, { ajaxGet }) {
    //     return action$.pipe(ofType(ServiceActionTypes.SERVICES_PROG), switchMap(({ payload }) => {
    //         return ajaxGet(`/Service/all?page[number]=1&page[size]=1000&filters[categoryId]=${payload.categoryId}`).pipe(pluck('response'), flatMap(obj => {
    //             let services = obj.result;
    //             return of(
    //                 {
    //                     type: ServiceActionTypes.SERVICES_SUCC,
    //                     payload: { services }
    //                 },

    //             );
    //         })
    //             , catchError((err) => {
    //                 return of({ type: ServiceActionTypes.SERVICES_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
    //             }));

    //     }));
    // }

    
}