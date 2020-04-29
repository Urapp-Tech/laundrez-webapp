import { ServiceActionTypes } from './actions-types';

export class ServiceActions {

    static getServices(categoryId) {
        return {
            type: ServiceActionTypes.SERVICES_PROG,
            payload: { categoryId }
        };
    }

    static getService(serviceId) {
        return {
            type: ServiceActionTypes.GET_SERVICE_PROG,
            payload: { serviceId }
        };
    }


    static clearService() {
        return {
            type: ServiceActionTypes.CLEAR_SERVICE,
        };
    }
    static clearServices() {
        return {
            type: ServiceActionTypes.CLEAR_SERVICES,
        };
    }

}