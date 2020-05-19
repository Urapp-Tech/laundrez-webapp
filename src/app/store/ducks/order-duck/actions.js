import { OrderActionTypes } from './actions-types';

export class OrderActions {

    static saveOrder(body) {
        return {
            type: OrderActionTypes.SAVE_ORDER_PROG,
            payload: { body }

        };
    }
    static getOrderes() {
        return {
            type: OrderActionTypes.GET_ORDERS_PROG,

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