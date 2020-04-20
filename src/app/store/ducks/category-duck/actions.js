import { CategoryActionTypes } from './actions-types';

export class CategoryActions {

    static getCategories() {
        return {
            type: CategoryActionTypes.CATEGORIES_PROG,

        };
    }

}