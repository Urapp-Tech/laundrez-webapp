import { of, defer } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, flatMap } from 'rxjs/operators';
import { LovActionTypes } from './actions-types';
export class LovEpics {
    static getLov(action$, state$, { ajaxGet, getRefreshToken }) {
        return action$.pipe(ofType(LovActionTypes.GET_LOV_PROG), switchMap(() => {
            return defer(() => {
                return ajaxGet('/lov/all/');
            }).pipe(pluck('response'), flatMap(obj => {

                let config = {
                    system: {},
                    timeSlots: []
                };
                let timeSlots = [];
                obj.result.forEach((v) => {
                    let groupName = v['groupName'];
                    if (groupName === 'System') {
                        let system = v;
                        config['system'][system['key']] = system['value'];
                    }
                    else if (groupName === 'TimeSlot') {
                        let timeSlot = v;
                        timeSlots.push(timeSlot);
                    }
                });
                config['timeSlots'] = timeSlots;
                return of({ type: LovActionTypes.GET_LOV_SUCC, payload: { config } });
            }), catchError((err, source) => {
                if (err.status === 401) {
                    return getRefreshToken(action$, state$, source);
                }
                else {

                    return of({ type: LovActionTypes.GET_LOV_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                }
            }));

        }));
    }


}