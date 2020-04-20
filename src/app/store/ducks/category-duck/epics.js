import { of } from 'rxjs';
import { ofType, } from 'redux-observable';
import { switchMap, pluck, catchError, flatMap } from 'rxjs/operators';
import { actions } from '../../../../_metronic/ducks/builder';
import { CategoryActionTypes } from './actions-types';
export class CategoryEpics {
    static getCategories(action$, state$, { ajaxGet }) {
        return action$.pipe(ofType(CategoryActionTypes.CATEGORIES_PROG), switchMap(({ payload }) => {
            return ajaxGet('/Category/all?page[number]=1&page[size]=1000').pipe(pluck('response'), flatMap(obj => {
                let categories = obj.result;
                let submenu = categories.map((v, i) => {
                    return {
                        title: v.title,
                        bullet: 'dot',
                        page: `services/${v.id}`,
                        category: v
                    };
                });
                return of(
                    {
                        type: CategoryActionTypes.CATEGORIES_SUCC,
                        payload: { categories }
                    },
                    actions.setSubMenuServices(submenu)
                );
            })
                , catchError((err) => {
                    return of({ type: CategoryActionTypes.CATEGORIES_FAIL, payload: { err, message: err?.response?.message, status: err?.status } });
                }));

        }));
    }
}