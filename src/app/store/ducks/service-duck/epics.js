import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, flatMap } from 'rxjs/operators';
import { ServiceActionTypes } from './actions-types';
export class ServiceEpics {
    static getServices(action$, state$, { ajaxGet }) {
        return action$.pipe(ofType(ServiceActionTypes.SERVICES_PROG), switchMap(({ payload }) => {
            return ajaxGet(`/Service/all?page[number]=1&page[size]=1000&filters[categoryId]=${payload.categoryId}`).pipe(pluck('response'), flatMap(obj => {
                let services = obj.result;
                return of(
                    {
                        type: ServiceActionTypes.SERVICES_SUCC,
                        payload: { services }
                    },

                );
            })
                , catchError((err) => {
                    return of({ type: ServiceActionTypes.SERVICES_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                }));

        }));
    }

    static getService(action$, state$, { ajaxGet }) {
        return action$.pipe(ofType(ServiceActionTypes.GET_SERVICE_PROG), switchMap(({ payload }) => {
            return ajaxGet(`/Service/${payload.serviceId}`).pipe(pluck('response'), flatMap(obj => {
                let service = obj.result;
                return of(
                    {
                        type: ServiceActionTypes.GET_SERVICE_SUCC,
                        payload: { service }
                    },

                );
            })
                , catchError((err) => {
                    return of({ type: ServiceActionTypes.GET_SERVICE_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                }));

        }));
    }

    
}