import { CategoryActionTypes } from './actions-types';

export class CategoryActions {

    static getCategories(body) {
        return {
            type: CategoryActionTypes.CATEGORIES_PROG,
            payload: { body }
        };
    }

}