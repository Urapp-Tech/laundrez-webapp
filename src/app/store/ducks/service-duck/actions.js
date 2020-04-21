import { ServiceActionTypes } from './actions-types';

export class ServiceActions {

    static getServices(categoryId) {
        return {
            type: ServiceActionTypes.SERVICES_PROG,
            payload: { categoryId }
        };
    }

    static getServieFaq(serviceId) {
        return {
            type: ServiceActionTypes.GET_SERVICE_FAQ_PROG,
            payload: { serviceId }
        };
    }

    static clearServiceFaq() {
        return {
            type: ServiceActionTypes.CLEAR_SERVICE_FAQ,
        };
    }

}