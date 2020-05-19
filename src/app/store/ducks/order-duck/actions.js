import { OrderActionTypes } from './actions-types';

export class OrderActions {

    static saveOrder(body) {
        return {
            type: OrderActionTypes.SAVE_ORDER_PROG,
            payload: { body }

        };
    }
    static getOrders(page = 1, pageSize = 10, ) {
        return {
            type: OrderActionTypes.GET_ORDERS_PROG,
            payload: { page, pageSize }

        };
    }

    static updateOrder(body, index) {
        return {
            type: OrderActionTypes.UPDATE_ORDER_PROG,
            payload: { body, index }

        };
    }

    static deleteOrder(id, index) {
        return {
            type: OrderActionTypes.DELETE_ORDER_PROG,
            payload: { id, index }

        };
    }

    static setPickupAndDropoff(body) {
        return {
            type: OrderActionTypes.SET_PICKUP_AND_DROPOFF,
            payload: {...body} 
        };
    }

}