import { ServiceActionTypes } from './actions-types';

export class ServiceActions {

    static getServices(categoryId) {
        return {
            type: ServiceActionTypes.SERVICES_PROG,
            payload: { categoryId }
        };
    }

}